import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { NewsletterSection } from "@/components/home/NewsletterSection";
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

/* ───────────── Presentational helpers (no logic) ───────────── */

const BTN_PRIMARY =
  "inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#6a3222] to-cocoa px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(75,34,24,0.7)] transition-transform hover:-translate-y-0.5";
const BTN_OUTLINE =
  "inline-flex items-center gap-2 rounded-lg border border-cocoa/20 bg-white/40 px-7 py-3.5 text-sm font-medium text-cocoa backdrop-blur-sm transition-colors hover:bg-white/70";

function PinkHeading({
  eyebrow,
  lead,
  accent,
  description,
  actionLabel,
  actionHref,
}: {
  eyebrow?: string;
  lead: string;
  accent: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="inline-block rounded-full border border-white/70 bg-white/60 px-3.5 py-1 text-[11px] font-medium text-mocha backdrop-blur-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-sans text-3xl font-semibold leading-tight tracking-tight text-cocoa sm:text-4xl">
        {lead}{" "}
        <span className="font-serif font-medium italic text-mocha">
          {accent}
        </span>
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-cocoa/80 sm:text-base">
          {description}
        </p>
      ) : null}
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-cocoa/20 bg-white/50 px-5 py-2.5 text-xs font-medium text-cocoa transition-colors hover:bg-white/80"
        >
          {actionLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}

const SOFT_CARDS =
  "[&_article]:overflow-hidden [&_article]:rounded-2xl [&_article]:border-white/70 [&_article]:shadow-[0_18px_40px_-28px_rgba(75,34,24,0.5)]";
const COMPACT_ARTICLE_CARDS =
  "[&_article>a]:aspect-[4/5] md:[&_article>a]:aspect-[2/3] [&_article>div]:p-2.5 sm:[&_article>div]:p-3 md:[&_article>div]:p-5 [&_article_p]:hidden sm:[&_article_p]:block [&_article_a]:focus-visible:outline-none [&_article_a]:focus-visible:ring-2 [&_article_a]:focus-visible:ring-cocoa [&_article_a]:focus-visible:ring-offset-2 [&_article_a]:focus-visible:ring-offset-milk";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getLatestPosts(6);
  const trendingPosts = getTrendingPosts(4);
  const pinterestShowcasePosts = getLatestPosts(4);

  const taglineParts = siteConfig.tagline.split(/(?<=\.)\s+/);
  const firstWords = (taglineParts[0] ?? "").split(" ");
  const accentWord = firstWords.pop() ?? "";
  const leadWords = firstWords.join(" ");

  return (
    <div className="bg-milk">
      {/* ───────────── 1. Hero ───────────── */}
      <section className="hero-section relative isolate min-h-[560px] overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-y-0 left-0 z-0 w-[44%]" />
        <div className="hero-content relative z-20 mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:min-h-[680px] lg:px-8 lg:py-12">
          <div className="relative z-10 max-w-3xl lg:w-[58%]">
            <h1 className="hero-heading hero-enter text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.08] tracking-tight text-cocoa">
              <span className="block">
                {leadWords}{" "}
                <span className="hero-accent font-serif font-medium italic text-cocoa">
                  {accentWord}
                </span>
              </span>
              {taglineParts[1] ? (
                <span className="block">{taglineParts[1]}</span>
              ) : null}
            </h1>
            <div className="hero-enter hero-enter-delay-1 mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center">
              <Link
                href="/blog"
                className={`${BTN_PRIMARY} min-h-12 w-full justify-center focus-visible:ring-2 focus-visible:ring-cocoa focus-visible:ring-offset-2 focus-visible:ring-offset-rosewater min-[400px]:w-auto`}
              >
                Explore the Journal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/nail-art"
                className={`${BTN_OUTLINE} min-h-12 w-full justify-center focus-visible:ring-2 focus-visible:ring-cocoa focus-visible:ring-offset-2 focus-visible:ring-offset-rosewater min-[400px]:w-auto`}
              >
                Nail Art Archive
              </Link>
            </div>
          </div>
          <div className="relative z-10 mt-8 flex items-center gap-3 lg:absolute lg:bottom-10 lg:left-8 lg:mt-0">
            <div className="flex -space-x-2 rounded-full bg-white/60 p-1 backdrop-blur-sm">
              {CATEGORIES.slice(0, 3).map((category) => (
                <span
                  key={category.slug}
                  className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-petal"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <p className="text-xs leading-5 text-cocoa">
              <span className="font-medium text-cocoa">
                Independent editorial
              </span>
              <br />
              Timeless style, nail art &amp; everyday beauty.
            </p>
          </div>
        </div>

        <div className="hero-image-frame relative z-10 h-[420px] w-full sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]">
          <div className="hero-photo-mask absolute inset-0">
            <Image
              src="/images/hero-editorial.png"
              alt="Woman applying face serum with a glass dropper against a soft pink studio backdrop"
              fill
              priority
              quality={100}
              sizes="(max-width: 560px) 560px, (max-width: 1023px) 100vw, 910px"
              className="object-cover object-[84%_0%] lg:object-[84%_24%]"
            />
          </div>
        </div>
      </section>

      {/* ───────────── 2. Highlights ───────────── */}
      <section className="relative z-30 px-4 sm:px-6 lg:-mt-9 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-cocoa/10 rounded-2xl border border-white/70 bg-white/75 py-5 shadow-[0_20px_50px_-30px_rgba(75,34,24,0.45)] backdrop-blur">
          {[
            ["Curated", "Outfit & capsule edits"],
            ["Visual", "2:3 Pinterest nail guides"],
            ["Honest", "Independent editorial"],
          ].map(([title, text]) => (
            <div key={title} className="px-3 text-center sm:px-6">
              <p className="font-sans text-base font-semibold text-cocoa sm:text-lg">
                {title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-cocoa/80 sm:text-xs">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── 3. Categories ───────────── */}
      <section className="py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PinkHeading
            eyebrow="Editorial Pillars"
            lead="Explore by"
            accent="Category"
            description="Browse curated styling guides, manicure inspiration, beauty habits, and intentional everyday living."
            actionLabel="View All Stories"
            actionHref="/blog"
          />
          <div className="relative mt-8 sm:mt-12">
            <div
              role="list"
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 -mx-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:overscroll-auto md:mx-0 md:px-0 md:pb-0 md:snap-none lg:grid-cols-5"
            >
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  role="listitem"
                  className="group flex w-[62%] min-w-[220px] max-w-[280px] shrink-0 snap-start flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa focus-visible:ring-offset-2 focus-visible:ring-offset-milk md:w-auto md:min-w-0 md:max-w-none md:shrink md:snap-align-none lg:even:mt-8"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-petal/40 shadow-[0_18px_40px_-28px_rgba(75,34,24,0.5)] md:aspect-[3/4]">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-1 pt-4">
                    <p className="text-[11px] font-medium text-mocha">
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-0.5 font-sans text-lg font-semibold text-cocoa transition-colors group-hover:text-mocha">
                      {category.name}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-cocoa">
                      Explore
                      <ArrowRight
                        className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -right-4 z-10 w-10 bg-gradient-to-l from-milk to-transparent md:hidden"
            />
          </div>
        </div>
      </section>

      {/* ───────────── 4. Featured stories ───────────── */}
      <section className="bg-gradient-to-b from-rosewater/70 to-milk py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PinkHeading
            eyebrow="Editor's Selection"
            lead="Featured"
            accent="Stories"
            description="Foundational guides for effortless dressing, refined manicures, and everyday polish."
            actionLabel="Read the Journal"
            actionHref="/blog"
          />
          <div
            role="list"
            className={`-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:overscroll-auto md:px-0 md:pb-0 md:snap-none ${SOFT_CARDS} ${COMPACT_ARTICLE_CARDS} [&_article_h3]:line-clamp-2 [&_article_h3]:text-sm md:[&_article_h3]:line-clamp-none md:[&_article_h3]:text-3xl`}
          >
            {featuredPosts.map((article) => (
              <div
                key={article.slug}
                role="listitem"
                className="w-[82%] min-w-[220px] shrink-0 snap-start md:contents"
              >
                <ArticleCard article={article} variant="editorial" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 5. Point of view ───────────── */}
      <section className="py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#fde8e3_0%,#f9cfc9_60%,#f2b3b0_100%)] p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/70 bg-white/40 shadow-[0_24px_50px_-28px_rgba(75,34,24,0.55)]">
              <Image
                src="/images/editorial-promo.jpg"
                alt="Sunlit travertine vanity with blush silk scarf, tortoiseshell sunglasses, white ranunculus, and minimalist glass fragrance bottle"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="inline-block rounded-full border border-white/70 bg-white/60 px-3.5 py-1 text-[11px] font-medium text-mocha backdrop-blur-sm">
              The Aurevellea Point of View
              </p>
              <h2 className="mt-4 font-sans text-3xl font-semibold leading-tight tracking-tight text-cocoa sm:text-5xl">
              Quiet Confidence{" "}
              <span className="font-serif font-medium italic text-mocha">
                Over
              </span>{" "}
              Passing Noise
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-cocoa/80 sm:text-base">
              Aurevellea was created as a calm, considered corner of the
              internet for women who appreciate timeless tailoring, soft
              neutral manicures, uncomplicated beauty routines, and
              intentional daily details.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-cocoa/80">
              Every guide is written to be practical, clear, and genuinely
              useful—without exaggerated claims, cluttered layouts, or
              overwhelming trend cycles.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className={BTN_PRIMARY}>
                About Aurevellea
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/fashion" className={BTN_OUTLINE}>
                Explore Fashion
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 6. Trending ───────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PinkHeading
            eyebrow="Saved & Revisited"
            lead="Trending"
            accent="Inspiration"
            description="Reader-favorite outfit formulas, minimal nail looks, and everyday essentials."
            actionLabel="Browse Nail Art"
            actionHref="/nail-art"
          />
          <div
            className={`mt-8 grid grid-cols-2 gap-3 max-[375px]:-mx-2 max-[375px]:gap-2 sm:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4 ${SOFT_CARDS} ${COMPACT_ARTICLE_CARDS} [&_article_h3]:line-clamp-2 [&_article_h3]:text-sm md:[&_article_h3]:line-clamp-none md:[&_article_h3]:text-xl`}
          >
            {trendingPosts.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 7. Latest articles ───────────── */}
      <section className="bg-gradient-to-b from-milk via-rosewater/60 to-milk py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PinkHeading
            eyebrow="Recent Dispatches"
            lead="Latest From the"
            accent="Journal"
            description="Fresh seasonal reading across fashion, manicures, beauty, accessories, and lifestyle."
            actionLabel="All Articles"
            actionHref="/blog"
          />
          <div
            className={`mt-8 grid grid-cols-2 gap-3 max-[375px]:-mx-2 max-[375px]:gap-2 sm:mt-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3 ${SOFT_CARDS} ${COMPACT_ARTICLE_CARDS} [&_article_h3]:line-clamp-2 [&_article_h3]:text-sm md:[&_article_h3]:line-clamp-none md:[&_article_h3]:text-xl`}
          >
            {latestPosts.map((article, index) =>
              index >= 4 ? (
                <div key={article.slug} className="hidden md:contents">
                  <ArticleCard article={article} />
                </div>
              ) : (
                <ArticleCard key={article.slug} article={article} />
              )
            )}
          </div>
          <Link
            href="/blog"
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-cocoa px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-mocha focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa focus-visible:ring-offset-2 focus-visible:ring-offset-milk md:hidden"
          >
            All Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ───────────── 8. Pinterest moodboard ───────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PinkHeading
            eyebrow="Save for Later"
            lead="Pinterest Visual"
            accent="Moodboard"
            description="Every Aurevellea guide features 2:3 vertical imagery crafted for saving outfit formulas, manicure references, and styling notes directly to your boards."
          />
          <div className="mt-6 flex justify-center">
            {siteConfig.socialLinks.pinterest ? (
              <a
                href={siteConfig.socialLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_PRIMARY}
              >
                <Bookmark className="h-4 w-4" aria-hidden="true" />
                <span>Follow on Pinterest</span>
              </a>
            ) : (
              <Link href="/nail-art" className={BTN_OUTLINE}>
                <Bookmark className="h-4 w-4" aria-hidden="true" />
                <span>Explore Visual Boards</span>
              </Link>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-[375px]:-mx-2 max-[375px]:gap-2 sm:mt-10 sm:gap-6 lg:grid-cols-4">
            {pinterestShowcasePosts.slice(0, 3).map((post) => {
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
                <div key={post.slug} className="group relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[2/3] overflow-hidden rounded-2xl bg-petal/40 shadow-[0_18px_40px_-28px_rgba(75,34,24,0.5)]"
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="mt-3 flex items-center justify-between gap-2 px-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-cocoa hover:text-mocha"
                    >
                      {post.title}
                    </Link>
                    <a
                      href={pinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pin ${post.title} to Pinterest`}
                      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-cocoa/20 bg-white/70 px-3 py-1 text-[11px] font-medium text-mocha transition-colors hover:bg-cocoa hover:text-white md:min-h-0 md:min-w-0"
                    >
                      Pin
                    </a>
                  </div>
                </div>
              );
            })}
            {siteConfig.socialLinks.pinterest ? (
              <a
                href={siteConfig.socialLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl bg-copper-ink p-6 text-center text-cream hover:bg-deep-teal"
              >
                <Bookmark className="h-7 w-7" aria-hidden="true" />
                <span className="font-serif text-lg leading-snug">
                  Follow on
                  <br />
                  Pinterest
                </span>
                <ArrowRight className="h-5 w-9" strokeWidth={1} aria-hidden="true" />
              </a>
            ) : (
              <Link
                href="/nail-art"
                className="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl bg-copper-ink p-6 text-center text-cream hover:bg-deep-teal"
              >
                <Bookmark className="h-7 w-7" aria-hidden="true" />
                <span className="font-serif text-lg leading-snug">
                  Explore
                  <br />
                  Visual Boards
                </span>
                <ArrowRight className="h-5 w-9" strokeWidth={1} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───────────── 9. Newsletter (teal footer block) ───────────── */}
      <NewsletterSection />
    </div>
  );
}