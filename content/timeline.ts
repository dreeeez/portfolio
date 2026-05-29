export type TimelineIcon =
  | "data"
  | "study"
  | "web"
  | "hardware"
  | "it"
  | "graduation";

export type TimelineAccent =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "cyan"
  | "rose";

export type TimelineEntry = {
  period: string;
  title: { en: string; de: string };
  org: string;
  description: { en: string; de: string };
  icon: TimelineIcon;
  accent: TimelineAccent;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2026 — present",
    title: {
      en: "Intern — Data Management",
      de: "Praktikant — Data Management",
    },
    org: "Mercedes-Benz AG",
    description: {
      en: "Data quality management in Powertrain (MB Operations), Databricks ETL pipelines with PySpark, AI enablement (Claude Code, MCP, plugin development), PowerBI monitoring, and driving process digitalization. International collaboration with development teams.",
      de: "Datenqualitäts-Management im Powertrain (MB Operations), Databricks-ETL-Pipelines mit PySpark, AI Enablement (Claude Code, MCP, Plugin-Entwicklung), PowerBI-Monitoring und Vorantreiben der Prozessdigitalisierung. Internationale Zusammenarbeit mit Entwicklungsteams.",
    },
    icon: "data",
    accent: "sky",
  },
  {
    period: "2024 — present",
    title: {
      en: "B.Sc. Business Informatics",
      de: "B.Sc. Wirtschaftsinformatik",
    },
    org: "Stuttgart Media University (HdM)",
    description: {
      en: "Studying the intersection of tech, business, and design.",
      de: "Studium an der Schnittstelle von Tech, Business und Design.",
    },
    icon: "study",
    accent: "violet",
  },
  {
    period: "Sep 2024 — Feb 2026",
    title: {
      en: "Working Student — Web Dev, UX & Digital Marketing",
      de: "Werkstudent — Webentwicklung, UX & Digital Marketing",
    },
    org: "ecorize (Munit Solutions GmbH)",
    description: {
      en: "Hands-on role in an early-stage software startup: WordPress / HTML / CSS / Elementor development, UX research and design in Figma, SEO and performance optimization, plus digital marketing content for LinkedIn and Google Ads.",
      de: "Hands-on-Rolle in einem Software-Startup: Entwicklung mit WordPress / HTML / CSS / Elementor, UX-Research und Design in Figma, SEO und Performance-Optimierung, sowie digitale Marketing-Inhalte für LinkedIn und Google Ads.",
    },
    icon: "web",
    accent: "emerald",
  },
  {
    period: "Apr — Aug 2023",
    title: {
      en: "Production & Hardware Operations Assistant",
      de: "Produktion & Hardware-Operations",
    },
    org: "VECTOR Informatik",
    description: {
      en: "Hardware assembly and commissioning, quality control and functional testing, license release, and SAP-based order and material management.",
      de: "Hardware-Montage und Inbetriebnahme, Qualitätskontrolle und Funktionstests, Lizenz-Freigabe sowie Auftrags- und Materialverwaltung in SAP.",
    },
    icon: "hardware",
    accent: "amber",
  },
  {
    period: "Aug 2021 — Aug 2022",
    title: {
      en: "IT Administrator — Work & Travel",
      de: "IT-Administrator — Work & Travel",
    },
    org: "BCC, Norway",
    description: {
      en: "Endpoint management for Windows & macOS (Microsoft Intune, Jamf), Azure and Microsoft 365 administration, IT helpdesk and incident handling, Cisco network maintenance, backup & recovery, and support for media production systems.",
      de: "Endpoint-Management für Windows & macOS (Microsoft Intune, Jamf), Azure- und Microsoft-365-Administration, IT-Helpdesk und Ticketbearbeitung, Cisco-Netzwerkbetrieb, Backup & Recovery sowie Support für Medienproduktions-Systeme.",
    },
    icon: "it",
    accent: "cyan",
  },
  {
    period: "2018 — 2021",
    title: {
      en: "Abitur — Information Technology",
      de: "Abitur — Informationstechnik",
    },
    org: "Technisches Gymnasium",
    description: {
      en: "General higher education entrance qualification (grade 2.3) with a focus on information technology.",
      de: "Allgemeine Hochschulreife (2,3) mit Schwerpunkt Informationstechnik.",
    },
    icon: "graduation",
    accent: "rose",
  },
];
