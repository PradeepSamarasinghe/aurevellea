import Link from "next/link";
import { Info } from "lucide-react";
import { getActiveAffiliateDisclosure, siteConfig } from "@/lib/site";

interface AffiliateDisclosureBannerProps {
  compact?: boolean;
}

export function AffiliateDisclosureBanner({
  compact = false,
}: AffiliateDisclosureBannerProps) {
  const disclosureText = getActiveAffiliateDisclosure();

  return (
    <aside
      aria-label="Editorial and affiliate disclosure"
      className={`border border-blush bg-ivory-soft ${
        compact ? "px-4 py-3.5 text-xs" : "p-5 text-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-rose"
          aria-hidden="true"
        />
        <div className="space-y-1.5 leading-relaxed text-dark-ink/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-brown">
            {siteConfig.affiliate.enabled
              ? "Affiliate & Editorial Disclosure"
              : "Editorial Transparency"}
          </p>
          <p>{disclosureText}</p>
          <p>
            Read our full{" "}
            <Link
              href="/affiliate-disclosure"
              className="font-medium text-warm-brown underline decoration-rose/70 underline-offset-4 hover:text-dark-ink"
            >
              Affiliate Disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}

