import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { videoUrl } from "@/lib/media";

const project = projects.find((p) => p.slug === "roman-battle");

export const metadata: Metadata = {
  title: project?.title ?? "Roman Battle — UE5",
  description: project?.description.en,
};

export default async function RomanBattlePage({
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/unreal_white.webp"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Unreal Engine 5
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/fab.svg"
                  alt=""
                  className="h-4 w-auto object-contain"
                />
                Fab Marketplace
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/envato.png"
                  alt=""
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
                .filter((t) => t !== "Unreal Engine 5")
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
              ? "Für unsere diesjährige Kinderfreizeit haben wir im Rahmen des Aktivitätstags einen Stationenlauf im Römer-Style vorbereitet. Damit die Kids in die Welt reinfinden, ist dazu eine kurze Animations-Geschichte in Unreal Engine 5 entstanden, die im Saal als Eröffnung gezeigt wurde."
              : "For this year's kids' summer camp we put together a Roman-themed station course as part of our activity day. To set the scene, I built a short animated intro in Unreal Engine 5 that ran on the main stage before the kids headed out."}
          </p>
          <p className="text-muted-foreground">
            {loc === "de"
              ? "Die Welt-Assets, Charakter-Modelle und Animations-Sets habe ich aus dem Fab Marketplace (Epic Games) bezogen."
              : "I sourced the world assets, character models and animation sets from the Fab Marketplace (Epic Games)."}
          </p>
        </div>

        <figure className="mt-10">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "UE5 Cinematic" : "UE5 cinematic"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("roman-battle-cinematic.mp4")}
              poster={project.video?.poster}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <figure className="mt-8">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "Live-Aufführung" : "Live performance"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("roman-battle-live.mp4")}
              poster="/videos/roman-battle-live.jpg"
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
