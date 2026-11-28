import React from "react";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/posts";
import {
  AffiliateProductCard,
  EditorialProductGrid,
} from "@/components/affiliate/AffiliateProductCard";
import { ProductComparisonTable } from "@/components/affiliate/ProductComparisonTable";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }
  return "";
}

function EditorialCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-7 border-l-2 border-rose bg-ivory-soft p-5 sm:p-6">
      {title ? (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-brown">
          {title}
        </p>
      ) : null}
      <div className="text-sm leading-relaxed text-dark-ink/85">{children}</div>
    </aside>
  );
}

function EditorialImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden border border-border-subtle bg-ivory-soft">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-xs italic text-dark-ink/75">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

interface MdxRendererProps {
  source: string;
}

export async function MdxRenderer({ source }: MdxRendererProps) {
  const seenIds = new Map<string, number>();

  const nextHeadingId = (children: React.ReactNode) => {
    const base = slugifyHeading(getTextContent(children));
    if (!base) return undefined;
    const count = seenIds.get(base) ?? 0;
    seenIds.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  const components = {
    h2: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 id={nextHeadingId(children)} {...props}>
        {children}
      </h2>
    ),
    h3: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 id={nextHeadingId(children)} {...props}>
        {children}
      </h3>
    ),
    AffiliateProductCard,
    EditorialProductGrid,
    ProductComparisonTable,
    EditorialCallout,
    EditorialImage,
  };

  const { default: MdxContent } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    development: false,
  });

  return (
    <div className="editorial-prose">
      <MdxContent components={components} />
    </div>
  );
}

