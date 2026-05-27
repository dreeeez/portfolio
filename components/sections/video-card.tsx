"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { videoUrl } from "@/lib/media";
import { Link } from "@/i18n/navigation";

type VideoCardProps = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
  subpageHref?: string;
  video?: {
    poster: string;
    src: string;
  };
  image?: string;
  fit?: "cover" | "contain";
};

export function VideoCard({
  title,
  year,
  description,
  tags,
  href,
  subpageHref,
  video,
  image,
  fit = "cover",
}: VideoCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.play().catch(() => {});
    }
  }, []);

  const hasLink = Boolean(subpageHref || href);
  const Wrapper: React.ElementType = subpageHref
    ? Link
    : href
      ? "a"
      : "article";
  const wrapperProps: Record<string, unknown> = subpageHref
    ? { href: subpageHref }
    : href
      ? { href, target: "_blank", rel: "noopener" }
      : {};

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-neutral-950 md:aspect-[3/4]"
    >
      <Wrapper {...wrapperProps} className="block h-full w-full">
        {video ? (
          <video
            ref={videoRef}
            src={videoUrl(video.src)}
            poster={video.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700",
              isHovered
                ? "scale-105 opacity-90 brightness-100"
                : "scale-100 opacity-60 brightness-75",
            )}
          />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full transition-all duration-700",
              fit === "contain" ? "object-contain object-top p-6" : "object-cover",
              isHovered
                ? "scale-105 opacity-90 brightness-100"
                : "scale-100 opacity-60 brightness-75",
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Coming soon
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        {hasLink && (
          <div className="pointer-events-none absolute right-5 top-5 rounded-lg border border-white/20 bg-black/40 p-2 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60">
            {year}
          </p>
          <h3 className="mt-2 text-3xl leading-[1.05] text-white md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            {description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/70 backdrop-blur-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </motion.div>
  );
}
