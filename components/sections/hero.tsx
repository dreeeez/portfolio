"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DISCIPLINES = ["Software", "UI / UX", "Design", "Data"];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <InfiniteGrid className="min-h-screen flex items-start pt-16 xl:pt-24 2xl:pt-64">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-6 text-center sm:px-6 lg:px-8">
        <PortraitAvatar alt={t("name")} />

        <div
          className="hero-fade-up mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("role")}
        </div>

        <h1
          className="hero-fade-up mt-6 whitespace-nowrap bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-3xl leading-[1.02] text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ animationDelay: "0.3s" }}
        >
          {t("name")}
        </h1>

        <div
          className="hero-fade-up mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground md:text-base"
          style={{ animationDelay: "0.4s" }}
        >
          {DISCIPLINES.map((d, i) => (
            <span key={d} className="flex items-center gap-2">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              )}
              {d}
            </span>
          ))}
        </div>

        <div
          className="hero-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.5s" }}
        >
          <a
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full px-6 text-base",
            )}
          >
            {t("ctaProjects")}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 rounded-full border-border/60 bg-card/40 px-6 text-base backdrop-blur-sm",
            )}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            {t("ctaContact")}
          </a>
        </div>
      </div>
    </InfiniteGrid>
  );
}

function PortraitAvatar({ alt }: { alt: string }) {
  return (
    <div className="relative">
      {/* soft ambient halo */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-orange-500/35 via-primary/15 to-blue-500/35 opacity-90 blur-2xl dark:from-orange-500/25 dark:via-primary/10 dark:to-blue-500/25" />

      {/* thin gradient ring */}
      <div className="relative rounded-full bg-gradient-to-br from-white/50 via-white/10 to-transparent p-[1.5px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] dark:from-white/25 dark:via-white/5">
        <div className="relative h-36 w-36 overflow-hidden rounded-full border border-border/40 bg-card/40 backdrop-blur-sm md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-60 xl:w-60 2xl:h-72 2xl:w-72">
          <Image
            src="/marco-portrait.jpg"
            alt={alt}
            width={400}
            height={400}
            priority
            fetchPriority="high"
            sizes="(min-width: 1536px) 18rem, (min-width: 1280px) 15rem, (min-width: 1024px) 13rem, (min-width: 768px) 11rem, 9rem"
            className="h-full w-full object-cover object-[center_28%]"
          />
        </div>
      </div>

      {/* tiny status dot anchored to the bottom-right of the avatar */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-background bg-emerald-500 md:bottom-3 md:right-3 md:h-6 md:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
      </span>
    </div>
  );
}
