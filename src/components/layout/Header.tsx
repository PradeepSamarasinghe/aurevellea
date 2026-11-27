"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Close menus/search on route change – safely deferred to avoid inline setState-in-effect warning
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
      setSearchOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      router.push("/search");
    } else {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
    setSearchOpen(false);
  };

  const navLinks = [
    ...CATEGORIES.map((category) => ({
      label: category.name,
      href: category.href,
    })),
    { label: "Journal", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-ivory/95 backdrop-blur-sm">
      {/* Announcement Bar */}
      <div className="border-b border-blush/70 bg-dark-ink px-4 py-2 text-center text-[11px] tracking-[0.14em] text-ivory">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="text-ivory/90">{siteConfig.announcementBar.text}</span>
          <Link
            href={siteConfig.announcementBar.href}
            className="inline-flex items-center gap-1 font-medium uppercase tracking-[0.16em] text-blush underline decoration-rose/70 underline-offset-4 transition-colors hover:text-white"
          >
            <span>{siteConfig.announcementBar.ctaLabel}</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center text-dark-ink transition-colors hover:text-warm-brown"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Brand Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl font-normal tracking-[0.18em] text-dark-ink uppercase transition-colors hover:text-warm-brown sm:text-[1.65rem]"
          aria-label="Aurevellea Home"
        >
          {siteConfig.brandName}
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? "text-warm-brown"
                    : "text-dark-ink/80 hover:text-warm-brown"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-rose"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Search Trigger & About */}
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="hidden text-xs font-medium uppercase tracking-[0.16em] text-dark-ink/75 transition-colors hover:text-warm-brown sm:inline-block"
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-expanded={searchOpen}
            aria-controls="header-search-bar"
            aria-label="Search Aurevellea"
            className="inline-flex h-10 w-10 items-center justify-center border border-transparent text-dark-ink transition-colors hover:border-border-subtle hover:bg-white hover:text-warm-brown"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen ? (
        <div
          id="header-search-bar"
          className="border-t border-border-subtle bg-ivory-soft px-4 py-4 sm:px-6 lg:px-8"
        >
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Site search"
            className="mx-auto flex max-w-3xl items-center gap-3"
          >
            <label htmlFor="header-search-input" className="sr-only">
              Search articles, nail art, outfits, or beauty tips
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-rose"
                aria-hidden="true"
              />
              <input
                id="header-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search outfits, minimal nails, skincare, jewellery..."
                autoFocus
                className="w-full border border-border-subtle bg-white py-2.5 pl-10 pr-4 text-sm text-dark-ink placeholder:text-dark-ink/45 focus:border-warm-brown focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="border border-dark-ink bg-dark-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="inline-flex h-10 w-10 items-center justify-center text-dark-ink/70 hover:text-dark-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="border-t border-border-subtle bg-ivory px-4 py-6 lg:hidden"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between border-b border-border-subtle/60 py-3 text-sm font-medium uppercase tracking-[0.15em] ${
                      isActive ? "text-warm-brown" : "text-dark-ink"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-rose"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/about"
                className="flex items-center justify-between border-b border-border-subtle/60 py-3 text-sm font-medium uppercase tracking-[0.15em] text-dark-ink"
              >
                <span>About</span>
                <ArrowRight className="h-3.5 w-3.5 text-rose" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.15em] text-warm-brown"
              >
                <span>Search Articles</span>
                <Search className="h-4 w-4 text-rose" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
