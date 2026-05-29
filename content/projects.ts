export type ProjectCategory =
  | "software"
  | "data"
  | "animation"
  | "media"
  | "graphics"
  | "design";

export type ProjectIcon = "telegram" | "web" | "data" | "streamlit";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  description: { en: string; de: string };
  tags: string[];
  year: string;
  href?: string;
  github?: string;
  image?: string;
  images?: string[];
  icon?: ProjectIcon;
  iconImage?: string;
  video?: {
    poster: string;
    src: string;
  };
  subpage?: boolean;
  subpagePath?: string;
};

export const projects: Project[] = [
  {
    slug: "putzmanager",
    category: "software",
    title: "Putzschichten Manager",
    description: {
      en: "Telegram bot that runs the weekly cleaning rotation for my parish — schedules duties, sends reminders and keeps the team in sync without spreadsheets.",
      de: "Telegram-Bot für die wöchentliche Putzrotation meiner Gemeinde — verteilt Schichten, schickt Reminder und hält das Team ohne Excel-Listen organisiert.",
    },
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "Telegram Bot API",
      "Vercel",
      "Scheduler",
    ],
    year: "2026",
    icon: "telegram",
    image: "/thumbnails/putzmanager.png",
    subpage: true,
  },
  {
    slug: "jungschar-manager",
    category: "software",
    title: "Jungschar Manager",
    description: {
      en: "Telegram bot for organising the youth group — attendance tracking, group planning and quick communication for leaders.",
      de: "Telegram-Bot zur Organisation der Jungschar — Anwesenheits-Tracking, Gruppenplanung und schnelle Kommunikation für Leiter.",
    },
    tags: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Telegram Bot API",
      "Supabase",
      "Vercel",
      "Open-Meteo",
      "Group Management",
    ],
    year: "2026",
    icon: "telegram",
    images: [
      "/thumbnails/jungschar-manager.png",
      "/thumbnails/jungschar-manager-2.png",
    ],
    subpage: true,
  },
  {
    slug: "unboxideas",
    category: "software",
    title: "Upvote Mini App",
    description: {
      en: "Telegram bot for collecting and ranking ideas. Users submit suggestions, the group upvotes, and the winners surface automatically.",
      de: "Telegram-Bot zum Sammeln und Ranken von Ideen. Vorschläge werden eingereicht, die Gruppe upvotet, die Top-Ideen tauchen automatisch oben auf.",
    },
    tags: ["Python", "Telegram Bot API", "Voting"],
    year: "2026",
    icon: "telegram",
    images: [
      "/thumbnails/unboxideas-1.png",
      "/thumbnails/unboxideas-2.png",
    ],
    subpage: true,
  },
  {
    slug: "buk-unboxing",
    category: "software",
    title: "BUK-Unboxing",
    description: {
      en: "Web project for unboxing experiences — interactive content delivery with a focus on UI clarity and smooth flows.",
      de: "Web-Projekt für Unboxing-Erlebnisse — interaktive Content-Auslieferung mit Fokus auf klare UI und smoothe Flows.",
    },
    tags: ["HTML5", "CSS3", "JavaScript", "Web", "UI"],
    year: "2026",
    icon: "web",
    iconImage: "/logos/favicon.svg",
    image: "/thumbnails/buk-unboxing.png",
    subpage: true,
  },
  {
    slug: "data-dashboard",
    category: "data",
    title: "Data Dashboard",
    description: {
      en: "Streamlit dashboard built for the Data Science module at HdM Stuttgart — interactive analyses with Pandas, charts, filters and live data exploration.",
      de: "Streamlit-Dashboard für das Data-Science-Modul an der HdM Stuttgart — interaktive Analysen mit Pandas, Charts, Filter und Live-Exploration.",
    },
    tags: ["Python", "SQL Server", "Pandas", "Plotly", "Streamlit", "Jupyter"],
    year: "2026",
    github: "https://github.com/dreeeez/retail-benchmark-dashboard",
    icon: "streamlit",
    image: "/thumbnails/data-dashboard.png",
    subpage: true,
  },
  {
    slug: "roman-battle",
    category: "animation",
    title: "Roman Battle — UE5",
    description: {
      en: "Cinematic battle scene built in Unreal Engine 5 — choreography, camera work, lighting and sequencer-driven editing.",
      de: "Cinematic-Kampfszene in Unreal Engine 5 — Choreografie, Kamera, Lighting und Sequencer-gesteuerter Schnitt.",
    },
    tags: ["Unreal Engine 5", "Cinematic", "Animation"],
    year: "2025",
    video: {
      poster: "/videos/roman-battle.jpg",
      src: "/videos/roman-battle.mp4",
    },
    subpage: true,
  },
  {
    slug: "character-animation",
    category: "animation",
    title: "Character Animation — UE5",
    description: {
      en: "Character-focused animation piece in Unreal Engine 5 — rigging, motion, expression and cinematic framing.",
      de: "Charakter-fokussierte Animation in Unreal Engine 5 — Rigging, Bewegung, Mimik und cineastische Kamera.",
    },
    tags: ["Unreal Engine 5", "Character", "Animation"],
    year: "2025",
    video: {
      poster: "/videos/character-animation.jpg",
      src: "/videos/character-animation.mp4",
    },
    subpage: true,
  },
  {
    slug: "musician",
    category: "media",
    title: "Musician — Short",
    description: {
      en: "Short music video edited and colour-graded in DaVinci Resolve — with a focus on atmosphere, light and rhythm.",
      de: "Kurzes Musikvideo, in DaVinci Resolve geschnitten und gegradet — mit Fokus auf Atmosphäre, Licht und Rhythmus.",
    },
    tags: ["DaVinci Resolve", "Color", "Edit"],
    year: "2025",
    video: {
      poster: "",
      src: "/videos/musician.mp4",
    },
    subpage: true,
  },
  {
    slug: "sport",
    category: "media",
    title: "Sport — Short",
    description: {
      en: "Dynamic sports video edited and colour-graded in DaVinci Resolve — driven by movement, rhythm and pacing.",
      de: "Dynamisches Sportvideo, in DaVinci Resolve geschnitten und gegradet — getrieben von Bewegung, Rhythmus und Tempo.",
    },
    tags: ["DaVinci Resolve", "Color", "Edit"],
    year: "2025",
    video: {
      poster: "",
      src: "/videos/sport.mp4",
    },
    subpage: true,
  },
  {
    slug: "ae-animations",
    category: "media",
    title: "After Effects — Motion",
    description: {
      en: "Motion-graphics showcase built in After Effects — animated typography, transitions and visual effects.",
      de: "Motion-Graphics-Showcase in After Effects — animierte Typografie, Übergänge und visuelle Effekte.",
    },
    tags: ["After Effects", "Motion", "Animation"],
    year: "2026",
    video: {
      poster: "/videos/ae-animations.jpg",
      src: "/videos/ae-showcase.mp4",
    },
    subpage: true,
  },
  {
    slug: "ecorize-banner",
    category: "graphics",
    title: "Marketing Banner",
    description: {
      en: "Vertical marketing banner designed in InDesign for an ecorize campaign — clear hierarchy and on-brand visual language.",
      de: "Vertikales Marketing-Banner, in InDesign für eine ecorize-Kampagne gestaltet — klare Hierarchie und markenkonforme Bildsprache.",
    },
    tags: ["InDesign", "Banner", "Marketing"],
    year: "2025",
    image: "/graphics/ecorize-banner.png",
    subpage: true,
    subpagePath: "/projects/graphics",
  },
  {
    slug: "ecorize-business-card",
    category: "graphics",
    title: "Business Card",
    description: {
      en: "Business card layout designed in InDesign for the ecorize sales team — print-ready branding with consistent typography and spacing.",
      de: "Visitenkarten-Layout, in InDesign für das ecorize Sales-Team gestaltet — druckfertiges Branding mit konsistenter Typografie und Abständen.",
    },
    tags: ["InDesign", "Print", "Branding"],
    year: "2025",
    image: "/graphics/ecorize-business-card.png",
    subpage: true,
    subpagePath: "/projects/graphics",
  },
  {
    slug: "unboxing-poster",
    category: "graphics",
    title: "Unboxing — Main Award Poster",
    description: {
      en: "Campaign poster designed in Figma — announcing an award with a bold layout, strong typography and clear visual hierarchy.",
      de: "Kampagnen-Poster, in Figma gestaltet — kündigt einen Award mit kräftigem Layout, starker Typografie und klarer visueller Hierarchie an.",
    },
    tags: ["Figma", "Poster", "Campaign"],
    year: "2025",
    image: "/graphics/unboxing-poster.png",
    subpage: true,
    subpagePath: "/projects/graphics",
  },
];
