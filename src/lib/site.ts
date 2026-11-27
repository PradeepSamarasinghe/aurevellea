const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://aurevellea.com";

export const siteConfig = {
  brandName: "Aurevellea",
  tagline: "Find Your Style. Embrace Your Beauty.",
  description:
    "Discover beautiful outfit ideas, nail art inspiration, beauty discoveries and everyday elegance.",
  editorialSubtitle:
    "An independent women's fashion, nail art, beauty, and lifestyle publication crafted for timeless everyday elegance.",
  url: rawSiteUrl,
  isCustomDomainConnected:
    process.env.NEXT_PUBLIC_DOMAIN_CONNECTED === "true",
  locale: "en_US",
  language: "en",
  audienceRegion: "United States",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || null,
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || null,
  socialLinks: {
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || null,
  },
  announcementBar: {
    text: "The Autumn–Winter Editorial Issue — Timeless Silhouettes, Minimal Manicures & Everyday Beauty",
    href: "/blog",
    ctaLabel: "Read the Journal",
  },
  affiliate: {
    enabled: process.env.NEXT_PUBLIC_AFFILIATE_ENABLED === "true",
    amazonAssociateApproved:
      process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_APPROVED === "true",
    generalDisclosure:
      "Aurevellea is an independent editorial publication. At this stage, articles do not contain active affiliate links. When affiliate partnerships are introduced in the future, every sponsored or affiliate link will be clearly identified before you click.",
    amazonAssociateRequiredStatement:
      "As an Amazon Associate I earn from qualifying purchases.",
  },
  defaultOgImage: "/images/hero-editorial.png",
  editorialStandards: {
    defaultAuthor: "Aurevellea Editorial Desk",
    draftDisclaimer:
      "Initial editorial draft prepared for review before final publication.",
  },
} as const;

export function getActiveAffiliateDisclosure(): string {
  if (siteConfig.affiliate.amazonAssociateApproved) {
    return `${siteConfig.affiliate.amazonAssociateRequiredStatement} ${siteConfig.affiliate.generalDisclosure}`;
  }
  return siteConfig.affiliate.generalDisclosure;
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}

