"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ZoomableImageProps = {
  src: string;
  alt: string;
  /** Render the thumbnail with `fill` (the wrapping button is positioned). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /** Classes for the thumbnail image. */
  className?: string;
  /** Classes for the wrapping trigger button. */
  buttonClassName?: string;
  /** Localised label for the expand affordance. */
  zoomLabel?: string;
  /** Localised label for the close button. */
  closeLabel?: string;
};

/**
 * A thumbnail that opens a full-screen lightbox of the same image on click, so
 * dense graphics and posters can be read at full size. The overlay renders in a
 * portal on <body>, closes on backdrop click or Escape, and locks background
 * scroll while open.
 */
export function ZoomableImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  buttonClassName,
  zoomLabel = "Enlarge",
  closeLabel = "Close",
}: ZoomableImageProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={zoomLabel}
        className={cn("group cursor-zoom-in", buttonClassName)}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          sizes={sizes}
          className={className}
        />
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-lg border border-white/15 bg-black/45 p-2 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="absolute right-4 top-4 z-10 rounded-lg border border-white/15 bg-black/45 p-2 text-white/80 backdrop-blur-md transition-colors hover:text-white sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative h-[85vh] w-[92vw] max-w-5xl"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
