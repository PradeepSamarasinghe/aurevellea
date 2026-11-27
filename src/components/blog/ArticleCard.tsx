import Image from "next/image";
import Link from "next/link";
import { CATEGORY_MAP } from "@/lib/categories";
import type { ArticleSummary } from "@/types/article";

interface ArticleCardProps {
  article: ArticleSummary;
  variant?: "portrait" | "editorial" | "compact";
  priority?: boolean;
}

export function formatEditorialDate(dateString: string): string {
  const parsed = new Date(`${dateString}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function ArticleCard({
  article,
  variant = "portrait",
  priority = false,
}: ArticleCardProps) {
  const category = CATEGORY_MAP[article.category];
  const isCompact = variant === "compact";

  return (
    <article className="group flex h-full flex-col border border-border-subtle bg-white transition-colors duration-200 hover:border-rose/70">
      <Link
        href={`/blog/${article.slug}`}
        className={`relative block overflow-hidden bg-ivory-soft ${
          isCompact ? "aspect-[4/3]" : "aspect-[2/3]"
        }`}
      >
        <Image
          src={article.featuredImage}
          alt={article.imageAlt}
          fill
          priority={priority}
          sizes={
            isCompact
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.18em]">
            <Link
              href={category.href}
              className="font-semibold text-rose transition-colors hover:text-warm-brown"
            >
              {category.name}
            </Link>
            <span className="text-dark-ink/55">{article.readingTime}</span>
          </div>

          <h3
            className={`mt-2.5 font-serif font-normal leading-snug text-dark-ink transition-colors group-hover:text-warm-brown ${
              variant === "editorial" ? "text-2xl" : "text-xl"
            }`}
          >
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>

          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-dark-ink/75">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border-subtle/80 pt-3.5 text-xs text-dark-ink/60">
          <time dateTime={article.publishedAt}>
            {formatEditorialDate(article.publishedAt)}
          </time>
          <Link
            href={`/blog/${article.slug}`}
            className="font-medium uppercase tracking-[0.14em] text-warm-brown transition-colors hover:text-dark-ink"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}

