import type { Metadata } from "next";
import { ContactFormClient } from "@/components/contact/ContactFormClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact | ${siteConfig.brandName}`,
  description:
    "Contact Aurevellea for editorial inquiries, collaborations, or reader feedback.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Contact" }]}
          />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
            Reader &amp; Editorial Inquiries
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
            Contact {siteConfig.brandName}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-dark-ink/78">
            Questions about an editorial guide, styling topic requests, or
            policy inquiries can be directed here once contact details are
            connected.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactFormClient />
          </div>

          <aside className="space-y-5 border border-border-subtle bg-ivory-soft p-6 md:col-span-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-brown">
                Editorial Details
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dark-ink/80">
                Brand: <strong>{siteConfig.brandName}</strong>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-dark-ink/80">
                Primary Contact Email:{" "}
                {siteConfig.contactEmail || "[Add verified contact email]"}
              </p>
            </div>
            <div className="border-t border-border-subtle pt-4 text-xs leading-relaxed text-dark-ink/75">
              <p>
                No physical mailing address or telephone number is published
                until verified by the site owner.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

