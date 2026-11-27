import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { AffiliateDisclosureBanner } from "@/components/affiliate/AffiliateDisclosureBanner";
import { ArticleCard, formatEditorialDate } from "@/components/blog/ArticleCard";
import { MdxRenderer } from "@/components/blog/MdxRenderer";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { CATEGORY_MAP } from "@/lib/categories";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPostBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | Aurevellea",
    };
  }
  return buildArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = CATEGORY_MAP[article.category];
  const relatedPosts = getRelatedPosts(
    article.slug,
    article.category,
    article.tags,
    3
  );
  const { previous, next } = getAdjacentPosts(article.slug);

  const canonicalArticleUrl = absoluteUrl(`/blog/${article.slug}`);
  const ogImageUrl = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : absoluteUrl(article.featuredImage);

  return (
    <article className="pb-16 sm:pb-20">
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: category.name, path: category.href },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />

      {/* Article Header */}
      <header className="border-b border-border-subtle bg-ivory-soft py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: category.name, href: category.href },
              { name: article.title },
            ]}
          />

          <div className="mt-7 max-w-3xl">
            <Link
              href={category.href}
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-rose transition-colors hover:text-warm-brown"
            >
              {category.name}
            </Link>

            <h1 className="mt-3 font-serif text-3xl font-normal leading-[1.15] tracking-tight text-dark-ink sm:text-5xl">
              {article.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-dark-ink/80 sm:text-lg">
              {article.excerpt}
            </p>

            {/* Author & Dates Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-subtle pt-5 text-xs text-dark-ink/70">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-rose" aria-hidden="true" />
                <span>By {article.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar
                  className="h-3.5 w-3.5 text-rose"
                  aria-hidden="true"
                />
                <span>
                  Published{" "}
                  <time dateTime={article.publishedAt}>
                    {formatEditorialDate(article.publishedAt)}
                  </time>
                </span>
              </span>
              {article.updatedAt ? (
                <span className="text-dark-ink/60">
                  Updated{" "}
                  <time dateTime={article.updatedAt}>
                    {formatEditorialDate(article.updatedAt)}
                  </time>
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-rose" aria-hidden="true" />
                <span>{article.readingTime}</span>
              </span>
            </div>

            {article.draftNotice ? (
              <p className="mt-4 border border-blush bg-white px-4 py-2.5 text-xs text-warm-brown">
                Editorial Note: {article.draftNotice}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Article Column */}
          <div className="lg:col-span-8">
            {/* Featured 2:3 Portrait Image */}
            <figure className="mb-8">
              <div className="relative mx-auto aspect-[2/3] w-full max-w-lg overflow-hidden border border-border-subtle bg-white lg:mx-0">
                <Image
                  src={article.featuredImage}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 512px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-dark-ink/60">
                {article.imageAlt}
              </figcaption>
            </figure>

            {/* Share Bar (Top) */}
            <div className="mb-8 border-y border-border-subtle py-4">
              <ShareButtons
                url={canonicalArticleUrl}
                title={article.title}
                imageUrl={ogImageUrl}
                description={article.excerpt}
              />
            </div>

            {/* Affiliate Disclosure Banner when applicable */}
            {article.hasAffiliateDisclosure ? (
              <div className="mb-8">
                <AffiliateDisclosureBanner compact />
              </div>
            ) : null}

            {/* Mobile Table of Contents */}
            <div className="mb-8 lg:hidden">
              <TableOfContents headings={article.headings} />
            </div>

            {/* MDX Article Body */}
            <MdxRenderer source={article.content} />

            {/* Optional Image Gallery */}
            {article.galleryImages && article.galleryImages.length > 0 ? (
              <section className="mt-12 border-t border-border-subtle pt-8">
                <h2 className="font-serif text-2xl font-normal text-dark-ink">
                  Visual Gallery
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {article.galleryImages.map((item, idx) => (
                    <figure
                      key={`${item.src}-${idx}`}
                      className="border border-border-subtle bg-white p-2.5"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden bg-ivory-soft">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                      {item.caption ? (
                        <figcaption className="mt-2 px-1 text-xs text-dark-ink/70">
                          {item.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Tags */}
            {article.tags.length > 0 ? (
              <div className="mt-10 border-t border-border-subtle pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark-ink/55">
                  Topics in This Story
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="border border-border-subtle bg-white px-3.5 py-1.5 text-xs text-warm-brown transition-colors hover:border-warm-brown hover:bg-blush/30"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Share Bar (Bottom) */}
            <div className="mt-8 border-y border-border-subtle py-5">
              <ShareButtons
                url={canonicalArticleUrl}
                title={article.title}
                imageUrl={ogImageUrl}
                description={article.excerpt}
              />
            </div>

            {/* Previous / Next Navigation */}
            <nav
              aria-label="Article navigation"
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group border border-border-subtle bg-white p-5 transition-colors hover:border-rose"
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    Previous Story
                  </span>
                  <p className="mt-2 font-serif text-lg text-dark-ink transition-colors group-hover:text-warm-brown">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group border border-border-subtle bg-white p-5 text-left transition-colors hover:border-rose sm:text-right"
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose">
                    Next Story
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <p className="mt-2 font-serif text-lg text-dark-ink transition-colors group-hover:text-warm-brown">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          </div>

          {/* Sticky Sidebar (Desktop) */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="lg:sticky lg:top-28 lg:space-y-6">
              <TableOfContents headings={article.headings} />

              <div className="border border-border-subtle bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose">
                  About the Editorial Desk
                </p>
                <p className="mt-2 font-serif text-xl text-dark-ink">
                  {article.author}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-dark-ink/75">
                  Aurevellea publishes curated fashion, manicure, beauty, and
                  lifestyle guides crafted for clarity and timeless inspiration.
                </p>
                <Link
                  href="/about"
                  className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.16em] text-warm-brown underline decoration-rose/70 underline-offset-4 hover:text-dark-ink"
                >
                  Our Editorial Standards
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 ? (
        <section className="mt-16 border-t border-border-subtle bg-ivory-soft py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 border-b border-border-subtle pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose">
                  Continue Reading
                </p>
                <h2 className="mt-1 font-serif text-3xl font-normal text-dark-ink">
                  Related Stories
                </h2>
              </div>
              <Link
                href={category.href}
                className="text-xs font-medium uppercase tracking-[0.16em] text-warm-brown hover:text-dark-ink"
              >
                More in {category.name}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

