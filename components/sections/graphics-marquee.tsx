"use client";

import * as React from "react";

import { VideoCard } from "@/components/sections/video-card";
import type { Project } from "@/content/projects";

/**
 * Auto-scrolling graphics row. The track holds two copies of the cards and
 * drifts left→right via the `marquee-track` CSS animation. A throttled rAF loop
 * finds whichever card is closest to the horizontal centre and marks it
 * `active`, so it lights up exactly like a hovered card — no pointer needed.
 */
export function GraphicsMarquee({
  items,
  locale,
}: {
  items: Project[];
  locale: "en" | "de";
}) {
  const doubled = React.useMemo(() => [...items, ...items], [items]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // No marquee motion under reduced-motion → no centre to track.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 100) return;
      last = t;
      const cRect = container.getBoundingClientRect();
      const center = cRect.left + cRect.width / 2;
      let best: number | null = null;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex((prev) => (prev === best ? prev : best));
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only run the loop while the row is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="marquee-mask relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
    >
      <div className="marquee-track flex w-max [animation-direction:reverse]">
        {doubled.map((project, i) => (
          <div
            key={`${project.slug}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            aria-hidden={i >= items.length}
            className="mr-5 w-[280px] shrink-0 sm:w-[320px] md:w-[360px]"
          >
            <VideoCard
              title={project.title}
              year={project.year}
              description={project.description[locale]}
              tags={project.tags}
              href={project.href}
              subpageHref={
                project.subpage
                  ? project.subpagePath ?? `/projects/${project.slug}`
                  : undefined
              }
              video={project.video}
              image={project.image}
              fit="contain"
              active={i === activeIndex}
              imageClassName={
                project.slug === "ecorize-messe-flyer-showcase"
                  ? "object-cover object-top px-6 origin-bottom scale-[1.12]"
                  : project.slug === "ecorize-website"
                    ? "[-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_45%)] [mask-image:linear-gradient(to_top,transparent_0%,#000_45%)]"
                    : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
