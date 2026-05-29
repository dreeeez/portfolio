import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { videoUrl } from "@/lib/media";

const project = projects.find((p) => p.slug === "ae-animations");

export const metadata: Metadata = {
  title: project?.title ?? "After Effects — Motion",
  description: project?.description.en,
};

export default async function AeAnimationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!project) return null;

  const loc = locale === "de" ? "de" : "en";

  return (
    <article className="relative pb-24 pt-24 md:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-sans text-sm not-italic text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {loc === "de" ? "Zurück zu Projekten" : "Back to projects"}
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl leading-[1.05] md:text-5xl">
            {project.title}
          </h1>
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-5 border-b border-border/60 pb-6 font-sans not-italic sm:grid-cols-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Tech Stack" : "Tech stack"}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/ae.webp"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                After Effects
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/ps.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Photoshop
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/google-flow.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Google Flow
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/artlist.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Artlist
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/envato.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Envato
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Kategorien" : "Categories"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {project.tags
                .filter((t) => t !== "After Effects")
                .join(" · ")}
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Jahr" : "Year"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">{project.year}</dd>
          </div>
        </dl>

        <div className="mt-8 max-w-2xl space-y-3 text-base leading-7">
          <p className="text-foreground/85">
            {loc === "de"
              ? "Die Herausforderung war es, im Rahmen eines Jugendcamps die Finalspiele mehrerer Sportarten mit einer kurzen Show zu introducen — hier ein paar Einblicke."
              : "The challenge: produce short intro shows for the final games of several sports at a youth camp — here are a few glimpses."}
          </p>
          <p className="text-muted-foreground">
            {loc === "de"
              ? "Workflow: teils mit Templates gestartet, Bilder via Google Flow AI generiert und in Photoshop nachgezogen, die Motion in After Effects gebaut, Sound aus Artlist und Envato."
              : "Workflow: started from a few templates, generated imagery with Google Flow AI and reworked it in Photoshop, animated the motion in After Effects, sourced the sound from Artlist and Envato."}
          </p>
        </div>

        <figure className="mt-10">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "Showcase" : "Showcase"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={project.video?.src ? videoUrl(project.video.src) : undefined}
              poster={project.video?.poster}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <div className="mt-16 border-t border-border/60 pt-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-3 font-sans text-sm not-italic text-muted-foreground transition-colors hover:text-foreground"
          >
            {loc === "de" ? "Alle Projekte ansehen" : "See all projects"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
