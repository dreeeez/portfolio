"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "projects", hash: "projects" },
  { id: "now", hash: "now" },
  { id: "contact", hash: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <div />
        <nav className="hidden items-center justify-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
            isHome ? (
              <a
                key={item.id}
                href={`#${item.hash}`}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                {t(item.id)}
              </a>
            ) : (
              <Link
                key={item.id}
                href={`/#${item.hash}`}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                {t(item.id)}
              </Link>
            ),
          )}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            className="ml-1 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-accent/50"
          >
            {t("resume")}
          </a>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
