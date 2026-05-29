import Image from "next/image";
import { Film, ImageIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { VideoCard } from "@/components/sections/video-card";
import { projects, type ProjectCategory } from "@/content/projects";

const SHOWCASE_CATEGORIES: ProjectCategory[] = ["software", "data"];
const GRID_CATEGORIES: ProjectCategory[] = [
  "animation",
  "media",
  "graphics",
  "design",
];

const GITHUB_PROFILE = {
  url: "https://github.com/dreeeez",
  handle: "@dreeeez",
  avatar: "https://avatars.githubusercontent.com/u/116176388?v=4",
};

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "de";

  const showcaseProjects = projects.filter((p) =>
    SHOWCASE_CATEGORIES.includes(p.category),
  );

  const gridGroups = GRID_CATEGORIES.map((category) => ({
    category,
    items: projects.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0);

  const categoryLabels: Record<string, string> = {
    software: t("categories.software"),
    data: t("categories.data"),
    animation: t("categories.animation"),
    media: t("categories.media"),
    graphics: t("categories.graphics"),
    design: t("categories.design"),
  };

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
        </Reveal>

        {showcaseProjects.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <CategoryDivider
                label={categoryLabels.software}
                icon={
                  <Image
                    src="/logos/github_weiss.webp"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
              >
                <a
                  href={GITHUB_PROFILE.url}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:border-border hover:bg-card/70"
                >
                  <Image
                    src={GITHUB_PROFILE.avatar}
                    alt={`${GITHUB_PROFILE.handle} avatar`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="font-sans font-medium not-italic text-foreground">
                    {GITHUB_PROFILE.handle}
                  </span>
                  <span className="font-sans text-xs not-italic text-muted-foreground">
                    {locale === "de"
                      ? "Alle Repos auf GitHub"
                      : "All repos on GitHub"}
                  </span>
                  <Image
                    src="/logos/github_weiss.webp"
                    alt="GitHub"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </CategoryDivider>
            </Reveal>
            <Reveal>
              <ProjectsShowcase
                projects={showcaseProjects}
                locale={locale}
              />
            </Reveal>
          </div>
        )}

        {gridGroups.length > 0 && (
          <div className="mt-20 space-y-16">
            {gridGroups.map(({ category, items }) => (
              <div key={category}>
                <Reveal>
                  <CategoryDivider
                    label={categoryLabels[category]}
                    icon={
                      category === "animation" ? (
                        <Image
                          src="/logos/unreal_white.webp"
                          alt="Unreal Engine"
                          width={20}
                          height={20}
                          className="h-5 w-5 object-contain"
                        />
                      ) : category === "media" ? (
                        <Film className="h-5 w-5 text-foreground/80" />
                      ) : category === "graphics" ? (
                        <ImageIcon className="h-5 w-5 text-foreground/80" />
                      ) : null
                    }
                  />
                </Reveal>

                {category === "graphics" || category === "media" ? (
                  <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                    <div
                      className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {items.map((project, i) => (
                        <Reveal key={project.slug} delay={i * 0.05}>
                          <div className="w-[280px] shrink-0 snap-start sm:w-[320px] md:w-[360px]">
                            <VideoCard
                              title={project.title}
                              year={project.year}
                              description={project.description[locale]}
                              tags={project.tags}
                              href={project.href}
                              subpageHref={
                                project.subpage
                                  ? project.subpagePath ??
                                    `/projects/${project.slug}`
                                  : undefined
                              }
                              video={project.video}
                              image={project.image}
                              fit={category === "graphics" ? "contain" : "cover"}
                            />
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    {items.map((project, i) => (
                      <Reveal key={project.slug} delay={i * 0.05}>
                        <VideoCard
                          title={project.title}
                          year={project.year}
                          description={project.description[locale]}
                          tags={project.tags}
                          href={project.href}
                          subpageHref={
                            project.subpage
                              ? project.subpagePath ??
                                `/projects/${project.slug}`
                              : undefined
                          }
                          video={project.video}
                          image={project.image}
                        />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryDivider({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      {icon}
      <h3 className="font-sans text-xs font-medium uppercase tracking-[0.22em] not-italic text-muted-foreground">
        {label}
      </h3>
      <div className="h-px flex-1 bg-border/60" />
      {children}
    </div>
  );
}
