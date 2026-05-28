import Image from "next/image";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  const t = useTranslations("about");
  const tHero = useTranslations("hero");

  return (
    <section
      id="about"
      className="section-light relative bg-white pb-12 pt-24 text-neutral-900 md:pb-16 md:pt-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{tHero("bodyP1")}</p>
            <p>{tHero("bodyP2")}</p>
            <p>
              {tHero.rich("bodyP3", {
                dcg: (chunks) => (
                  <a
                    href="https://dcg-deutschland.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-900"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p>{tHero("bodyP5")}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-orange-500/15 via-primary/5 to-blue-500/15 opacity-80 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]">
              <Image
                src="/marco-about.jpg"
                alt={t("title")}
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
