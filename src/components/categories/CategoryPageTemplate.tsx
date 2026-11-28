import Image from "next/image";
import Link from "next/link";
import { CategoryArchiveClient } from "@/components/categories/CategoryArchiveClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CategoryDefinition } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

interface CategoryPageTemplateProps {
  category: CategoryDefinition;
  editorialNote?: string;
  visualFocus?: boolean;
}

export function CategoryPageTemplate({
  category,
  editorialNote,
  visualFocus = false,
}: CategoryPageTemplateProps) {
  const articles = getPostsByCategory(category.slug);
  const featured = articles.filter((article) => article.featured);
  const featuredLead = featured[0] ?? articles[0] ?? null;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: category.name },
  ];

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: category.name, path: category.href },
        ])}
      />

      {/* Category Hero */}
      <section className="border-b border-border-subtle bg-ivory-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
                {category.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-4xl font-normal leading-tight text-dark-ink sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-3 font-serif text-xl italic text-warm-brown">
                {category.headline}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-dark-ink/80">
                {category.description}
              </p>

              {/* Topic Themes */}
              <div className="mt-7 flex flex-wrap gap-2">
                {category.themes.map((theme) => (
                  <Link
                    key={theme}
                    href={`/search?q=${encodeURIComponent(theme.split(" ")[0])}&category=${category.slug}`}
                    className="border border-blush bg-white px-3.5 py-1.5 text-xs text-warm-brown transition-colors hover:border-warm-brown hover:bg-blush/35"
                  >
                    {theme}
                  </Link>
                ))}
              </div>

              {editorialNote ? (
                <p className="mt-6 border-l-2 border-rose pl-4 text-xs leading-relaxed text-dark-ink/75">
                  {editorialNote}
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[2/3] max-w-sm overflow-hidden border border-border-subtle bg-white">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 384px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight */}
      {featuredLead ? (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured Story"
              title={`Spotlight in ${category.name}`}
              actionLabel="Browse Full Journal"
              actionHref="/blog"
            />

            <div className="mt-8 grid grid-cols-1 overflow-hidden border border-border-subtle bg-white lg:grid-cols-12">
              <Link
                href={`/blog/${featuredLead.slug}`}
                className="relative aspect-[2/3] max-h-[540px] w-full overflow-hidden bg-ivory-soft lg:col-span-5"
              >
                <Image
                  src={featuredLead.featuredImage}
                  alt={featuredLead.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-7 lg:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose">
                  {category.name} · {featuredLead.readingTime}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-normal text-dark-ink sm:text-4xl">
                  <Link
                    href={`/blog/${featuredLead.slug}`}
                    className="transition-colors hover:text-warm-brown"
                  >
                    {featuredLead.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-dark-ink/78">
                  {featuredLead.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredLead.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border-subtle bg-ivory-soft px-3 py-1 text-[11px] text-dark-ink/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href={`/blog/${featuredLead.slug}`}
                    className="inline-flex items-center border border-dark-ink bg-dark-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
                  >
                    Read Full Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Pinterest Visual Grid for Visual-First Categories (Nail Art) */}
      {visualFocus && articles.length > 0 ? (
        <section className="border-y border-border-subtle bg-blush/25 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pinterest-Ready Visuals"
              title="Visual Manicure Gallery"
              description="Vertical 2:3 reference frames designed for quick saving to your manicure inspiration boards."
            />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={`visual-${article.slug}`}
                  href={`/blog/${article.slug}`}
                  className="group relative aspect-[2/3] overflow-hidden border border-border-subtle bg-white"
                >
                  <Image
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-ink/80 via-dark-ink/35 to-transparent p-4 text-ivory">
                    <p className="font-serif text-base sm:text-lg">
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* All Category Articles */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${articles.length} ${articles.length === 1 ? "Article" : "Articles"}`}
            title={`Latest in ${category.name}`}
          />
          <div className="mt-10">
            <CategoryArchiveClient articles={articles} />
          </div>
        </div>
      </section>
    </div>
  );
}
