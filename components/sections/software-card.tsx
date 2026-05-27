"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/shared/social-icons";

type SoftwareCardProps = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  image?: string;
  slug: string;
};

export function SoftwareCard({
  title,
  year,
  description,
  tags,
  href,
  github,
  image,
  slug,
}: SoftwareCardProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const showImage = image && !imageFailed;

  const initial = title.charAt(0).toUpperCase();
  const primaryHref = href ?? github;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40"
    >
      <a
        href={primaryHref}
        target={primaryHref ? "_blank" : undefined}
        rel={primaryHref ? "noopener" : undefined}
        className={cn(
          "relative block aspect-video overflow-hidden",
          !primaryHref && "pointer-events-none",
        )}
      >
        {showImage ? (
          <img
            src={image}
            alt={`${title} thumbnail`}
            onError={() => setImageFailed(true)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.04]",
              gradientFor(slug),
            )}
          >
            <span className="font-heading text-6xl italic text-white/80">
              {initial}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
        {primaryHref && (
          <div className="pointer-events-none absolute right-3 top-3 rounded-md border border-white/15 bg-black/40 p-1.5 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </a>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {year}
        </p>
        <h3 className="mt-1.5 text-2xl leading-tight">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border/50 bg-background/40 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        {github && (
          <div className="mt-5 flex items-center gap-2 border-t border-border/40 pt-4">
            <a
              href={github}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-accent/40"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span className="font-sans not-italic">GitHub</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const GRADIENTS = [
  "from-indigo-500/30 to-purple-500/20",
  "from-orange-500/30 to-rose-500/20",
  "from-emerald-500/30 to-teal-500/20",
  "from-sky-500/30 to-blue-500/20",
  "from-fuchsia-500/30 to-pink-500/20",
];

function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return GRADIENTS[hash % GRADIENTS.length];
}
