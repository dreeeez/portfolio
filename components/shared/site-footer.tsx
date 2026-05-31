import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./social-icons";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {year} Marco Schneider. {t("rights")}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@marco-schneider.dev"
            aria-label="Email"
            className="rounded-md p-2 transition-colors hover:bg-accent/50 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="rounded-md p-2 transition-colors hover:bg-accent/50 hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/marco-andres-schneider/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="rounded-md p-2 transition-colors hover:bg-accent/50 hover:text-foreground"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs">{t("built")}</p>
      </div>
    </footer>
  );
}
