"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-0.5">
      {routing.locales.map((l) => (
        <Button
          key={l}
          variant="ghost"
          size="sm"
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "h-7 rounded-full px-3 text-xs font-medium uppercase tracking-wider transition-colors",
            locale === l
              ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Button>
      ))}
    </div>
  );
}
