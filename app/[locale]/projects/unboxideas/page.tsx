import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { GithubLink } from "@/components/shared/github-link";
import { GlowCard } from "@/components/ui/glow-card";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "unboxideas");

export const metadata: Metadata = {
  title: project?.title ?? "Upvote Mini App",
  description: project?.description.en,
};

export default async function UnboxideasPage({
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
                  src="/logos/python_logo.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Python
              </span>
              <span>Telegram Bot API</span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Kategorien" : "Categories"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {project.tags
                .filter((t) => t !== "Python" && t !== "Telegram Bot API")
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
                ? "Gute Ideen verstecken sich oft in langen Chat-Verläufen. Wer hat was vorgeschlagen, was war am Ende beliebt, was wurde nie aufgegriffen? Diese Mini-App sammelt Vorschläge an einem Ort, lässt die Gruppe upvoten und zeigt automatisch, wofür die Mehrheit ist — ohne dass jemand mitschreiben oder zusammenzählen muss."
                : "Good ideas often get lost in long chat threads. Who suggested what, what was popular in the end, what never got picked up? This mini app collects suggestions in one place, lets the group upvote them, and surfaces what the majority wants — without anyone needing to take notes or tally."}
            </p>
          </section>
        </div>

        <h2 className="mt-16 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
          UX · UI
        </h2>

        <ol className="mt-8 space-y-10 sm:space-y-14">
          {[
            {
              src: "/thumbnails/unboxideas-1.png",
              title: loc === "de" ? "Onboarding" : "Onboarding",
              body:
                loc === "de"
                  ? "Die Mini-App öffnet sich direkt aus Telegram. Der Einstieg führt durch die App und macht klar, wofür sie da ist — bevor es zum Einreichen geht."
                  : "The mini app opens straight from Telegram. The intro walks through the app and makes its purpose clear — before getting to submissions.",
            },
            {
              src: "/thumbnails/unboxideas-2.png",
              title: loc === "de" ? "Idee einreichen" : "Submit idea",
              body:
                loc === "de"
                  ? "Vorschlag eintippen, Kategorie wählen, publizieren. Die Idee landet sofort in der Gruppen-Liste und steht ab dem Moment zum Voting bereit."
                  : "Type the suggestion, pick a category, publish. The idea lands in the group list right away and is open for voting from that moment.",
            },
            {
              src: "/thumbnails/unboxideas-upvotes.png",
              title: loc === "de" ? "Voting & Reaktionen" : "Voting & reactions",
              body:
                loc === "de"
                  ? "Die meistgevoteten Ideen stehen oben — die Liste sortiert sich live nach Reaktionen. Per Tap auf 👍 😍 ❤️ 🔥 abstimmen, der Konsens wird ohne Diskussion sichtbar."
                  : "The most-voted ideas sit on top — the list sorts live by reaction count. Tap 👍 😍 ❤️ 🔥 to vote, and consensus surfaces without discussion.",
            },
            {
              src: "/thumbnails/unboxideas-stats.png",
              title: loc === "de" ? "Meine Statistik" : "My stats",
              body:
                loc === "de"
                  ? "Eigene eingereichte Ideen, gesammelte Upvotes und Reaktionen — auf einen Blick, was von einem selbst durchgekommen ist."
                  : "Your own submitted ideas, collected upvotes and reactions — at a glance, see what of yours made it through.",
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
                <div className="relative isolate mx-auto w-full max-w-[200px] sm:max-w-[220px]">
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
          <h2 className="max-w-2xl font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
            {loc === "de" ? "Architektur" : "Architecture"}
          </h2>

          <figure className="mt-4">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-neutral-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/thumbnails/unboxideas-architecture.png"
                alt={
                  loc === "de"
                    ? "Systemarchitektur — Telegram, Static Site auf Vercel, Supabase Postgres mit Realtime"
                    : "System architecture — Telegram, static site on Vercel, Supabase Postgres with Realtime"
                }
                className="block h-auto w-full object-contain"
              />
            </div>
          </figure>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/85">
            {loc === "de"
              ? "UnboxIdeas ist eine Telegram Mini-App: die Community reicht Ideen ein, bewertet mit Emoji-Reactions, diskutiert in Echtzeit. Kein App-Store, kein Login, kein Server — nur ein Bot, eine statische Web-App und eine Datenbank."
              : "UnboxIdeas is a Telegram Mini App: the community submits ideas, rates them with emoji reactions, discusses in real time. No app store, no login, no server — just a bot, a static web app and a database."}
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {[
              {
                step: "01",
                label: loc === "de" ? "Client" : "Client",
                title: "Telegram · WebApp SDK",
                body:
                  loc === "de"
                    ? "Über @UnboxIdeas_bot öffnet sich die Mini-App direkt im Telegram-Client. Das WebApp SDK liefert User-ID, Name und Profilbild automatisch — kein Login, kein App-Store, die Identität kommt von Telegram selbst."
                    : "Through @UnboxIdeas_bot the mini app opens directly inside the Telegram client. The WebApp SDK provides user ID, name and profile picture automatically — no login, no app store, identity comes from Telegram itself.",
              },
              {
                step: "02",
                label: loc === "de" ? "App" : "App",
                title: "Static Site auf Vercel",
                body:
                  loc === "de"
                    ? "index.html, style.css, script.js — mehr braucht es nicht. Drei Tabs (Vote · Submit · My Page) plus 4-Screen-Onboarding strukturieren alles. Reactions ersetzen Likes (7 Emojis), Moderatoren mit ⭐-Badge können fremde Posts bearbeiten oder löschen."
                    : "index.html, style.css, script.js — nothing more required. Three tabs (Vote · Submit · My Page) plus a 4-screen onboarding structure everything. Reactions replace likes (7 emojis), moderators with a ⭐ badge can edit or delete other people's posts.",
              },
              {
                step: "03",
                label: loc === "de" ? "Backend" : "Backend",
                title: "Supabase Postgres + Realtime",
                body:
                  loc === "de"
                    ? "Ideen, User, Reactions und Moderator-Rollen liegen in Postgres. Jede Aktion schreibt direkt — Supabase Realtime pusht Änderungen im selben Moment zu allen Clients. Row-Level-Security regelt Zugriffe, ein CHECK-Constraint hält die sieben erlaubten Emojis sauber."
                    : "Ideas, users, reactions and moderator roles live in Postgres. Every action writes directly — Supabase Realtime pushes changes to all clients at the same moment. Row-Level Security regulates access, a CHECK constraint keeps the seven allowed emojis clean.",
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

          <p className="mt-8 max-w-2xl text-base leading-7 text-foreground/85">
            {loc === "de"
              ? "So entsteht eine niedrigschwellige Ideen-Plattform genau dort, wo die Community sowieso schon ist: im Telegram-Chat. Eine Idee zu teilen kostet zwei Klicks, eine Reaction einen — und alles bleibt sichtbar, sortierbar und live."
              : "The result: a low-barrier idea platform exactly where the community already is — inside the Telegram chat. Sharing an idea takes two clicks, a reaction takes one — and everything stays visible, sortable and live."}
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
