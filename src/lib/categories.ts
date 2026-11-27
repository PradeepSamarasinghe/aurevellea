import type { CategorySlug } from "@/types/article";

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  shortLabel: string;
  href: string;
  eyebrow: string;
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  themes: string[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "fashion",
    name: "Fashion",
    shortLabel: "Fashion",
    href: "/fashion",
    eyebrow: "Editorial Wardrobe",
    headline: "Timeless Silhouettes & Effortless Outfit Ideas",
    description:
      "Thoughtful outfit pairings, neutral tailoring, and seasonal wardrobe edits designed for real life and lasting polish.",
    seoTitle: "Women's Fashion & Outfit Inspiration | Aurevellea",
    seoDescription:
      "Explore women's fashion editorial guides, neutral outfit ideas, capsule wardrobe tips, and seasonal styling inspiration from Aurevellea.",
    image: "/images/articles/elegant-outfit-ideas.jpg",
    imageAlt:
      "Woman in a tailored cream blazer and pleated taupe trousers in soft morning sunlight",
    themes: [
      "Neutral Outfit Formulas",
      "Capsule Wardrobe Building",
      "Tailored Everyday Layers",
      "Occasion & Dinner Dressing",
    ],
  },
  {
    slug: "nail-art",
    name: "Nail Art",
    shortLabel: "Nail Art",
    href: "/nail-art",
    eyebrow: "Visual Manicure Archive",
    headline: "Minimal Nail Designs & Modern Manicure Inspiration",
    description:
      "A visual guide to sheer milky neutrals, ultra-thin micro French tips, refined short nail shapes, and understated seasonal tones.",
    seoTitle: "Minimal Nail Art & Manicure Ideas | Aurevellea",
    seoDescription:
      "Discover minimal nail designs, modern French manicure ideas, short nail inspiration, wedding nails, and refined polish palettes.",
    image: "/images/articles/minimal-nail-designs.jpg",
    imageAlt:
      "Sheer milky ivory oval nails with delicate micro-gold crescent accent on linen",
    themes: [
      "Minimal Nail Designs",
      "French Manicure Ideas",
      "Short Nail Designs",
      "Elegant & Wedding Nails",
      "Seasonal Color Pairings",
    ],
  },
  {
    slug: "beauty",
    name: "Beauty",
    shortLabel: "Beauty",
    href: "/beauty",
    eyebrow: "Skincare & Makeup",
    headline: "Soft-Focus Beauty & Intentional Daily Routines",
    description:
      "Approachable skincare habits, understated makeup inspiration, and curated beauty essentials focused on comfort and natural radiance.",
    seoTitle: "Beauty, Skincare Routines & Makeup Inspiration | Aurevellea",
    seoDescription:
      "Read approachable beauty routines, minimalist makeup inspiration, and seasonal skincare guides on Aurevellea.",
    image: "/images/articles/everyday-beauty-essentials.svg",
    imageAlt:
      "Minimalist skincare serum bottle, neutral lip balm, and brush arranged on ivory travertine",
    themes: [
      "Daily Skincare Habits",
      "Soft Natural Makeup",
      "Seasonal Beauty Adjustments",
      "Edit of Everyday Essentials",
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    shortLabel: "Accessories",
    href: "/accessories",
    eyebrow: "The Finishing Touch",
    headline: "Jewellery, Handbags & Refined Details",
    description:
      "How sculptural gold jewellery, structured leather handbags, and classic footwear elevate the simplest everyday outfits.",
    seoTitle: "Jewellery, Handbags & Fashion Accessories | Aurevellea",
    seoDescription:
      "Explore jewellery styling ideas, classic handbag silhouettes, footwear edits, and accessory inspiration from Aurevellea.",
    image: "/images/articles/jewellery-styling-ideas.jpg",
    imageAlt:
      "Delicate 14k gold layered necklaces, sculptural hoops, and pearl ring on ivory silk",
    themes: [
      "Everyday Gold Jewellery",
      "Structured Handbags",
      "Classic Footwear",
      "Silk Scarves & Eyewear",
    ],
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    shortLabel: "Lifestyle",
    href: "/lifestyle",
    eyebrow: "Everyday Elegance",
    headline: "Intentional Living & Quiet Daily Rituals",
    description:
      "Grounded inspiration for personal style, calm morning routines, and creating ease in how you dress and live each day.",
    seoTitle: "Everyday Elegance & Lifestyle Inspiration | Aurevellea",
    seoDescription:
      "Discover calm self-care rituals, personal style perspectives, and everyday elegance inspiration on Aurevellea.",
    image: "/images/articles/versatile-wardrobe.jpg",
    imageAlt:
      "Curated neutral capsule wardrobe hanging on a brass garment rack in warm light",
    themes: [
      "Everyday Elegance",
      "Calm Morning Rituals",
      "Wardrobe Organization",
      "Personal Style Clarity",
    ],
  },
];

export const CATEGORY_MAP: Record<CategorySlug, CategoryDefinition> =
  CATEGORIES.reduce(
    (acc, category) => {
      acc[category.slug] = category;
      return acc;
    },
    {} as Record<CategorySlug, CategoryDefinition>
  );

export function getCategoryBySlug(
  slug: string
): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

