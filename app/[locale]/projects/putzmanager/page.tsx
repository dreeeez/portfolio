import { ArrowLeft, ArrowRight, Bot } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { GithubLink } from "@/components/shared/github-link";
import { GlowCard } from "@/components/ui/glow-card";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "putzmanager");

export const metadata: Metadata = {
  title: project?.title ?? "Putzschichten Manager",
  description: project?.description.en,
};

export default async function PutzmanagerPage({
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
                  src="/logos/nextjs.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Next.js
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/tailwind.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Tailwind CSS
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/supabase.webp"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Supabase
              </span>
              <span className="inline-flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Telegram Bot API
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/vercel.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Vercel
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
                      "Next.js",
                      "Tailwind CSS",
                      "Supabase",
                      "Telegram Bot API",
                      "Vercel",
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
                ? "In unserer Freikirche koordinieren mehrere Gruppen die Putzschichten für die Gemeinderäume — repetitive Prozesse, die immer gleich ablaufen, kann man gut automatisieren. Wer putzt diese Woche? Wer war letztes Mal Verantwortlicher? Wer ist gerade im Urlaub? Diese Fragen kommen jede Woche aufs Neue — und genau dafür ist Software gemacht. Wir starten jetzt mit einer Testphase und schauen, wie es im Alltag funktioniert."
                : "At our free church, several groups coordinate the cleaning shifts for the community rooms — repetitive processes that always run the same way are a natural fit for automation. Who's cleaning this week? Who was responsible last time? Who's on vacation right now? These questions come up every week — and that's exactly what software is made for. We're kicking off a test phase now to see how it holds up in everyday use."}
            </p>
          </section>
        </div>

        <h2 className="mt-16 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
          UX · UI
        </h2>

        <ol className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12">
          {[
            {
              src: project.image,
              span: "md:col-span-7",
              aspect: "md:aspect-[16/10]",
              objectPos: "md:object-left-top",
              title: loc === "de" ? "Schicht einteilen" : "Plan a shift",
              body:
                loc === "de"
                  ? "Schichten im Kalender anlegen, Crew zuweisen, freie Slots auf einen Blick. Vorlagen erzeugen wiederkehrende Schichten ohne Tipparbeit."
                  : "Create shifts in the calendar, assign the crew, see open slots at a glance. Templates create recurring shifts without retyping.",
            },
            {
              src: "/thumbnails/putzmanager-mitglieder.png",
              span: "md:col-span-5",
              aspect: "md:aspect-[10/9]",
              objectPos: "md:object-left-top",
              title: loc === "de" ? "Mitglieder" : "Members",
              body:
                loc === "de"
                  ? "Rollen, Verfügbarkeit und Einsatz-Statistik pro Person — ohne separate Excel-Liste."
                  : "Roles, availability and assignment stats per person — without a separate spreadsheet.",
            },
            {
              src: "/thumbnails/putzmanager-konfiguration.png",
              span: "md:col-span-4",
              aspect: "md:aspect-[4/5]",
              objectPos: "object-center",
              objectFit: "object-contain",
              title: loc === "de" ? "Schicht konfigurieren" : "Configure shift",
              body:
                loc === "de"
                  ? "Aufgaben, Crew-Größe und Vorlagen. Einmal definiert — ab da läuft die Einteilung automatisch."
                  : "Tasks, crew size and templates. Defined once — from there the assignment runs by itself.",
            },
            {
              src: "/thumbnails/putzmanager-nachrichten.png",
              span: "md:col-span-4",
              aspect: "md:aspect-[4/5]",
              objectPos: "md:object-left-top",
              title: loc === "de" ? "Nachricht erstellen" : "Compose message",
              body:
                loc === "de"
                  ? "Reminder formulieren und für den richtigen Zeitpunkt einplanen — Ping nur an die Betroffenen."
                  : "Draft reminders and schedule them for the right moment — ping only the people involved.",
            },
            {
              src: "/thumbnails/putzmanager-telegram.jpg",
              span: "md:col-span-4",
              aspect: "md:aspect-[4/5]",
              objectPos: "object-center",
              objectFit: "object-contain",
              title: loc === "de" ? "Auslieferung" : "Delivery",
              body:
                loc === "de"
                  ? "Reminder landet automatisch im Gruppen-Chat. Der Bot übernimmt — niemand muss Telegram pflegen."
                  : "The reminder lands automatically in the group chat. The bot handles it — nobody manages Telegram.",
            },
          ].map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={item.src} className={item.span}>
                <figure className="flex h-full flex-col">
                  <div className="relative isolate">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-x-8 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_45%,transparent_70%)] blur-2xl"
                    />
                    <GlowCard className="overflow-hidden rounded-2xl">
                      <div
                        className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-950 ${item.aspect}`}
                      >
                        {item.src && (
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className={`${item.objectFit ?? "object-cover"} ${item.objectPos}`}
                          />
                        )}
                      </div>
                    </GlowCard>
                  </div>
                  <figcaption className="mt-4 font-sans not-italic">
                    <span className="text-xs font-medium tabular-nums tracking-[0.18em] text-muted-foreground">
                      {num}
                    </span>
                    <h3 className="mt-1.5 text-lg leading-snug md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/75">
                      {item.body}
                    </p>
                  </figcaption>
                </figure>
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
              <Image
                src="/thumbnails/putzmanager-architecture.png"
                alt={
                  loc === "de"
                    ? "Systemarchitektur — iCal, Next.js auf Vercel, Supabase und Telegram-Bot"
                    : "System architecture — iCal, Next.js on Vercel, Supabase and Telegram bot"
                }
                width={1126}
                height={743}
                className="block h-auto w-full object-contain"
              />
            </div>
          </figure>

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {[
              {
                step: "01",
                label: loc === "de" ? "Input" : "Input",
                title: "iCal · Telegram",
                body:
                  loc === "de"
                    ? "Der Saal-Kalender als iCal-Feed liefert die anstehenden Termine, der Telegram-Bot bringt Anmeldungen und Abmeldungen aus der Gruppe rein."
                    : "The hall's calendar as an iCal feed delivers upcoming events, the Telegram bot brings registrations and cancellations in from the group.",
              },
              {
                step: "02",
                label: loc === "de" ? "Compute" : "Compute",
                title: "Next.js auf Vercel",
                body:
                  loc === "de"
                    ? "Kleine Services pro Aufgabe: Kalender einlesen, Vorlagen in Schichten umsetzen, Leute fair verteilen, Reminder planen. Zwei Cron-Jobs prüfen zweimal täglich auf fällige Reminder und schicken sie über die Telegram Bot API in die Gruppe."
                    : "Small services, one job each: read the calendar, turn templates into shifts, distribute people fairly, schedule reminders. Two cron jobs check twice a day for due reminders and push them into the group via the Telegram Bot API.",
              },
              {
                step: "03",
                label: loc === "de" ? "Storage" : "Storage",
                title: "Supabase Postgres",
                body:
                  loc === "de"
                    ? "Events, Schichten, Einteilungen, Mitglieder, Abwesenheiten, Vorlagen und Reminder-Status. Die DB persistiert — entscheiden tut bewusst nur die Logik in den Services."
                    : "Events, shifts, assignments, members, absences, templates and reminder status. The DB persists — only the service logic ever decides anything.",
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
              ? "So entsteht ein klarer Fluss: Kalender rein, Schichten erzeugen, Personen einteilen, zur richtigen Zeit erinnern — und das alles, ohne dass jemand eine Excel-Liste pflegen muss."
              : "The result is a clean flow: calendar in, shifts generated, people assigned, reminded at the right time — all without anyone having to maintain a spreadsheet."}
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
