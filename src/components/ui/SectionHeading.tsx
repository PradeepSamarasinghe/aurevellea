import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 border-b border-deep-teal/15 pb-7 ${
        isCentered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={isCentered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-copper-ink sm:text-[11px]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-deep-teal sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-deep-teal/75 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 rounded-full border border-deep-teal/40 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-deep-teal hover:border-copper hover:text-copper-ink"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

