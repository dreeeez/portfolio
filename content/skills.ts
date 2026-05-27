import {
  BarChart3,
  Code2,
  Palette,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type SkillCategory = {
  id: "dev" | "data" | "design" | "ai" | "ops";
  icon: LucideIcon;
  accent: { iconBg: string; iconColor: string };
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "dev",
    icon: Code2,
    accent: {
      iconBg:
        "bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5 border-blue-500/30",
      iconColor: "text-blue-600",
    },
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Python",
      "HTML / CSS",
      "Git",
      "Supabase",
      "WordPress",
      "Elementor",
      "SEO",
    ],
  },
  {
    id: "data",
    icon: BarChart3,
    accent: {
      iconBg:
        "bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-emerald-500/5 border-emerald-500/30",
      iconColor: "text-emerald-600",
    },
    items: [
      "SQL",
      "SQL Server",
      "SSIS",
      "Databricks",
      "PySpark",
      "Power BI",
      "Dimensional Modelling",
      "SAP S/4HANA",
      "Signavio",
    ],
  },
  {
    id: "design",
    icon: Palette,
    accent: {
      iconBg:
        "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-orange-500/5 border-orange-500/30",
      iconColor: "text-orange-600",
    },
    items: [
      "Figma",
      "Adobe Suite",
      "DaVinci Resolve",
      "Unreal Engine",
      "UI / UX",
      "Prototyping",
      "Google Ads",
    ],
  },
  {
    id: "ai",
    icon: Sparkles,
    accent: {
      iconBg:
        "bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-violet-500/5 border-violet-500/30",
      iconColor: "text-violet-600",
    },
    items: [
      "Claude",
      "Claude Code",
      "MCP",
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Vercel",
      "Notion",
    ],
  },
  {
    id: "ops",
    icon: Server,
    accent: {
      iconBg:
        "bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-sky-500/5 border-sky-500/30",
      iconColor: "text-sky-600",
    },
    items: [
      "Microsoft Intune",
      "Jamf",
      "Azure",
      "Microsoft 365",
      "Cisco",
    ],
  },
];
