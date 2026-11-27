import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-rose">
          404 · Page Not Found
        </p>
        <h1 className="mt-3 font-serif text-4xl font-normal text-dark-ink sm:text-5xl">
          This Page Has Moved or Does Not Exist
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-dark-ink/75 sm:text-base">
          Explore the latest fashion, nail art, beauty, and lifestyle stories on
          our homepage or search the journal archive.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="border border-dark-ink bg-dark-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
          >
            Return Home
          </Link>
          <Link
            href="/blog"
            className="border border-border-subtle bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-dark-ink transition-colors hover:border-warm-brown hover:text-warm-brown"
          >
            Browse Journal
          </Link>
        </div>
      </div>
    </section>
  );
}

