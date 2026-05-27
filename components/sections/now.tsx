import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";

export function Now() {
  const t = useTranslations("now");

  return (
    <section
      id="now"
      className="section-light relative bg-white pb-12 pt-24 text-neutral-900 md:pb-16 md:pt-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <GlowCard
            glowColor="rgba(0,0,0,0.05)"
            className="border-neutral-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-neutral-300 md:p-8"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-emerald-500/5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-neutral-700">
              <p>{t("bodyP1")}</p>
              <p>{t("bodyP2")}</p>
              <p>{t("bodyP3")}</p>
              <p className="pt-2 text-sm text-neutral-500">
                {t("lastUpdated")} · {new Date().toLocaleDateString()}
              </p>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
