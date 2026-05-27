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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-colors hover:border-border",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(420px circle at var(--mx, -200px) var(--my, -200px), ${glowColor}, transparent 60%)`,
      }}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
