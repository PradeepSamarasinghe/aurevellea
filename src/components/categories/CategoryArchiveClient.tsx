"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { ArticleSummary } from "@/types/article";

interface CategoryArchiveClientProps {
  articles: ArticleSummary[];
  initialCount?: number;
  incrementBy?: number;
  emptyMessage?: string;
}

export function CategoryArchiveClient({
  articles,
  initialCount = 6,
  incrementBy = 6,
  emptyMessage = "New editorial stories in this category are coming soon.",
}: CategoryArchiveClientProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  if (articles.length === 0) {
    return (
      <div className="border border-border-subtle bg-white px-6 py-14 text-center">
        <p className="font-serif text-2xl text-dark-ink">Curating New Stories</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-dark-ink/75">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) => Math.min(articles.length, prev + incrementBy))
            }
            className="border border-dark-ink bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-dark-ink transition-colors hover:bg-dark-ink hover:text-ivory"
          >
            Load More Stories ({articles.length - visibleCount} remaining)
          </button>
        </div>
      ) : null}
    </div>
  );
}

