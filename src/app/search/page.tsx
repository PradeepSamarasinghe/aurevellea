import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategoryBySlug } from "@/lib/categories";
import { getAllTags, searchPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { CategorySlug } from "@/types/article";

export const metadata: Metadata = buildPageMetadata({
  title: `Search Articles | ${siteConfig.brandName}`,
  description:
    "Search Aurevellea articles by title, fashion category, nail art style, beauty topic, or tag.",
  path: "/search",
  noIndex: true,
});

async function SearchResultsLoader({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const resolved = await searchParams;
  const query = typeof resolved.q === "string" ? resolved.q : "";
  const categoryParam =
    typeof resolved.category === "string" &&
    getCategoryBySlug(resolved.category)
      ? (resolved.category as CategorySlug)
      : "all";

  const results = searchPosts(query, categoryParam);
  const suggestedTags = getAllTags();

  return (
    <SearchResultsClient
      key={`${query}-${categoryParam}`}
      initialQuery={query}
      initialCategory={categoryParam}
      results={results}
      suggestedTags={suggestedTags}
    />
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <div>
      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Search" }]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Explore the Archive
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            Search Aurevellea
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-dark-ink/78">
            Find outfit formulas, nail art references, skincare routines,
            jewellery styling notes, and wardrobe guides.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="border border-border-subtle bg-white p-8 text-sm text-dark-ink/75">
                Loading search results...
              </div>
            }
          >
            <SearchResultsLoader searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

