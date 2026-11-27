export type CategorySlug =
  | "fashion"
  | "nail-art"
  | "beauty"
  | "accessories"
  | "lifestyle";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: CategorySlug;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  imageAspect?: "portrait" | "landscape" | "square";
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  trending?: boolean;
  hasAffiliateDisclosure?: boolean;
  draftNotice?: string;
  galleryImages?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export interface ArticleSummary extends ArticleFrontmatter {
  wordCount: number;
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Article extends ArticleSummary {
  content: string;
  headings: TocHeading[];
}

export interface AffiliateProductItem {
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  categoryLabel?: string;
  /** Optional price string; omit when not confirmed from an active API/feed. */
  price?: string;
  /** Leave undefined until an approved affiliate link is provided. */
  affiliateUrl?: string;
  retailerLabel?: string;
  notes?: string;
}

