import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Article,
  ArticleFrontmatter,
  ArticleSummary,
  CategorySlug,
  TocHeading,
} from "@/types/article";

const POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const rawText = match[2].replace(/[*_`]/g, "").trim();
    const baseId = slugifyHeading(rawText);
    if (!baseId) continue;

    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    headings.push({ id, text: rawText, level });
  }

  return headings;
}

function estimateReadingTime(content: string): {
  readingTime: string;
  wordCount: number;
} {
  const stripped = content
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>\-|[\]()]/g, " ")
    .trim();
  const words = stripped ? stripped.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 210));
  return {
    readingTime: `${minutes} min read`,
    wordCount: words,
  };
}

function parsePostFile(fileName: string): Article {
  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<ArticleFrontmatter>;
  const fallbackSlug = fileName.replace(/\.mdx?$/, "");
  const slug = frontmatter.slug || fallbackSlug;
  const { readingTime, wordCount } = estimateReadingTime(content);

  const summary: ArticleSummary = {
    title: frontmatter.title || "Untitled Article",
    slug,
    category: (frontmatter.category || "fashion") as CategorySlug,
    excerpt: frontmatter.excerpt || "",
    featuredImage:
      frontmatter.featuredImage || "/images/articles/elegant-outfit-ideas.jpg",
    imageAlt:
      frontmatter.imageAlt ||
      frontmatter.title ||
      "Aurevellea editorial photography",
    imageAspect: frontmatter.imageAspect || "portrait",
    author: frontmatter.author || "Aurevellea Editorial Desk",
    publishedAt: frontmatter.publishedAt || "2026-10-01",
    updatedAt: frontmatter.updatedAt,
    readingTime: frontmatter.readingTime || readingTime,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    seoTitle: frontmatter.seoTitle || frontmatter.title || "Aurevellea",
    seoDescription:
      frontmatter.seoDescription || frontmatter.excerpt || "",
    featured: Boolean(frontmatter.featured),
    trending: Boolean(frontmatter.trending),
    hasAffiliateDisclosure: Boolean(frontmatter.hasAffiliateDisclosure),
    draftNotice: frontmatter.draftNotice,
    galleryImages: Array.isArray(frontmatter.galleryImages)
      ? frontmatter.galleryImages
      : undefined,
    wordCount,
  };

  return {
    ...summary,
    content,
    headings: extractHeadings(content),
  };
}

function getAllArticleObjects(): Article[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  return files
    .map(parsePostFile)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

function toSummary(article: Article): ArticleSummary {
  const { content: _content, headings: _headings, ...summary } = article;
  void _content;
  void _headings;
  return summary;
}

export function getAllPosts(): ArticleSummary[] {
  return getAllArticleObjects().map(toSummary);
}

export function getPostBySlug(slug: string): Article | null {
  const articles = getAllArticleObjects();
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getPostsByCategory(category: CategorySlug): ArticleSummary[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(limit = 4): ArticleSummary[] {
  const posts = getAllPosts();
  const featured = posts.filter((post) => post.featured);
  return (featured.length > 0 ? featured : posts).slice(0, limit);
}

export function getTrendingPosts(limit = 4): ArticleSummary[] {
  const posts = getAllPosts();
  const trending = posts.filter((post) => post.trending);
  return (trending.length > 0 ? trending : posts).slice(0, limit);
}

export function getLatestPosts(limit?: number): ArticleSummary[] {
  const posts = getAllPosts();
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export function getRelatedPosts(
  currentSlug: string,
  category: CategorySlug,
  tags: string[] = [],
  limit = 3
): ArticleSummary[] {
  const others = getAllPosts().filter((post) => post.slug !== currentSlug);
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const scored = others.map((post) => {
    let score = 0;
    if (post.category === category) score += 3;
    for (const tag of post.tags) {
      if (tagSet.has(tag.toLowerCase())) score += 2;
    }
    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.post.publishedAt).getTime() -
      new Date(a.post.publishedAt).getTime()
    );
  });

  return scored.slice(0, limit).map((item) => item.post);
}

export function getAdjacentPosts(slug: string): {
  previous: ArticleSummary | null;
  next: ArticleSummary | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function searchPosts(
  query: string,
  category?: CategorySlug | "all"
): ArticleSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  let pool = getAllArticleObjects();

  if (category && category !== "all") {
    pool = pool.filter((article) => article.category === category);
  }

  if (!normalizedQuery) {
    return pool.map(toSummary);
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  const matched = pool
    .map((article) => {
      const title = article.title.toLowerCase();
      const excerpt = article.excerpt.toLowerCase();
      const cat = article.category.toLowerCase();
      const tags = article.tags.join(" ").toLowerCase();
      const body = article.content.toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 6;
        if (tags.includes(term)) score += 4;
        if (cat.includes(term)) score += 3;
        if (excerpt.includes(term)) score += 2;
        if (body.includes(term)) score += 1;
      }

      return { article, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return matched.map((entry) => toSummary(entry.article));
}

export function getAllTags(): string[] {
  const tagMap = new Map<string, string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      if (!tagMap.has(key)) {
        tagMap.set(key, tag);
      }
    }
  }
  return Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));
}

