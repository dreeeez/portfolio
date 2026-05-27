"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { videoUrl } from "@/lib/media";
import { Link } from "@/i18n/navigation";
import {
  GithubIcon,
  TelegramIcon,
  WebIcon,
} from "@/components/shared/social-icons";
import { type Project, type ProjectIcon } from "@/content/projects";

function StreamlitLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/streamlit.png"
      alt="Streamlit"
      className={cn("object-contain", className)}
    />
  );
}

const ICON_FOR: Record<
  ProjectIcon,
  React.ComponentType<{ className?: string }>
> = {
  telegram: TelegramIcon,
  web: WebIcon,
  data: WebIcon,
  streamlit: StreamlitLogo,
};

const GRADIENT_FOR: Record<ProjectIcon, string> = {
  telegram: "from-sky-500/40 via-card to-blue-700/30",
  web: "from-emerald-500/40 via-card to-teal-700/30",
  data: "from-orange-500/40 via-card to-rose-700/30",
  streamlit: "from-red-500/25 via-card to-orange-700/20",
};

type FilterDef = {
  id: string;
  labelDe: string;
  labelEn: string;
  match: (p: Project) => boolean;
};

const FILTERS: FilterDef[] = [
  {
    id: "all",
    labelDe: "Alle",
    labelEn: "All",
    match: () => true,
  },
  {
    id: "telegram",
    labelDe: "Telegram",
    labelEn: "Telegram",
    match: (p) => p.icon === "telegram",
  },
  {
    id: "web",
    labelDe: "Web",
    labelEn: "Web",
    match: (p) => p.icon === "web",
  },
  {
    id: "data",
    labelDe: "Data",
    labelEn: "Data",
    match: (p) => p.category === "data" || p.icon === "streamlit",
  },
];

const CYCLE_MS = 5500;

type ShowcaseProps = {
  projects: Project[];
  locale: "en" | "de";
};

export function ProjectsShowcase({ projects, locale }: ShowcaseProps) {
  const [filterId, setFilterId] = React.useState<string>("all");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [cycleKey, setCycleKey] = React.useState(0);

  const availableFilters = React.useMemo(
    () =>
      FILTERS.filter(
        (f) => f.id === "all" || projects.some((p) => f.match(p)),
      ),
    [projects],
  );

  const activeFilter =
    availableFilters.find((f) => f.id === filterId) ?? availableFilters[0];

  const filtered = React.useMemo(
    () => projects.filter((p) => activeFilter.match(p)),
    [projects, activeFilter],
  );

  React.useEffect(() => {
    setActiveIndex(0);
    setCycleKey((k) => k + 1);
  }, [filterId]);

  React.useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % filtered.length);
      setCycleKey((k) => k + 1);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, isPaused, cycleKey, filtered.length]);

  const active = filtered[activeIndex] ?? filtered[0];

  const handlePick = (index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
  };

  if (!active) return null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr]"
    >
      <div className="order-2 flex flex-col gap-3 lg:order-1">
        <div className="flex flex-wrap gap-1.5">
          {availableFilters.map((filter) => {
            const isActive = filter.id === filterId;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setFilterId(filter.id)}
                className={cn(
                  "rounded-full border px-3 py-1 font-sans text-xs not-italic transition-colors",
                  isActive
                    ? "border-foreground/30 bg-foreground/10 text-foreground"
                    : "border-border/60 bg-card/30 text-muted-foreground hover:border-border hover:bg-card/60",
                )}
              >
                {locale === "de" ? filter.labelDe : filter.labelEn}
              </button>
            );
          })}
        </div>

        <ol className="flex max-h-[460px] flex-col gap-1 overflow-y-auto pr-1 lg:max-h-none">
          {filtered.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={project.slug}>
                <button
                  type="button"
                  onClick={() => handlePick(i)}
                  onMouseEnter={() => handlePick(i)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors",
                    isActive
                      ? "border-border bg-card/60"
                      : "border-transparent hover:border-border/60 hover:bg-card/30",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      {project.iconImage ? (
                        <img
                          src={project.iconImage}
                          alt=""
                          className="h-3.5 w-3.5 shrink-0 object-contain"
                        />
                      ) : project.icon ? (
                        (() => {
                          const Icon = ICON_FOR[project.icon];
                          return (
                            <Icon
                              className={cn(
                                "h-3.5 w-3.5 shrink-0 transition-colors",
                                isActive
                                  ? "text-foreground"
                                  : "text-muted-foreground/70",
                              )}
                            />
                          );
                        })()
                      ) : null}
                      <span
                        className={cn(
                          "truncate font-sans text-sm font-medium not-italic transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {project.title}
                      </span>
                    </div>
                    <span className="shrink-0 font-sans text-[10px] not-italic text-muted-foreground/60">
                      {project.year}
                    </span>
                  </div>
                  {isActive && !isPaused && filtered.length > 1 && (
                    <motion.div
                      key={cycleKey}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: CYCLE_MS / 1000,
                        ease: "linear",
                      }}
                      style={{ originX: 0 }}
                      className="absolute inset-x-0 bottom-0 h-px bg-foreground/40"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {active.subpage ? (
        <Link
          href={`/projects/${active.slug}`}
          className="group relative order-1 block overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-colors hover:border-border lg:order-2"
        >
          <StageInner active={active} locale={locale} />
        </Link>
      ) : (
        <div className="group relative order-1 overflow-hidden rounded-2xl border border-border/60 bg-card/30 lg:order-2">
          <StageInner active={active} locale={locale} />
        </div>
      )}
    </div>
  );
}

function StageInner({
  active,
  locale,
}: {
  active: Project;
  locale: "en" | "de";
}) {
  const openExternal = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[16/11] w-full"
      >
        <StageMedia project={active} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black from-25% via-black/70 via-55% to-transparent" />

        {active.subpage && (
          <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-sans text-[11px] not-italic text-white/80 backdrop-blur-md transition-colors group-hover:bg-black/70">
            {locale === "de" ? "Details" : "Details"}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <span className="font-sans text-xs text-white/60 not-italic">
            {active.year}
          </span>
          <h3 className="mt-2 text-3xl leading-[1.05] text-white md:text-5xl">
            {active.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {active.description[locale]}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {active.github && (
              <button
                type="button"
                onClick={(e) => openExternal(e, active.github!)}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/40 px-3 py-1.5 font-sans text-xs font-medium not-italic text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/60"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
              </button>
            )}
            {active.href && (
              <button
                type="button"
                onClick={(e) => openExternal(e, active.href!)}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/95 px-3 py-1.5 font-sans text-xs font-medium not-italic text-black transition-colors hover:bg-white"
              >
                Live
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
            <ul className="ml-auto hidden flex-wrap gap-1.5 md:flex">
              {active.tags.slice(0, 4).map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-sans text-[10px] not-italic text-white/70 backdrop-blur-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function StageMedia({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (el) el.play().catch(() => {});
  }, []);

  if (project.video) {
    return (
      <video
        ref={videoRef}
        src={videoUrl(project.video.src)}
        poster={project.video.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  if (project.images && project.images.length > 0) {
    return (
      <div className="absolute inset-0 flex items-stretch justify-center gap-3 overflow-hidden bg-neutral-950 p-4 md:gap-4 md:p-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-[28%] top-1/2 h-[70%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/35 blur-3xl" />
          <div className="absolute left-[72%] top-1/2 h-[70%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        {project.images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} preview ${idx + 1}`}
            className="relative h-full min-w-0 flex-1 rounded-lg object-contain"
          />
        ))}
      </div>
    );
  }

  if (project.image && !imageFailed) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        onError={() => setImageFailed(true)}
        className="absolute inset-0 h-full w-full object-cover [object-position:center_-200%]"
      />
    );
  }

  const Icon = project.icon ? ICON_FOR[project.icon] : null;
  const gradient = project.icon
    ? GRADIENT_FOR[project.icon]
    : "from-indigo-500/30 via-card to-purple-500/20";

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
        gradient,
      )}
    >
      {project.iconImage ? (
        <img
          src={project.iconImage}
          alt={`${project.title} logo`}
          className="h-28 w-28 object-contain"
        />
      ) : Icon ? (
        <Icon className="h-28 w-28 text-white/85" />
      ) : (
        <span className="font-heading text-8xl italic text-white/70">
          {project.title.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
