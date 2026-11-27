import type { TocHeading } from "@/types/article";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border border-border-subtle bg-ivory-soft p-5 sm:p-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-brown">
        In This Article
      </p>
      <ol className="mt-3.5 space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4 text-xs" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="block py-0.5 text-dark-ink/80 transition-colors hover:text-warm-brown"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

