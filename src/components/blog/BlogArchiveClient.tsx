"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { ArticleSummary, CategorySlug } from "@/types/article";

interface BlogArchiveClientProps {
  articles: ArticleSummary[];
  pageSize?: number;
}

export function BlogArchiveClient({
  articles,
  pageSize = 6,
}: BlogArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    CategorySlug | "all"
  >("all");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = articles.filter((article) => {
      if (
        selectedCategory !== "all" &&
        article.category !== selectedCategory
      ) {
        return false;
      }
      if (!normalized) return true;
      const haystack = [
        article.title,
        article.excerpt,
        article.category,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });

    return [...list].sort((a, b) => {
      const timeA = new Date(a.publishedAt).getTime();
      const timeB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [articles, query, selectedCategory, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedArticles = filteredArticles.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handleCategoryChange = (slug: CategorySlug | "all") => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: "newest" | "oldest") => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-10">
      {/* Controls Bar */}
      <div className="flex flex-col gap-5 border-y border-border-subtle py-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Filters */}
        <div
          role="group"
          aria-label="Filter articles by category"
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
              selectedCategory === "all"
                ? "border-dark-ink bg-dark-ink text-ivory"
                : "border-border-subtle bg-white text-dark-ink/80 hover:border-warm-brown hover:text-warm-brown"
            }`}
          >
            All ({articles.length})
          </button>
          {CATEGORIES.map((category) => {
            const count = articles.filter(
              (a) => a.category === category.slug
            ).length;
            const active = selectedCategory === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => handleCategoryChange(category.slug)}
                className={`border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "border-dark-ink bg-dark-ink text-ivory"
                    : "border-border-subtle bg-white text-dark-ink/80 hover:border-warm-brown hover:text-warm-brown"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <label htmlFor="blog-archive-search" className="sr-only">
              Filter journal articles
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose"
              aria-hidden="true"
            />
            <input
              id="blog-archive-search"
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Filter by keyword or tag..."
              className="w-full border border-border-subtle bg-white py-2 pl-9 pr-4 text-sm text-dark-ink placeholder:text-dark-ink/75 focus:border-warm-brown focus:outline-none sm:w-64"
            />
          </div>

          <div>
            <label htmlFor="blog-sort-order" className="sr-only">
              Sort articles
            </label>
            <select
              id="blog-sort-order"
              value={sortOrder}
              onChange={(e) =>
                handleSortChange(e.target.value as "newest" | "oldest")
              }
              className="w-full border border-border-subtle bg-white px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink focus:border-warm-brown focus:outline-none sm:w-auto"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="border border-border-subtle bg-white px-6 py-14 text-center">
          <p className="font-serif text-2xl text-dark-ink">
            No matching articles found
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-dark-ink/75">
            Try clearing your filter or searching for broader terms such as
            &ldquo;neutral&rdquo;, &ldquo;nail&rdquo;, &ldquo;wardrobe&rdquo;,
            or &ldquo;gold&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setQuery("");
              setCurrentPage(1);
            }}
            className="mt-6 border border-dark-ink bg-dark-ink px-6 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 ? (
        <nav
          aria-label="Article pagination"
          className="flex items-center justify-between border-t border-border-subtle pt-8"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-dark-ink/75">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="border border-border-subtle bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink transition-colors hover:border-warm-brown disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-current={pageNumber === safePage ? "page" : undefined}
                  className={`border px-3.5 py-2 text-xs font-medium transition-colors ${
                    pageNumber === safePage
                      ? "border-dark-ink bg-dark-ink text-ivory"
                      : "border-border-subtle bg-white text-dark-ink hover:border-warm-brown"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              className="border border-border-subtle bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink transition-colors hover:border-warm-brown disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

