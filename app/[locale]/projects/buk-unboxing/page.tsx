import { ArrowLeft, ArrowRight, Braces } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { GithubLink } from "@/components/shared/github-link";
import { GlowCard } from "@/components/ui/glow-card";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "buk-unboxing");

export const metadata: Metadata = {
  title: project?.title ?? "BUK-Unboxing",
  description: project?.description.en,
};

export default async function BukUnboxingPage({
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

        <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl leading-[1.05] md:text-5xl">
            {project.title}
          </h1>
          <GithubLink locale={loc} compact />
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-5 border-b border-border/60 pb-6 font-sans not-italic sm:grid-cols-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Tech Stack" : "Tech stack"}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/html_logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                HTML5
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/css_logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                CSS3
              </span>
              <span className="inline-flex items-center gap-2">
                <Braces className="h-4 w-4" />
                JavaScript
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Kategorien" : "Categories"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {project.tags
                .filter(
                  (t) => !["HTML5", "CSS3", "JavaScript"].includes(t),
                )
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

        <div className="mt-8 max-w-2xl space-y-10 text-base leading-7">
          <section className="space-y-3">
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
              Motivation
            </h2>
            <p className="text-foreground/85">
              {loc === "de"
                ? "BUK Unboxing ist eine interaktive Web-App, inspiriert vom Thrill der Case-Openings aus Counter-Strike — dieser Mix aus Spannung, Zufall und der Frage, was als Nächstes rauskommt. Statt Skins werden hier Personen, Tänze, Musik und Aufgaben gespint. Jede Runde fühlt sich an wie ein echtes Unboxing: Der Slot rattert, die Spannung steigt, am Ende gewinnt oder verliert man — und genau dieser Moment zündet jedes Mal aufs Neue."
                : "BUK Unboxing is an interactive web app inspired by the thrill of Counter-Strike case openings — that mix of suspense, chance and the question of what drops next. Instead of skins, it spins people, dances, music and tasks. Every round feels like a real unboxing: the slot rattles, tension builds, in the end you win or lose — and that moment lands every single time."}
            </p>
            <p className="text-foreground/85">
              {loc === "de"
                ? "Kein statisches Interface, sondern eine kleine Show: animierte Slot-Mechanik, Partikel-Effekte, Soundeffekte. Drei Modi und seltene Rarity-Stufen sorgen dafür, dass jeder Spin ein eigenes Highlight werden kann — vom langweiligen Common bis zum richtig fetten Hit."
                : "Not a static interface, but a little show: animated slot mechanics, particle effects, sound effects. Three modes and rare rarity tiers make sure every spin can become its own highlight — from boring common to a really fat hit."}
            </p>
            <p className="text-foreground/85">
              {loc === "de"
                ? "Mein Ziel war es, eine Web-App zu bauen, die hyped, Spannung erzeugt und Jugendliche motiviert, dabei zu sein und etwas zu gewinnen."
                : "My goal was to build a web app that creates hype, builds tension, and motivates teens to show up for a shot at winning."}
            </p>
          </section>
        </div>

        <h2 className="mt-16 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
          UX · UI
        </h2>

        <ol className="mt-8 space-y-12 sm:space-y-16">
          {[
            {
              src: "/thumbnails/buk-unboxing-home.png",
              title: loc === "de" ? "Home · Spin Person" : "Home · Spin person",
              body:
                loc === "de"
                  ? "Die Hauptbühne. Profile rotieren als Karussell, der Spin-Button startet die Slot-Mechanik. Bis zum Stop bleibt offen, wer am Ende der Reihe steht."
                  : "The main stage. Profiles rotate as a carousel, the spin button kicks off the slot mechanic. Who lands at the end stays open until the stop.",
            },
            {
              src: "/thumbnails/buk-unboxing-mode.png",
              title: loc === "de" ? "Variante wählen" : "Pick a variant",
              body:
                loc === "de"
                  ? "Wer gespint wurde, wählt selbst die Variante. Manche sind Save — keine Strafen, dafür auch keine richtig krassen Awards. Andere gehen ins Risiko, mit größeren Highlights."
                  : "Whoever got spun picks the variant themselves. Some are Save — no penalties, but also no major awards. Others go all-in, with bigger highlights.",
            },
            {
              src: "/thumbnails/buk-unboxing-win.png",
              title: loc === "de" ? "Reveal · Win" : "Reveal · win",
              body:
                loc === "de"
                  ? "Wenn der Slot anhält, klappt das Reveal-Panel auf. Was gewonnen wurde — Karte, Gutschein, Aufgabe — bekommt seine eigene Inszenierung. Direkt im Anschluss geht's in die nächste Runde."
                  : "When the slot stops, the reveal panel opens up. Whatever was won — card, voucher, task — gets its own staging. Straight into the next round from there.",
            },
          ].map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={item.src}>
                <figure>
                  <GlowCard className="overflow-hidden rounded-2xl">
                    <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-neutral-950">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 768px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </GlowCard>
                  <figcaption className="mt-4 max-w-2xl font-sans not-italic">
                    <span className="text-xs font-medium tabular-nums tracking-[0.18em] text-muted-foreground">
                      {num}
                    </span>
                    <h3 className="mt-1.5 text-xl leading-tight md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/75 md:text-[15px] md:leading-7">
                      {item.body}
                    </p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>

        <section className="mt-16">
          <h2 className="max-w-2xl font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
            {loc === "de" ? "Architektur" : "Architecture"}
          </h2>

          <pre className="mt-4 overflow-x-auto rounded-2xl border border-border/60 bg-neutral-950 p-6 font-mono text-xs leading-relaxed text-foreground/75 md:text-sm">
{`portfolio/
├── index.html
├── style.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── projects/`}
          </pre>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/85">
            {loc === "de"
              ? "Minimal-Struktur: keine Server, keine DB, kein Build-Tool. Eine HTML-Datei, ein Stylesheet, ein JS-Modul, ein paar Assets — mehr braucht es nicht."
              : "Minimal structure: no server, no DB, no build tool. One HTML file, one stylesheet, one JS module, some assets — nothing more required."}
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {[
              {
                step: "01",
                label: "HTML",
                title: "index.html",
                body:
                  loc === "de"
                    ? "Die einzige Seite. Markup für Header, Slot-Karussell, Mode-Selector und Reveal-Modal. Keine Templates, keine Components — alles in einer Datei."
                    : "The only page. Markup for the header, slot carousel, mode selector and reveal modal. No templates, no components — everything in one file.",
              },
              {
                step: "02",
                label: "CSS",
                title: "style.css",
                body:
                  loc === "de"
                    ? "Komplett handgeschrieben, kein Tailwind, kein Bootstrap. Layout, Übergänge, Slot-Animationen und Particle-Effekte über Keyframes — die ganze Show steckt in den Styles."
                    : "Completely handwritten, no Tailwind, no Bootstrap. Layout, transitions, slot animations and particle effects via keyframes — the whole show lives in the styles.",
              },
              {
                step: "03",
                label: "JavaScript",
                title: "js/main.js",
                body:
                  loc === "de"
                    ? "Vanilla ES6+, ein Modul. Slot-Logik, Rarity-Berechnung, Sound-Trigger, Pool-Management pro Modus. Kein Framework, keine Dependencies."
                    : "Vanilla ES6+, one module. Slot logic, rarity calculation, sound triggers, pool management per mode. No framework, no dependencies.",
              },
            ].map((item) => (
              <li key={item.step} className="border-t border-border/60 pt-4">
                <div className="flex items-baseline gap-2 font-sans not-italic">
                  <span className="text-xs font-medium tabular-nums tracking-[0.18em] text-muted-foreground">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-2 font-mono text-base leading-snug not-italic text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl text-base leading-7 text-foreground/85">
            {loc === "de"
              ? "Das ganze Projekt läuft lokal im Browser — index.html doppelklicken reicht."
              : "The whole project runs locally in the browser — double-click index.html and it works."}
          </p>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-8">
          <GithubLink locale={loc} />

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
