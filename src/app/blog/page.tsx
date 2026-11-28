import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogArchiveClient } from "@/components/blog/BlogArchiveClient";
import { formatEditorialDate } from "@/components/blog/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { CATEGORY_MAP } from "@/lib/categories";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `The Journal — Fashion, Nail Art & Beauty Articles | ${siteConfig.brandName}`,
  description:
    "Explore all editorial articles from Aurevellea across women's fashion, minimal nail art, beauty routines, accessories, and everyday elegance.",
  path: "/blog",
});

export default function BlogPage() {
  const allPosts = getAllPosts();
  const leadFeatured = getFeaturedPosts(1)[0] ?? allPosts[0] ?? null;
  const leadCategory = leadFeatured
    ? CATEGORY_MAP[leadFeatured.category]
    : null;

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Journal" }]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Editorial Archive
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            The Aurevellea Journal
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-dark-ink/78">
            Practical style guides, minimal manicure ideas, skincare basics, and
            capsule wardrobe perspectives—organized for calm reading and visual
            discovery.
          </p>
        </div>
      </section>

      {/* Featured Lead Article */}
      {leadFeatured && leadCategory ? (
        <section className="py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 overflow-hidden border border-border-subtle bg-white lg:grid-cols-12">
              <Link
                href={`/blog/${leadFeatured.slug}`}
                className="relative aspect-[2/3] max-h-[520px] w-full overflow-hidden bg-ivory-soft lg:col-span-5"
              >
                <Image
                  src={leadFeatured.featuredImage}
                  alt={leadFeatured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-7 lg:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose">
                  Featured Story · {leadCategory.name}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-normal text-dark-ink sm:text-4xl">
                  <Link
                    href={`/blog/${leadFeatured.slug}`}
                    className="transition-colors hover:text-warm-brown"
                  >
                    {leadFeatured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-dark-ink/78">
                  {leadFeatured.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-dark-ink/75">
                  <span>{leadFeatured.author}</span>
                  <span>·</span>
                  <time dateTime={leadFeatured.publishedAt}>
                    {formatEditorialDate(leadFeatured.publishedAt)}
                  </time>
                  <span>·</span>
                  <span>{leadFeatured.readingTime}</span>
                </div>
                <div className="mt-7">
                  <Link
                    href={`/blog/${leadFeatured.slug}`}
                    className="inline-flex items-center border border-dark-ink bg-dark-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
                  >
                    Read Featured Story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Filterable & Paginated Archive */}
      <section className="pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogArchiveClient articles={allPosts} />
        </div>
      </section>
    </div>
  );
}

