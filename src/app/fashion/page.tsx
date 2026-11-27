import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/categories/CategoryPageTemplate";
import { CATEGORY_MAP } from "@/lib/categories";
import { buildPageMetadata } from "@/lib/seo";

const category = CATEGORY_MAP.fashion;

export const metadata: Metadata = buildPageMetadata({
  title: category.seoTitle,
  description: category.seoDescription,
  path: category.href,
  image: category.image,
  imageAlt: category.imageAlt,
});

export default function FashionPage() {
  return <CategoryPageTemplate category={category} />;
}

