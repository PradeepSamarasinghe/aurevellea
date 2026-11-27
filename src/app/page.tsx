import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORIES } from "@/lib/categories";
import {
  getFeaturedPosts,
  getLatestPosts,
  getTrendingPosts,
} from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getLatestPosts(6);
  const trendingPosts = getTrendingPosts(4);
  const pinterestShowcasePosts = getLatestPosts(4);

  return (
    <div>
      {/* 5 & 6. Premium Hero Section */}
      <section className="border-b border-border-subtle bg-ivory">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
              Women&apos;s Fashion, Beauty &amp; Nail Art Editorial
            </p>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-dark-ink sm:text-5xl lg:text-[3.35rem]">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-dark-ink/78 sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-dark-ink bg-dark-ink px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
              >
                <span>Explore the Journal</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/nail-art"
                className="inline-flex items-center border border-warm-brown/50 bg-transparent px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-warm-brown transition-colors hover:border-dark-ink hover:text-dark-ink"
              >
                Nail Art Archive
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border-subtle pt-6 text-xs">
              <div>
                <p className="font-serif text-lg text-dark-ink">Curated</p>
                <p className="mt-0.5 text-dark-ink/65">Outfit &amp; capsule edits</p>
              </div>
              <div>
                <p className="font-serif text-lg text-dark-ink">Visual</p>
                <p className="mt-0.5 text-dark-ink/65">2:3 Pinterest nail guides</p>
              </div>
              <div>
                <p className="font-serif text-lg text-dark-ink">Honest</p>
                <p className="mt-0.5 text-dark-ink/65">Independent editorial</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-border-subtle bg-blush/25">
              <Image
                src="/images/hero-editorial.jpg"
                alt="Woman in an ivory linen coat, cream silk blouse, and structured tan leather handbag in warm sunlight"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Explore Categories Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Editorial Pillars"
            title="Explore by Category"
            description="Browse curated styling guides, manicure inspiration, beauty habits, and intentional everyday living."
            actionLabel="View All Stories"
            actionHref="/blog"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex flex-col border border-border-subtle bg-white transition-colors hover:border-rose"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-ivory-soft">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-rose">
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-dark-ink transition-colors group-hover:text-warm-brown">
                      {category.name}
                    </h3>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-warm-brown">
                    Explore <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Articles Section */}
      <section className="border-y border-border-subtle bg-ivory-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Editor's Selection"
            title="Featured Stories"
            description="Foundational guides for effortless dressing, refined manicures, and everyday polish."
            actionLabel="Read the Journal"
            actionHref="/blog"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredPosts.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="editorial"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Editorial Promotional Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 border border-border-subtle bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-border-subtle bg-ivory-soft">
                <Image
                  src="/images/editorial-promo.jpg"
                  alt="Sunlit travertine vanity with blush silk scarf, tortoiseshell sunglasses, white ranunculus, and minimalist glass fragrance bottle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose">
                The Aurevellea Point of View
              </p>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight text-dark-ink sm:text-4xl">
                Quiet Confidence Over Passing Noise
              </h2>
              <p className="mt-4 text-base leading-relaxed text-dark-ink/80">
                Aurevellea was created as a calm, considered corner of the
                internet for women who appreciate timeless tailoring, soft
                neutral manicures, uncomplicated beauty routines, and
                intentional daily details.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-dark-ink/70">
                Every guide is written to be practical, clear, and genuinely
                useful—without exaggerated claims, cluttered layouts, or
                overwhelming trend cycles.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="border border-dark-ink bg-dark-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
                >
                  About Aurevellea
                </Link>
                <Link
                  href="/fashion"
                  className="border border-border-subtle px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
                >
                  Explore Fashion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Trending Inspiration Section */}
      <section className="border-y border-border-subtle bg-blush/25 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Saved & Revisited"
            title="Trending Inspiration"
            description="Reader-favorite outfit formulas, minimal nail looks, and everyday essentials."
            actionLabel="Browse Nail Art"
            actionHref="/nail-art"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingPosts.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Latest Articles Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recent Dispatches"
            title="Latest From the Journal"
            description="Fresh seasonal reading across fashion, manicures, beauty, accessories, and lifestyle."
            actionLabel="All Articles"
            actionHref="/blog"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pinterest & Visual Inspiration Section */}
      <section className="border-t border-border-subtle bg-ivory-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-rose">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Save for Later
              </p>
              <h2 className="mt-2 font-serif text-3xl font-normal text-dark-ink sm:text-4xl">
                Pinterest Visual Moodboard
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-dark-ink/75 sm:text-base">
                Every Aurevellea guide features 2:3 vertical imagery crafted for
                saving outfit formulas, manicure references, and styling notes
                directly to your boards.
              </p>
            </div>

            {siteConfig.socialLinks.pinterest ? (
              <a
                href={siteConfig.socialLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-warm-brown bg-warm-brown px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-dark-ink hover:bg-dark-ink"
              >
                <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Follow on Pinterest</span>
              </a>
            ) : (
              <Link
                href="/nail-art"
                className="inline-flex items-center gap-2 border border-warm-brown px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-warm-brown transition-colors hover:bg-warm-brown hover:text-ivory"
              >
                <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Explore Visual Boards</span>
              </Link>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {pinterestShowcasePosts.map((post) => {
              const articleUrl = absoluteUrl(`/blog/${post.slug}`);
              const mediaUrl = post.featuredImage.startsWith("http")
                ? post.featuredImage
                : absoluteUrl(post.featuredImage);
              const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                articleUrl
              )}&media=${encodeURIComponent(
                mediaUrl
              )}&description=${encodeURIComponent(post.title)}`;

              return (
                <div
                  key={post.slug}
                  className="group relative border border-border-subtle bg-white p-2.5"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[2/3] overflow-hidden bg-ivory-soft"
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="mt-3 flex items-center justify-between gap-2 px-1 pb-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="line-clamp-1 font-serif text-sm text-dark-ink hover:text-warm-brown"
                    >
                      {post.title}
                    </Link>
                    <a
                      href={pinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pin ${post.title} to Pinterest`}
                      className="shrink-0 border border-blush px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-warm-brown transition-colors hover:border-warm-brown hover:bg-warm-brown hover:text-ivory"
                    >
                      Pin
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
