"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

type InfiniteGridProps = {
  children: React.ReactNode;
  className?: string;
  showOrbs?: boolean;
};

const COLS = 6;
const ROWS = 5;
const SPACING = 190;
const LOGO = 64;
const TILE_W = COLS * SPACING;
const TILE_H = ROWS * SPACING;
const SPEED_X = 0.18;
const SPEED_Y = 0.18;
const REVEAL_RADIUS = 380;
const GRID_CELL = 40;

const LOGOS = [
  "/logos/_grid/ts_white.webp",
  "/logos/_grid/react_logo.webp",
  "/logos/_grid/nextjs.webp",
  "/logos/_grid/tailwind.webp",
  "/logos/_grid/html_logo_white.webp",
  "/logos/_grid/css_logo_white.webp",
  "/logos/_grid/vs_code.webp",
  "/logos/_grid/python_logo.webp",
  "/logos/_grid/sql_logo.webp",
  "/logos/_grid/pandas.webp",
  "/logos/_grid/plotly.webp",
  "/logos/_grid/streamlit.webp",
  "/logos/_grid/supabase.webp",
  "/logos/_grid/vercel.webp",
  "/logos/_grid/git_logo.webp",
  "/logos/_grid/figma.webp",
  "/logos/_grid/ps_white.webp",
  "/logos/_grid/ae_white.webp",
  "/logos/_grid/indesign_white.webp",
  "/logos/_grid/blender.webp",
  "/logos/_grid/unreal_white.webp",
  "/logos/_grid/davinci_white.webp",
  "/logos/_grid/capcut.webp",
  "/logos/_grid/PowerBI.webp",
  "/logos/_grid/sap_white.webp",
  "/logos/_grid/databricks.webp",
  "/logos/_grid/claude_logo.webp",
  "/logos/_grid/Midjourney%20logo.webp",
  "/logos/_grid/runway_logo_white.webp",
  "/logos/_grid/11logo_white.webp",
];

type Placement = { x: number; y: number; src: string };

const PLACEMENTS: Placement[] = (() => {
  const out: Placement[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const i = row * COLS + col;
      out.push({
        x: (col + 0.5) * SPACING - LOGO / 2,
        y: (row + 0.5) * SPACING - LOGO / 2,
        src: LOGOS[i % LOGOS.length],
      });
    }
  }
  return out;
})();

export function InfiniteGrid({
  children,
  className,
  showOrbs = true,
}: InfiniteGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "0px" });

  // Touch devices have no cursor to drive the reveal mask. Skip the
  // per-frame offset shift entirely so we don't burn main thread time
  // animating something the user can't see.
  const [isHoverDevice, setIsHoverDevice] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    if (
      !isHoverDevice ||
      !isInView ||
      (typeof document !== "undefined" && document.hidden)
    ) {
      return;
    }
    offsetX.set((offsetX.get() + SPEED_X) % TILE_W);
    offsetY.set((offsetY.get() + SPEED_Y) % TILE_H);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverDevice) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Smooth alpha falloff — logos fade in/out continuously with distance from
  // the cursor instead of popping over a hard edge.
  const maskImage = useMotionTemplate`radial-gradient(${REVEAL_RADIUS}px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 12%, rgba(0,0,0,0.78) 26%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.32) 58%, rgba(0,0,0,0.15) 74%, rgba(0,0,0,0.05) 88%, rgba(0,0,0,0.01) 96%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full overflow-hidden bg-background noise",
        className,
      )}
    >
      {/* Cursor-revealed grid lines on hover devices; subtle static layer
          on touch devices (handled in globals.css via @media hover: none). */}
      <motion.div
        className="cursor-mask pointer-events-none absolute inset-0 z-0 text-foreground opacity-30 dark:opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} />
      </motion.div>

      {/* Cursor-revealed logo grid on hover devices; subtle static layer
          on touch devices (handled in globals.css via @media hover: none). */}
      <motion.div
        className="cursor-mask cursor-mask-logos pointer-events-none absolute inset-0 z-0 brightness-0 dark:invert dark:sepia dark:hue-rotate-[200deg] dark:saturate-[5] dark:opacity-30 dark:blur-[0.5px] dark:drop-shadow-[0_0_32px_rgba(37,99,235,1)]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <LogoPattern offsetX={offsetX} offsetY={offsetY} />
      </motion.div>

      {/* Safe zone — hides the background pattern in the centered hero area
          so the headline and CTAs aren't crowded by logos/grid lines. */}
      <div
        aria-hidden="true"
        className="hero-safezone pointer-events-none absolute inset-0 z-[1] bg-background"
      />

      {showOrbs && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute right-[-15%] top-[-20%] h-[55%] w-[55%] rounded-full bg-orange-500/30 blur-[140px] dark:bg-orange-500/15" />
          <div className="absolute right-[5%] top-[-5%] h-[25%] w-[25%] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-25%] left-[-15%] h-[55%] w-[55%] rounded-full bg-blue-500/30 blur-[140px] dark:bg-blue-500/15" />
        </div>
      )}

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

type LogoPatternProps = {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
};

function GridPattern({ offsetX, offsetY }: LogoPatternProps) {
  return (
    <svg className="h-full w-full text-foreground" aria-hidden="true">
      <defs>
        <motion.pattern
          id="infinite-grid-lines"
          width={GRID_CELL}
          height={GRID_CELL}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${GRID_CELL} 0 L 0 0 0 ${GRID_CELL}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-grid-lines)" />
    </svg>
  );
}

function LogoPattern({ offsetX, offsetY }: LogoPatternProps) {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id="infinite-logo-pattern"
          width={TILE_W}
          height={TILE_H}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          {PLACEMENTS.map((p, i) => (
            <image
              key={i}
              href={p.src}
              x={p.x}
              y={p.y}
              width={LOGO}
              height={LOGO}
              preserveAspectRatio="xMidYMid meet"
            />
          ))}
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-logo-pattern)" />
    </svg>
  );
}
