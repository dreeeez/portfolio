"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glowColor?: string;
};

export function GlowCard({
  className,
  children,
  glowColor = "rgba(255,255,255,0.18)",
  ...props
}: GlowCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Touch devices have no cursor to drive the glow, so default it to true
  // (cursor-driven, hidden until hover) and flip to a static glow once we
  // detect a non-hover device.
  const [isHoverDevice, setIsHoverDevice] = React.useState(true);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // Cursor-following on hover devices; a fixed top-left glow on touch screens
  // so the effect is always visible there.
  const backgroundImage = isHoverDevice
    ? `radial-gradient(420px circle at var(--mx, -200px) var(--my, -200px), ${glowColor}, transparent 60%)`
    : `radial-gradient(420px circle at 22% 16%, ${glowColor}, transparent 60%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-colors hover:border-border",
        className,
      )}
      style={{ backgroundImage }}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
