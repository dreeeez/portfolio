import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {kicker}
        </p>
      )}
      <h2 className="text-balance text-4xl leading-[1.05] md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
