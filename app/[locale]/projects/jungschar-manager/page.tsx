import { ArrowLeft, ArrowRight, Bot, CloudSun } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { GithubLink } from "@/components/shared/github-link";
import { GlowCard } from "@/components/ui/glow-card";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "jungschar-manager");

export const metadata: Metadata = {
  title: project?.title ?? "Jungschar Manager",
  description: project?.description.en,
};

export default async function JungscharManagerPage({
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/ts.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                TypeScript
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/nextjs.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Next.js
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/tailwind.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Tailwind CSS
              </span>
              <span className="inline-flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Telegram Bot API
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/supabase.webp"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Supabase
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/vercel.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Vercel
              </span>
              <span className="inline-flex items-center gap-2">
                <CloudSun className="h-4 w-4" />
                Open-Meteo
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
                  (t) =>
                    ![
                      "TypeScript",
                      "Next.js",
                      "Tailwind CSS",
                      "Telegram Bot API",
                      "Supabase",
                      "Vercel",
                      "Open-Meteo",
                    ].includes(t),
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
                ? "Die wöchentliche Jungschar lebt von Koordination: Wer leitet, wer kocht, wer kommt überhaupt? Vorher lief das über WhatsApp und Telegram — alles händisch und jede Woche aufs Neue. Jemand musste daran denken, Nachrichten schicken, Antworten zusammensuchen, am Freitagabend noch hektisch klären, ob das Essen organisiert ist. Der Bot übernimmt diese wiederkehrenden Abstimmungen vollständig: Reminder kommen pünktlich, Zu- und Absagen sind sichtbar, Geburtstage und Wetter sind automatisch dabei. Das Leitungsteam muss nichts mehr im Kopf behalten — die Standardprozesse laufen von selbst."
                : "The weekly youth group runs on coordination: who's leading, who's cooking, who's even showing up? Before, all of that happened in WhatsApp and Telegram — manually, every single week. Someone had to remember, send the messages, collect the answers, and on Friday evening still scramble to figure out whether dinner was sorted. The bot takes over these recurring agreements completely: reminders arrive on time, RSVPs are visible, birthdays and weather show up automatically. The leadership team doesn't have to keep anything in their head anymore — the standard processes run on their own."}
            </p>
          </section>

        </div>

        <h2 className="mt-16 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
          UX · UI
        </h2>

        <ol className="mt-8 space-y-10 sm:space-y-14">
          {[
            {
              src: "/thumbnails/jungschar-manager.png",
              title: loc === "de" ? "Admin-Übersicht" : "Admin overview",
              body:
                loc === "de"
                  ? "Der Einstieg in die Mini-App. Helfer, Kalender, Eltern, Kinder, Archiv und Einstellungen — jeder Bereich klar getrennt, ein Tap entfernt. Bewusst reduziert, damit das Leitungsteam nicht erst suchen muss."
                  : "The entry into the mini app. Helpers, calendar, parents, kids, archive and settings — every section clearly separated, one tap away. Deliberately reduced so the leadership team doesn't have to hunt for anything.",
            },
            {
              src: "/thumbnails/jungschar-manager-2.png",
              title: loc === "de" ? "Kalender & Einteilung" : "Calendar & assignments",
              body:
                loc === "de"
                  ? "Kommende Termine mit den eingeteilten Helfern und Essen-Familien direkt darunter. Eine Liste — kein Springen zwischen Screens. Bei Bedarf lässt sich die Einteilung manuell neu generieren."
                  : "Upcoming dates with assigned helpers and meal families right below. One list — no jumping between screens. Assignments can be regenerated manually if needed.",
            },
            {
              src: "/thumbnails/jungschar-manager-telegram.png",
              title: loc === "de" ? "Live-Reminder in Telegram" : "Live reminders in Telegram",
              body:
                loc === "de"
                  ? "Die Pinned Message wächst mit. Countdown, Wetter, Team, Essen, Checkliste — alles in einer einzigen Nachricht, die der Bot live editiert sobald jemand zu- oder absagt. Kein Spam, kein Scrollen."
                  : "The pinned message grows with the group. Countdown, weather, team, food, checklist — all in a single message that the bot edits live as soon as someone RSVPs. No spam, no scrolling.",
            },
            {
              src: "/thumbnails/jungschar-manager-archiv.png",
              title: loc === "de" ? "Archiv & Reflexion" : "Archive & reflection",
              body:
                loc === "de"
                  ? "Vergangene Termine bleiben einsehbar — wer war dabei, wer hat geleitet, wie wurde der Abend bewertet. Daraus entsteht über die Zeit ein Bild davon, was funktioniert und was nicht."
                  : "Past dates stay accessible — who joined, who led, how the evening was rated. Over time this builds a picture of what works and what doesn't.",
            },
          ].map((item, i) => {
            const reverse = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li
                key={item.src}
                className={`grid items-center gap-6 sm:gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[220px] isolate">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-16 -inset-y-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0.04)_45%,transparent_70%)] blur-2xl"
                  />
                  <GlowCard className="overflow-hidden rounded-3xl">
                    <div className="aspect-[9/19] overflow-hidden rounded-3xl bg-neutral-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </GlowCard>
                </div>

                <div className={`max-w-md ${reverse ? "md:pr-4" : "md:pl-4"}`}>
                  <span className="font-sans text-xs font-medium tabular-nums tracking-[0.18em] text-muted-foreground not-italic">
                    {num}
                  </span>
                  <h3 className="mt-2 text-xl leading-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-foreground/75 md:text-[15px] md:leading-7">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="mt-16">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
              {loc === "de" ? "Architektur" : "Architecture"}
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground/85">
              {loc === "de"
                ? "Drei Ebenen, ein Kreislauf — Input oben, Logik in der Mitte, Persistenz unten."
                : "Three layers, one loop — input on top, logic in the middle, persistence at the bottom."}
            </p>
          </div>

          <figure className="mt-8">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-neutral-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/thumbnails/jungschar-manager-architecture.png"
                alt={
                  loc === "de"
                    ? "Systemarchitektur — Telegram, Next.js auf Vercel, Supabase und Open-Meteo"
                    : "System architecture — Telegram, Next.js on Vercel, Supabase and Open-Meteo"
                }
                className="block h-auto w-full object-contain"
              />
            </div>
          </figure>

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {[
              {
                step: "01",
                label: loc === "de" ? "Input" : "Input",
                title: "Telegram · Open-Meteo",
                body:
                  loc === "de"
                    ? "Updates aus der Telegram-Gruppe (Registrierungen, Vote-Klicks) und die Wetter-Prognose von Open-Meteo, gezielt für den Jungschar-Slot."
                    : "Updates from the Telegram group (registrations, vote clicks) and the weather forecast from Open-Meteo, scoped to the youth-group time slot.",
              },
              {
                step: "02",
                label: loc === "de" ? "Compute" : "Compute",
                title: "Next.js auf Vercel",
                body:
                  loc === "de"
                    ? "Kleine Services pro Aufgabe: Reminder bauen (Sonntag-Heads-up, Mittwochs-Countdown mit Vote-Buttons, Samstag-Aufwacher), Donnerstag-Abend gezielt die Helfer ohne Antwort pingen, Bot-Klicks live in die Pinned Message editieren. Zwei Cron-Jobs triggern täglich. Die Mini-App öffnet direkt in Telegram und greift auf dieselbe DB zu."
                    : "Small services, one job each: build reminders (Sunday heads-up, Wednesday countdown with vote buttons, Saturday wake-up), ping only the helpers without a reply on Thursday evening, edit bot clicks live into the pinned message. Two cron jobs trigger daily. The mini app opens straight inside Telegram and talks to the same DB.",
              },
              {
                step: "03",
                label: loc === "de" ? "Storage" : "Storage",
                title: "Supabase Postgres",
                body:
                  loc === "de"
                    ? "Stammdaten (Helfer, Eltern, Kinder), Events mit Zuweisungen und Essen-Familien, Vote-Status, Reminder-Log und Aktivitäten-History. Die DB persistiert — entscheiden tut bewusst nur die Logik in den Services."
                    : "Master data (helpers, parents, kids), events with assignments and meal families, vote status, reminder log and activity history. The DB persists — only the service logic ever decides anything.",
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
                <h3 className="mt-2 text-lg leading-snug md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-2xl text-sm leading-6 text-muted-foreground">
            {loc === "de"
              ? "So entsteht ein klarer Fluss: Termin anlegen, automatisch erinnern, Zu- und Absagen einsammeln, am Event-Tag aufwecken — und niemand muss mehr im Kopf behalten, wer kocht oder wer noch nicht geantwortet hat."
              : "The result is a clean flow: create a date, remind automatically, collect RSVPs, wake everyone on the day — and nobody has to keep in their head who's cooking or who hasn't replied yet."}
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
