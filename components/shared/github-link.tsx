import { ArrowUpRight } from "lucide-react";

type Props = {
  locale: "de" | "en";
  username?: string;
  repo?: string;
  compact?: boolean;
};

export function GithubLink({
  locale,
  username = "dreeeez",
  repo,
  compact = false,
}: Props) {
  const href = repo
    ? `https://github.com/${username}/${repo}`
    : `https://github.com/${username}`;

  const fullLabel = repo
    ? locale === "de"
      ? "Code auf GitHub"
      : "Code on GitHub"
    : locale === "de"
      ? "Mehr Code auf GitHub"
      : "More code on GitHub";

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-neutral-950/50 px-3 py-1.5 font-sans text-xs not-italic text-foreground transition-colors hover:border-foreground/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github.com/${username}.png?size=48`}
          alt=""
          className="h-5 w-5 rounded-full object-cover"
        />
        <span>{locale === "de" ? "Code" : "Code"}</span>
        <ArrowUpRight className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 font-sans not-italic"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${username}.png?size=80`}
        alt=""
        className="h-9 w-9 rounded-full border border-border/60 object-cover"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          GitHub
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-foreground/70">
          {fullLabel}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
