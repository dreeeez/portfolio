import {
  Cpu,
  Database,
  GraduationCap,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  timeline,
  type TimelineAccent,
  type TimelineIcon,
} from "@/content/timeline";

const ICON_FOR: Record<TimelineIcon, LucideIcon> = {
  data: Database,
  study: Sparkles,
  web: Cpu,
  hardware: Wrench,
  it: Server,
  graduation: GraduationCap,
};

const ACCENT_FOR: Record<TimelineAccent, { iconBg: string; iconColor: string }> = {
  sky: {
    iconBg:
      "bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-sky-500/5 border-sky-500/30",
    iconColor: "text-sky-600",
  },
  violet: {
    iconBg:
      "bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-violet-500/5 border-violet-500/30",
    iconColor: "text-violet-600",
  },
  emerald: {
    iconBg:
      "bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-emerald-500/5 border-emerald-500/30",
    iconColor: "text-emerald-600",
  },
  amber: {
    iconBg:
      "bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-amber-500/5 border-amber-500/30",
    iconColor: "text-amber-600",
  },
  cyan: {
    iconBg:
      "bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-cyan-500/5 border-cyan-500/30",
    iconColor: "text-cyan-600",
  },
  rose: {
    iconBg:
      "bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-rose-500/5 border-rose-500/30",
    iconColor: "text-rose-600",
  },
};

export function Timeline() {
  const t = useTranslations("timeline");
  const locale = useLocale() as "en" | "de";

  return (
    <section
      id="timeline"
      className="section-light relative bg-white pb-24 pt-0 text-neutral-900 md:pb-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>

        <div className="relative mt-12 max-w-4xl">
          <div className="absolute left-[14px] top-0 h-full w-px bg-gradient-to-b from-neutral-200 via-neutral-200 to-transparent md:left-[11rem]" />

          <ol className="space-y-10">
            {timeline.map((entry, i) => {
              const Icon = ICON_FOR[entry.icon];
              const accent = ACCENT_FOR[entry.accent];
              return (
                <Reveal key={`${entry.period}-${i}`} delay={i * 0.05}>
                  <li className="relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-[12rem_1fr] md:gap-8">
                    <div className="relative">
                      <span
                        className={`absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-md border ring-4 ring-white md:left-[11rem] md:-translate-x-1/2 ${accent.iconBg}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${accent.iconColor}`} />
                      </span>
                      <p className="hidden pt-1 text-sm font-medium text-neutral-500 md:block">
                        {entry.period}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-500 md:hidden">
                        {entry.period}
                      </p>
                      <h3 className="mt-1 text-xl leading-tight text-neutral-900">
                        {entry.title[locale]}
                      </h3>
                      <p className="mt-0.5 text-sm text-neutral-500">
                        {entry.org}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                        {entry.description[locale]}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
