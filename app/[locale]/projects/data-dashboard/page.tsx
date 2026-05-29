import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { GithubLink } from "@/components/shared/github-link";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "data-dashboard");

export const metadata: Metadata = {
  title: project?.title ?? "Data Dashboard",
  description: project?.description.en,
};

export default async function DataDashboardPage({
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
          <GithubLink locale={loc} repo="retail-benchmark-dashboard" compact />
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-5 border-b border-border/60 pb-6 font-sans not-italic sm:grid-cols-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Tech Stack" : "Tech stack"}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/python_logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Python
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/sql_logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                MS SQL Server
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/pandas.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Pandas
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/plotly.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Plotly
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/logos/streamlit.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                Streamlit
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {loc === "de" ? "Kontext" : "Context"}
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {loc === "de" ? "Data-Science Modul · HdM" : "Data Science module · HdM"}
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
                ? "Im Rahmen des Data-Science-Moduls an der HdM Stuttgart habe ich ein interaktives Streamlit-Dashboard entwickelt, das Filial-Kennzahlen aus einer SQL-Server-Datenbank konsolidiert und für unterschiedliche Standorte vergleichbar macht."
                : "As part of the Data Science module at HdM Stuttgart, I built an interactive Streamlit dashboard that consolidates store metrics from a SQL Server database and makes different locations comparable."}
            </p>
            <p className="text-foreground/85">
              {loc === "de"
                ? "Mit Pandas werden die Rohdaten aufbereitet, aggregiert und über dynamische Plotly-Charts visualisiert — Finanzperformance, Marketing-ROI, Kostenstrukturen und Produktkategorien lassen sich live gegenüberstellen. Über frei kombinierbare Filter stellen Nutzer eigene Auswertungen zusammen, isolieren einzelne Zeiträume oder Filialen und exportieren die Ergebnisse als CSV."
                : "Pandas prepares and aggregates the raw data, dynamic Plotly charts visualize it — financial performance, marketing ROI, cost structures and product categories can be compared live. Freely combinable filters let users build their own analyses, isolate specific time ranges or stores, and export the results as CSV."}
            </p>
          </section>
        </div>

        <h2 className="mt-16 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
          UX · UI
        </h2>

        {project.image && (
          <figure className="mt-4">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-neutral-950">
              <Image
                src={project.image}
                alt={project.title}
                width={1600}
                height={831}
                className="h-auto w-full object-cover"
              />
            </div>
          </figure>
        )}

        <section className="mt-16">
          <h2 className="max-w-2xl font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground not-italic">
            {loc === "de" ? "Architektur" : "Architecture"}
          </h2>

          <figure className="mt-4">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-neutral-950">
              <Image
                src="/thumbnails/data-dashboard-architecture.png"
                alt={
                  loc === "de"
                    ? "Systemarchitektur — Client/Browser, Streamlit-App, Data-Access und Microsoft SQL Server"
                    : "System architecture — client/browser, Streamlit app, data access and Microsoft SQL Server"
                }
                width={1131}
                height={877}
                className="block h-auto w-full object-contain"
              />
            </div>
          </figure>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/85">
            {loc === "de"
              ? "Modularer Aufbau mit klar getrennten Schichten — Daten kommen aus SQL Server, werden mit Pandas zu KPIs verdichtet und in Streamlit live ausspielbar gemacht."
              : "Modular architecture with cleanly separated layers — data comes from SQL Server, gets condensed into KPIs with Pandas, and is served live through Streamlit."}
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
            {[
              {
                step: "01",
                label: loc === "de" ? "Daten" : "Data",
                title: "SQL Server · Pandas",
                body:
                  loc === "de"
                    ? "Filial-Rohdaten liegen in einer SQL-Server-Datenbank. Pandas zieht sie raus, bereinigt, aggregiert über Standorte und Zeiträume — die ganze Datenzugriffs-Schicht ist sauber gekapselt."
                    : "Store raw data lives in a SQL Server database. Pandas pulls it out, cleans it, aggregates across locations and time ranges — the entire data-access layer is cleanly encapsulated.",
              },
              {
                step: "02",
                label: loc === "de" ? "Logik" : "Logic",
                title: loc === "de" ? "KPIs · Services" : "KPIs · services",
                body:
                  loc === "de"
                    ? "Finanzperformance, Marketing-ROI, Kostenstrukturen, Produktkategorien — die Kennzahlen-Logik und die Services drumherum liegen in eigenen Modulen, getrennt von Datenzugriff und UI."
                    : "Financial performance, marketing ROI, cost structures, product categories — the KPI logic and the services around it live in their own modules, separated from data access and UI.",
              },
              {
                step: "03",
                label: "UI",
                title: "Streamlit · Plotly",
                body:
                  loc === "de"
                    ? "Streamlit als Frontend, dynamische Plotly-Charts. Frei kombinierbare Filter, isolierte Standorte oder Zeiträume, CSV-Export für eigene Auswertungen."
                    : "Streamlit as the frontend, dynamic Plotly charts. Freely combinable filters, isolated locations or time ranges, CSV export for custom analyses.",
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
              ? "Der modulare Schnitt hält die Schichten klein — neue Filialen oder Kennzahlen lassen sich ohne tieferen Eingriff ergänzen. Praxisnaher Data-Science-Workflow für den Modul-Kontext."
              : "The modular cut keeps the layers small — new stores or metrics can be added without touching the core. A practical data-science workflow for the module context."}
          </p>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-8">
          <GithubLink locale={loc} repo="retail-benchmark-dashboard" />

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
