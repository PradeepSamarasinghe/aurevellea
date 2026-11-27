import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Terms and Conditions | ${siteConfig.brandName}`,
  description:
    "Starter Terms and Conditions for Aurevellea covering editorial content, intellectual property, and informational disclaimers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Terms & Conditions" },
            ]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Legal &amp; Trust
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-dark-ink/60">
            Starter Template — Review and update before public launch
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 border border-blush bg-ivory-soft p-5 text-sm text-warm-brown">
          <strong>Owner Notice:</strong> This is a starter Terms &amp;
          Conditions template. Review and customize your governing jurisdiction
          and business details before public launch.
        </div>

        <div className="editorial-prose">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and reading {siteConfig.brandName}, you agree to these
            Terms &amp; Conditions. If you do not agree with any part of these
            terms, please discontinue use of the site.
          </p>

          <h2>2. Informational &amp; Editorial Nature of Content</h2>
          <p>
            All articles on {siteConfig.brandName}—including fashion, nail art,
            beauty, accessories, and lifestyle content—are provided for general
            informational and editorial inspiration purposes only. Beauty and
            skincare articles do not constitute medical, dermatological, or
            professional health advice.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            Unless otherwise credited, original written articles, editorial
            layouts, and brand materials on {siteConfig.brandName} are owned by{" "}
            {siteConfig.brandName} [insert legal entity or owner name when
            applicable]. You may share links to articles or pin images with
            clear attribution back to the original article URL, but you may not
            republish full articles without written permission.
          </p>

          <h2>4. Third-Party Websites</h2>
          <p>
            {siteConfig.brandName} may reference or link to third-party
            websites. We are not responsible for the content, availability,
            pricing, or practices of external sites.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These terms are governed by the laws of{" "}
            [Insert State / Country jurisdiction], without regard to conflict of
            law principles.
          </p>
        </div>
      </div>
    </div>
  );
}

