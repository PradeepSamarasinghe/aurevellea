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
      className={`flex flex-col gap-4 border-b border-border-subtle pb-6 ${
        isCentered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={isCentered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-dark-ink sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2.5 text-sm leading-relaxed text-dark-ink/75 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-warm-brown transition-colors hover:text-dark-ink"
        >
          <span>{actionLabel}</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}

