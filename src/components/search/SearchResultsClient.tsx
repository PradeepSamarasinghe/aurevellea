"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { ArticleSummary, CategorySlug } from "@/types/article";

interface SearchResultsClientProps {
  initialQuery: string;
  initialCategory: CategorySlug | "all";
  results: ArticleSummary[];
  suggestedTags: string[];
}

export function SearchResultsClient({
  initialQuery,
  initialCategory,
  results,
  suggestedTags,
}: SearchResultsClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategorySlug | "all">(
    initialCategory
  );

  const navigateSearch = (
    nextQuery: string,
    nextCategory: CategorySlug | "all"
  ) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateSearch(query, category);
  };

  return (
    <div className="space-y-10">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search Aurevellea articles"
        className="border border-border-subtle bg-white p-5 sm:p-7"
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <label htmlFor="page-search-input" className="sr-only">
              Search by title, category, tag, or keyword
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-rose"
              aria-hidden="true"
            />
            <input
              id="page-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search outfit ideas, minimal nails, skincare, jewellery..."
              className="w-full border border-border-subtle bg-ivory-soft py-3 pl-10 pr-4 text-sm text-dark-ink placeholder:text-dark-ink/75 focus:border-warm-brown focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="page-search-category" className="sr-only">
              Category filter
            </label>
            <select
              id="page-search-category"
              value={category}
              onChange={(e) => {
                const val = e.target.value as CategorySlug | "all";
                setCategory(val);
                navigateSearch(query, val);
              }}
              className="h-full w-full border border-border-subtle bg-ivory-soft px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink focus:border-warm-brown focus:outline-none md:w-48"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="border border-dark-ink bg-dark-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
          >
            Search
          </button>
        </div>

        {/* Quick Topic Suggestions */}
        {suggestedTags.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-dark-ink/75">
              Popular Topics:
            </span>
            {suggestedTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  navigateSearch(tag, category);
                }}
                className="border border-blush bg-ivory-soft px-3 py-1 text-xs text-warm-brown transition-colors hover:border-warm-brown hover:bg-blush/40"
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </form>

      {/* Results Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border-subtle pb-4">
        <p className="text-sm text-dark-ink/75">
          {initialQuery ? (
            <>
              Showing <span className="font-semibold text-dark-ink">{results.length}</span>{" "}
              {results.length === 1 ? "article" : "articles"} for{" "}
              <span className="font-serif italic text-dark-ink">
                &ldquo;{initialQuery}&rdquo;
              </span>
            </>
          ) : (
            <>
              Browsing <span className="font-semibold text-dark-ink">{results.length}</span>{" "}
              {results.length === 1 ? "article" : "articles"}
            </>
          )}
        </p>
        {(initialQuery || initialCategory !== "all") && (
          <Link
            href="/search"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="text-xs font-medium uppercase tracking-[0.16em] text-warm-brown underline decoration-rose/60 underline-offset-4 hover:text-dark-ink"
          >
            Clear Search
          </Link>
        )}
      </div>

      {/* Results Grid or Helpful Empty State */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="border border-border-subtle bg-white px-6 py-16 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose">
            No Direct Matches
          </p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-dark-ink">
            We couldn&apos;t find an article for &ldquo;{initialQuery}&rdquo;
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-dark-ink/80">
            Try searching with simpler keywords like{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("minimal");
                navigateSearch("minimal", "all");
              }}
              className="font-medium text-warm-brown underline underline-offset-4"
            >
              minimal
            </button>
            ,{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("neutral");
                navigateSearch("neutral", "all");
              }}
              className="font-medium text-warm-brown underline underline-offset-4"
            >
              neutral
            </button>
            , or{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("nail");
                navigateSearch("nail", "all");
              }}
              className="font-medium text-warm-brown underline underline-offset-4"
            >
              nail
            </button>
            , or explore one of our editorial categories below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="border border-border-subtle bg-ivory-soft px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

