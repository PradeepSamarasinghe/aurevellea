"use client";

import { useState } from "react";
import { Bookmark, Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  imageUrl: string;
  description: string;
}

export function ShareButtons({
  url,
  title,
  imageUrl,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const pinterestHref = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    url
  )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
    `${title} — ${description}`
  )}`;

  const xShareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-ink/65">
        <Share2 className="h-3.5 w-3.5 text-rose" aria-hidden="true" />
        Share
      </span>

      <a
        href={pinterestHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 border border-warm-brown bg-warm-brown px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:border-dark-ink hover:bg-dark-ink"
      >
        <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Pin to Pinterest</span>
      </a>

      <a
        href={xShareHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center border border-border-subtle bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
      >
        Share on X
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 border border-border-subtle bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-warm-brown" aria-hidden="true" />
            <span>Link Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}

