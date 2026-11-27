import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { CATEGORIES } from "@/lib/categories";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `About Us | ${siteConfig.brandName}`,
  description:
    "Learn about Aurevellea — an independent women's fashion, nail art, beauty, and lifestyle editorial publication.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "About Us" }]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Our Publication
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            About {siteConfig.brandName}
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-xl italic text-warm-brown">
            {siteConfig.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 text-base leading-relaxed text-dark-ink/85 lg:col-span-7">
            <h2 className="font-serif text-3xl font-normal text-dark-ink">
              A Thoughtful Space for Everyday Style &amp; Beauty
            </h2>
            <p>
              <strong>{siteConfig.brandName}</strong> is an independent digital
              publication dedicated to women&apos;s fashion inspiration, minimal
              nail art, everyday beauty routines, refined accessories, and
              intentional living.
            </p>
            <p>
              Created primarily for women across the United States who value
              clarity over clutter, Aurevellea brings together wearable outfit
              ideas, clean manicure references, and calm seasonal edits that fit
              real schedules and real wardrobes.
            </p>

            <h2 className="pt-4 font-serif text-3xl font-normal text-dark-ink">
              Editorial Standards &amp; Independence
            </h2>
            <ul className="list-disc space-y-2.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Honest Content:</strong> We do not publish fabricated
                product tests, invented personal experiences, or unsupported
                skincare or medical claims.
              </li>
              <li>
                <strong>Visual Clarity:</strong> Our guides emphasize clear,
                scannable formatting and 2:3 vertical visual inspiration so you
                can easily save and revisit ideas.
              </li>
              <li>
                <strong>Reader-First Monetization Policy:</strong> Any future
                affiliate partnerships will always be clearly disclosed and kept
                secondary to genuine editorial usefulness.
              </li>
            </ul>

            <div className="border border-blush bg-ivory-soft p-5 text-sm text-dark-ink/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-brown">
                Owner Verification Placeholder
              </p>
              <p className="mt-2">
                [Add your founder story, editorial background, and publication
                location here before public launch.]
              </p>
            </div>

            <div className="pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose">
                Explore Our Sections
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={category.href}
                    className="border border-border-subtle bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden border border-border-subtle bg-white">
              <Image
                src="/images/editorial-promo.jpg"
                alt="Minimalist travertine vanity with silk scarf, sunglasses, white flowers, and glass perfume bottle"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

