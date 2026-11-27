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
    <article className="group flex h-full flex-col border border-deep-teal/10 bg-white/80 hover:border-copper/70">
      <Link
        href={`/blog/${article.slug}`}
        className={`relative block overflow-hidden bg-peach ${
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
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em]">
            <Link
              href={category.href}
              className="font-semibold text-copper hover:text-deep-teal"
            >
              {category.name}
            </Link>
            <span className="text-deep-teal/55">{article.readingTime}</span>
          </div>

          <h3
            className={`mt-2.5 font-serif font-normal leading-tight text-deep-teal group-hover:text-copper ${
              variant === "editorial" ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>

          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-deep-teal/75">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-deep-teal/10 pt-3.5 text-xs text-deep-teal/60">
          <time dateTime={article.publishedAt}>
            {formatEditorialDate(article.publishedAt)}
          </time>
          <Link
            href={`/blog/${article.slug}`}
            className="font-medium uppercase tracking-[0.14em] text-copper hover:text-deep-teal"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}

