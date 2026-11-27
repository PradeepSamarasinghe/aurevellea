import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Privacy Policy | ${siteConfig.brandName}`,
  description:
    "Starter Privacy Policy template for Aurevellea outlining data collection, cookies, third-party links, and reader privacy rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Legal &amp; Trust
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-dark-ink/60">
            Starter Template — Review and update before public launch
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 border border-blush bg-ivory-soft p-5 text-sm text-warm-brown">
          <strong>Owner Notice:</strong> This is a starter Privacy Policy
          template. Please verify all details—including your contact email,
          analytics providers, email service provider, and applicable regional
          privacy laws (such as CCPA/CPRA or GDPR)—before publishing.
        </div>

        <div className="editorial-prose">
          <h2>1. Information We Collect</h2>
          <p>
            {siteConfig.brandName} currently operates as an informational
            editorial website. Unless you voluntarily submit an inquiry or
            subscribe to an email list once active, we do not directly collect
            personal contact details.
          </p>
          <p>
            [Update this section if you enable analytics tools, embedded forms,
            or newsletter signups.]
          </p>

          <h2>2. Cookies and Usage Analytics</h2>
          <p>
            Standard hosting infrastructure may log basic technical request
            information (such as browser type, referring page, and approximate
            timestamp) for security and site reliability. If privacy-friendly or
            third-party analytics tools are added in the future, this policy
            should list each provider and explain how visitors can manage
            preferences.
          </p>

          <h2>3. External &amp; Future Affiliate Links</h2>
          <p>
            Articles on {siteConfig.brandName} may link to external websites.
            Those external sites operate under their own privacy policies and
            terms. When affiliate programs are introduced in the future,
            third-party retailers may use cookies or referral parameters to
            attribute qualifying visits.
          </p>

          <h2>4. Children&apos;s Privacy</h2>
          <p>
            {siteConfig.brandName} is intended for a general adult audience and
            does not knowingly collect personal information from children under
            13 years of age.
          </p>

          <h2>5. Contact Regarding Privacy</h2>
          <p>
            Privacy questions or requests may be sent to:{" "}
            {siteConfig.contactEmail || "[Insert verified privacy contact email]"}
            .
          </p>
        </div>
      </div>
    </div>
  );
}

