import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { AffiliateProductItem } from "@/types/article";

type AffiliateProductCardProps = AffiliateProductItem;

export function AffiliateProductCard({
  name,
  description,
  image,
  imageAlt,
  categoryLabel,
  price,
  affiliateUrl,
  retailerLabel = "View at Retailer",
  notes,
}: AffiliateProductCardProps) {
  const hasLiveLink = Boolean(affiliateUrl && siteConfig.affiliate.enabled);

  return (
    <article className="flex flex-col border border-border-subtle bg-white transition-colors hover:border-rose/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border-subtle bg-ivory-soft">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <Sparkles className="h-5 w-5 text-rose" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-warm-brown">
              Editorial Product Slot
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {categoryLabel ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-rose">
              {categoryLabel}
            </p>
          ) : null}
          <h3 className="mt-1.5 font-serif text-xl font-normal text-dark-ink">
            {name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-dark-ink/75">
            {description}
          </p>
          {notes ? (
            <p className="mt-3 text-xs italic text-warm-brown/85">{notes}</p>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
          {price ? (
            <span className="text-sm font-medium text-dark-ink">{price}</span>
          ) : (
            <span className="text-xs text-dark-ink/75">
              Editorial Selection
            </span>
          )}

          {hasLiveLink && affiliateUrl ? (
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-dark-ink bg-dark-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-warm-brown hover:border-warm-brown"
            >
              <span>{retailerLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="border border-blush bg-ivory-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-warm-brown">
              Link Pending
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function EditorialProductGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 not-prose">
      {children}
    </div>
  );
}
