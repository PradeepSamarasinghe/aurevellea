# Publishing New Articles on Aurevellea

Aurevellea uses local **MDX** files stored in `src/content/posts/`. Every `.mdx` file placed in this directory is automatically discovered, parsed, indexed in search, included in `sitemap.xml`, and rendered at `/blog/<slug>`.

## 1. Create a New Article File

Create a new file in `src/content/posts/` named with your URL slug, for example:

`src/content/posts/autumn-trench-coat-outfits.mdx`

## 2. Frontmatter Template

```mdx
---
title: "Your Editorial Article Title"
slug: "autumn-trench-coat-outfits"
category: "fashion" # Allowed: fashion | nail-art | beauty | accessories | lifestyle
excerpt: "A concise 1-2 sentence summary shown on article cards and previews."
featuredImage: "/images/articles/your-image.jpg" # Ideal ratio: 2:3 vertical for Pinterest
imageAlt: "Descriptive alt text explaining the photograph clearly"
imageAspect: "portrait"
author: "Aurevellea Editorial Desk"
publishedAt: "2026-11-26"
updatedAt: "2026-11-26" # Optional
tags:
  - "trench coat"
  - "neutral outfits"
seoTitle: "SEO Title (50-60 chars) | Aurevellea"
seoDescription: "Compelling meta description (135-155 chars) for search & Pinterest."
featured: false
trending: false
hasAffiliateDisclosure: false
draftNotice: "Optional editorial review note."
---
```

## 3. Built-In MDX Components

Inside the article body you can use standard Markdown (`##` and `###` headings automatically populate the Table of Contents) as well as Aurevellea's editorial components:

- `<EditorialProductGrid>...</EditorialProductGrid>`
- `<AffiliateProductCard name="..." categoryLabel="..." description="..." price="..." affiliateUrl="..." />` (omit `price` and `affiliateUrl` until confirmed/approved)
- `<ProductComparisonTable caption="..." headers={[...]} rows={[[...]]} />`
- `<EditorialCallout title="...">...</EditorialCallout>`
- `<EditorialImage src="/images/..." alt="..." caption="..." />`

## 4. Images & Replacement Checklist

Current local images live in `public/images/` and `public/images/articles/`.
Replace the two editorial SVG placeholders (`everyday-beauty-essentials.svg` and `french-manicure-ideas.svg`)—or any generated starter JPGs—with your own verified brand photography when ready, and update `featuredImage` and `imageAlt` in the article frontmatter.

