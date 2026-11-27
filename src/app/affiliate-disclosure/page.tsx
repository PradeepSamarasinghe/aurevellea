import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { getActiveAffiliateDisclosure, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Affiliate Disclosure | ${siteConfig.brandName}`,
  description:
    "Read Aurevellea's editorial transparency and affiliate disclosure policy.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  const activeDisclosure = getActiveAffiliateDisclosure();

  return (
    <div className="pb-16 sm:pb-20">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Affiliate Disclosure", path: "/affiliate-disclosure" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Affiliate Disclosure" },
            ]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Reader Trust &amp; Transparency
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            Affiliate Disclosure
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 border border-blush bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-brown">
            Current Publication Status
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-dark-ink/85">
            {activeDisclosure}
          </p>
        </div>

        <div className="editorial-prose">
          <h2>1. Our Commitment to Honest Recommendations</h2>
          <p>
            Reader trust is the foundation of {siteConfig.brandName}. All
            editorial topics—whether outfit formulas, nail art guides, beauty
            routines, or jewellery styling—are written to provide genuine value
            first.
          </p>

          <h2>2. Current Monetization Status</h2>
          <p>
            {siteConfig.affiliate.enabled
              ? "Select articles on Aurevellea may include clearly labeled affiliate links. Clicking an affiliate link and making a qualifying purchase may earn a commission at no extra cost to you."
              : "At present, Aurevellea does not participate in active affiliate programs and does not publish active affiliate links or sponsored product placements."}
          </p>

          <h2>3. Future Affiliate Partnerships</h2>
          <p>
            As {siteConfig.brandName} grows, we plan to partner with vetted
            affiliate programs. Whenever an article contains affiliate links in
            the future:
          </p>
          <ul>
            <li>
              A clear disclosure notice will appear near the top of the article
              before any affiliate links.
            </li>
            <li>
              Affiliate links will be clearly labeled and marked with standard
              HTML attributes (<code>rel=&quot;sponsored noopener noreferrer&quot;</code>).
            </li>
            <li>
              We will never invent prices, fabricate testing experiences, or
              imply program membership unless officially approved.
            </li>
          </ul>

          <h2>4. Questions</h2>
          <p>
            If you have questions about how {siteConfig.brandName} handles
            editorial recommendations, please visit our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

