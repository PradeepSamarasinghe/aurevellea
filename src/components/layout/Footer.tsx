import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const configuredSocials = [
    siteConfig.socialLinks.pinterest
      ? { label: "Pinterest", href: siteConfig.socialLinks.pinterest }
      : null,
    siteConfig.socialLinks.instagram
      ? { label: "Instagram", href: siteConfig.socialLinks.instagram }
      : null,
    siteConfig.socialLinks.tiktok
      ? { label: "TikTok", href: siteConfig.socialLinks.tiktok }
      : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <footer className="border-t border-border-subtle bg-dark-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.18em] text-ivory uppercase"
            >
              {siteConfig.brandName}
            </Link>
            <p className="mt-3 font-serif text-lg italic text-blush">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/75">
              {siteConfig.editorialSubtitle}
            </p>
            {configuredSocials.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-4">
                {configuredSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-blush underline decoration-rose/60 underline-offset-4 hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-xs text-ivory/55">
                Social channels can be linked in site configuration when ready.
              </p>
            )}
          </div>

          {/* Editorial Categories */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blush">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.href}
                    className="text-ivory/80 transition-colors hover:text-blush"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  All Journal Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Publication */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blush">
              Publication
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Transparency */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blush">
              Trust & Policies
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-ivory/80 transition-colors hover:text-blush"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {siteConfig.brandName}. All editorial
            rights reserved.
          </p>
          <p>
            Independent women&apos;s fashion, nail art, beauty &amp; lifestyle
            editorial.
          </p>
        </div>
      </div>
    </footer>
  );
}

