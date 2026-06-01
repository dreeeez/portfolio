import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { videoUrl } from "@/lib/media";

const project = projects.find((p) => p.slug === "character-animation");

export const metadata: Metadata = {
  title: project?.title ?? "Character Animation — UE5",
  description: project?.description.en,
};

export default async function CharacterAnimationPage({
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
                  src="/logos/unreal_white.webp"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Unreal Engine 5
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/blender.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Blender
              </span>
              <span>Auto-Rig Pro</span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/superhive.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Superhive
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/quickmagic-quickmagic.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                QuickMagic AI
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
              ? "Für das Pace Run-Event — einen sportlichen Wettkampf zwischen mehreren Teams — habe ich mich zum ersten Mal an Character Animation getraut. Entstanden sind ein Countdown, ein Intro-Character-Video und ein Bumper für die Übergänge zwischen den Event-Phasen."
              : "For the Pace Run event — a sports competition between several teams — I tried character animation for the first time. The result: a countdown, an intro character video and a bumper for the breaks between event phases."}
          </p>
          <p className="text-muted-foreground">
            {loc === "de"
              ? "Den Character-Mesh und Teile der Welt habe ich als fertige Assets bekommen — an einigen Stellen aber noch nachgetweakt. Ein Teil der Welt habe ich zusätzlich in Blender modifiziert bzw. ergänzt. Das Rigging lief über das Auto-Rig Pro Plugin aus dem Blender-Plugin-Marketplace Superhive."
              : "The character mesh and parts of the world came as ready-made assets — I tweaked a few of them. Some of the world I modified and added in Blender on top. Rigging was done with the Auto-Rig Pro plugin from Superhive (the Blender plugin marketplace)."}
          </p>
          <p className="text-muted-foreground">
            {loc === "de"
              ? "Wirklich spannend war hier das Motion Capture: Ich habe mich mit dem iPhone gefilmt und die Motion-Daten anschließend über QuickMagic AI extrahiert. Schaut's euch an ;)"
              : "The really exciting part was the motion capture: I recorded myself on my iPhone and pulled the motion data via QuickMagic AI. Have a look ;)"}
          </p>
        </div>

        <figure className="mt-10">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de"
              ? "Motion Capture — iPhone vs. Animation"
              : "Motion capture — iPhone vs. animation"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("character-animation-mocap.mp4")}
              poster="/videos/character-animation-mocap.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <figure className="mt-8">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "Event-Countdown" : "Event countdown"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("character-animation-countdown.mp4")}
              poster="/videos/character-animation-countdown.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <figure className="mt-8">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de" ? "Pace Run — Animation" : "Pace Run — animation"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("character-animation-pace.mp4")}
              poster="/videos/character-animation-pace.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </figure>

        <figure className="mt-8">
          <figcaption className="mb-3 font-sans text-xs uppercase tracking-[0.18em] not-italic text-muted-foreground">
            {loc === "de"
              ? "Bumper — Übergang zwischen den Phasen"
              : "Bumper — transition between phases"}
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-black">
            <video
              src={videoUrl("character-animation-cinematic.mp4")}
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
