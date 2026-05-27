import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { videoUrl } from "@/lib/media";

const project = projects.find((p) => p.slug === "sport");

export const metadata: Metadata = {
  title: project?.title ?? "Sport — Short",
  description: project?.description.en,
};

export default async function SportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!project) return null;

  const loc = locale === "de" ? "de" : "en";

  return (
    <article className="relative pb-24 pt-24 md:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-sans text-sm not-italic text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {loc === "de" ? "Zurück zu Projekten" : "Back to projects"}
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl leading-[1.05] md:text-5xl">
            {project.title}
          </h1>
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-5 border-b border-border/60 pb-6 font-sans not-italic sm:grid-cols-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Tech Stack" : "Tech stack"}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/davinci.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                DaVinci Resolve
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/capcut.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                CapCut
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Kategorien" : "Categories"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {project.tags
                .filter((t) => t !== "DaVinci Resolve")
                .join(" · ")}
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Jahr" : "Year"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">{project.year}</dd>
          </div>
        </dl>

        <div className="mt-8 max-w-2xl space-y-4 text-base leading-7">
          <p className="text-foreground/85">
            {loc === "de"
              ? "Für unsere Weihnachtsfeier haben wir ein Video produziert, bei dem es darum ging, das passende Moderations-Duo zu finden — hier die Audition-Version mit zwei Hockey-Spielerinnen."
              : "For our Christmas party we shot a video about finding the right hosting duo — this is the audition take with two hockey players."}
          </p>
          <p className="relative inline-flex font-sans text-[11px] font-medium uppercase tracking-[0.22em] not-italic [filter:drop-shadow(0_0_10px_rgba(217,70,239,0.45))_drop-shadow(0_0_18px_rgba(56,189,248,0.35))]">
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Shot on iPhone
            </span>
          </p>
        </div>

        <figure className="mt-10">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "Audition — Hockey" : "Audition — hockey"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={project.video?.src ? videoUrl(project.video.src) : undefined}
              poster="/videos/sport.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <div className="mt-16 border-t border-border/60 pt-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-3 font-sans text-sm not-italic text-muted-foreground transition-colors hover:text-foreground"
          >
            {loc === "de" ? "Alle Projekte ansehen" : "See all projects"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
