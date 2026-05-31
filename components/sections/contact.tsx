import { Download, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/shared/social-icons";
import { cn } from "@/lib/utils";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <GlowCard
            glowColor="rgba(249, 115, 22, 0.18)"
            className="overflow-hidden p-10 md:p-14"
          >
            <SectionHeading
              kicker={t("kicker")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="center"
            />

            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@marco-schneider.dev"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-6 text-base",
                  )}
                >
                  <Mail className="mr-1.5 h-4 w-4" />
                  {t("emailButton")}
                </a>
                <a
                  href="https://www.linkedin.com/in/marco-andres-schneider/"
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "h-11 rounded-full border-border/60 px-6 text-base backdrop-blur-sm",
                    "bg-muted text-foreground dark:bg-input/50 sm:bg-card/40 dark:sm:bg-card/40",
                  )}
                >
                  <LinkedinIcon className="mr-1.5 h-4 w-4" />
                  {t("linkedinButton")}
                </a>
                <a
                  href="/Marco-Andres-Schneider-Lebenslauf.pdf"
                  target="_blank"
                  rel="noopener"
                  download="Marco-Andres-Schneider-Lebenslauf.pdf"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "h-11 rounded-full border-border/60 px-6 text-base backdrop-blur-sm",
                    "bg-muted text-foreground dark:bg-input/50 sm:bg-card/40 dark:sm:bg-card/40",
                  )}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {t("downloadCv")}
                </a>
              </div>
              <p className="mt-2 max-w-md text-center text-xs text-muted-foreground">
                {t("cvHint")}
              </p>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
