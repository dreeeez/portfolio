import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { skillCategories } from "@/content/skills";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="section-light relative bg-white pb-24 pt-0 text-neutral-900 md:pb-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={i * 0.05}>
                <GlowCard
                  className="h-full border-neutral-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-neutral-300"
                  glowColor="rgba(0,0,0,0.05)"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${cat.accent.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${cat.accent.iconColor}`} />
                  </div>
                  <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-[0.12em] not-italic text-neutral-500">
                    {t(`categories.${cat.id}`)}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs text-neutral-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
