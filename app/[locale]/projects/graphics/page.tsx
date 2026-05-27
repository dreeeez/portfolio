import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const ecorizeItems = projects.filter(
  (p) =>
    p.subpagePath === "/projects/graphics" && p.slug.startsWith("ecorize"),
);
const otherItems = projects.filter(
  (p) =>
    p.subpagePath === "/projects/graphics" && !p.slug.startsWith("ecorize"),
);

export const metadata: Metadata = {
  title: "Grafik Design",
  description:
    "Print, Banner, Poster — eine Auswahl an Grafik-Design-Arbeiten.",
};

export default async function GraphicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
            {loc === "de" ? "Grafik Design" : "Graphic Design"}
          </h1>
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-5 border-b border-border/60 pb-6 font-sans not-italic sm:grid-cols-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Tools" : "Tools"}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/indesign.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                InDesign
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/figma.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Figma
              </span>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/ps.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Photoshop
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Formate" : "Formats"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {loc === "de"
                ? "Print · Banner · Poster"
                : "Print · Banner · Poster"}
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Jahr" : "Year"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">2025</dd>
          </div>
        </dl>

        <div className="mt-8 max-w-2xl space-y-3 text-base leading-7">
          <p className="text-foreground/85">
            {loc === "de"
              ? "Eine Auswahl an Grafik-Arbeiten — aus Werkstudent-Zeiten und persönlichen Spielereien."
              : "A selection of graphic design work — from working-student days and personal experiments."}
          </p>
        </div>

        <section className="mt-14">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
              {loc === "de" ? "Werkstudent @ ecorize" : "Working student @ ecorize"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {loc === "de"
                ? "Im Rahmen meiner Werkstudentenstelle bei ecorize habe ich mich um Media- und Print-Material gekümmert — vor allem Materialien für Messen und Kampagnen."
                : "During my working-student role at ecorize I handled media and print material — mostly assets for trade-fair appearances and campaigns."}
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {ecorizeItems.map((item) => (
              <figure key={item.slug}>
                <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[4/3] h-auto w-full object-contain p-4"
                    />
                  )}
                </div>
                <figcaption className="mt-3">
                  <p className="font-sans text-sm font-medium not-italic text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 font-sans text-xs not-italic text-muted-foreground">
                    {item.tags.join(" · ")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex max-w-2xl items-center gap-2.5">
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
              {loc === "de"
                ? "Web Design — Heropage Konzept"
                : "Web design — heropage concept"}
            </h2>
            <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] not-italic text-amber-300">
              Draft
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            {loc === "de"
              ? "UX/UI-Entwurf für eine ecorize-Heropage rund um Workmanagement & Reporting — interner Design-Draft, nicht in Produktion."
              : "UX/UI draft for an ecorize hero page around workmanagement and reporting — internal design draft, not in production."}
          </p>

          <figure className="mt-6">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/graphics/ecorize-heropage.png"
                alt={
                  loc === "de"
                    ? "ecorize Heropage — Konzept-Draft"
                    : "ecorize hero page — concept draft"
                }
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-sans text-sm font-medium not-italic text-foreground">
                {loc === "de"
                  ? "ecorize — Heropage Draft"
                  : "ecorize — hero page draft"}
              </p>
              <p className="mt-1 font-sans text-xs not-italic text-muted-foreground">
                Figma · UX/UI · Concept
              </p>
            </figcaption>
          </figure>
        </section>

        <section className="mt-14">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
              {loc === "de" ? "Poster Design — Figma" : "Poster design — Figma"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {loc === "de"
                ? "Daneben mal mit Poster-Design in Figma rumgespielt — Layout, Typo, Bildmontage."
                : "On the side, played around with poster design in Figma — layout, type, image composition."}
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {otherItems.map((item) => (
              <figure key={item.slug}>
                <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[4/3] h-auto w-full object-contain p-4"
                    />
                  )}
                </div>
                <figcaption className="mt-3">
                  <p className="font-sans text-sm font-medium not-italic text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 font-sans text-xs not-italic text-muted-foreground">
                    {item.tags.join(" · ")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

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
