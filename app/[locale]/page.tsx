import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Now } from "@/components/sections/now";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Now />
      <Timeline />
      <Contact />
    </>
  );
}
