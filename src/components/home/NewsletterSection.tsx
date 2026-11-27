"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function NewsletterSection() {
  const endpoint = siteConfig.newsletterEndpoint;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint || !email.trim()) return;

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-t border-border-subtle bg-blush/35 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-warm-brown">
          The Aurevellea Letter
        </p>
        <h2
          id="newsletter-heading"
          className="mt-3 font-serif text-3xl font-normal text-dark-ink sm:text-4xl"
        >
          Seasonal Style Notes &amp; Editorial Dispatches
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-dark-ink/75 sm:text-base">
          Curated outfit inspiration, minimal manicure edits, and thoughtful
          beauty guides—sent at a calm, unhurried pace.
        </p>

        {endpoint ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 border border-border-subtle bg-white px-4 py-3 text-sm text-dark-ink placeholder:text-dark-ink/45 focus:border-warm-brown focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="border border-dark-ink bg-dark-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown disabled:opacity-60"
            >
              {status === "submitting" ? "Joining..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <div className="mx-auto mt-8 max-w-xl border border-blush bg-white px-6 py-5 text-left">
            <div className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-rose"
                aria-hidden="true"
              />
              <div className="text-sm leading-relaxed text-dark-ink/80">
                <p className="font-medium text-dark-ink">
                  Newsletter signups are not yet connected to an email provider.
                </p>
                <p className="mt-1 text-xs text-dark-ink/65">
                  To keep reader trust intact, no form submissions are collected
                  until an email service (such as Buttondown, Kit, or Resend) is
                  configured via{" "}
                  <code className="bg-ivory px-1.5 py-0.5 text-[11px]">
                    NEXT_PUBLIC_NEWSLETTER_ENDPOINT
                  </code>
                  . In the meantime, explore the{" "}
                  <Link
                    href="/blog"
                    className="font-medium text-warm-brown underline decoration-rose/70 underline-offset-4"
                  >
                    latest articles
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {status === "success" ? (
          <p className="mt-4 text-sm font-medium text-warm-brown">
            Thank you for subscribing to Aurevellea.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 text-sm text-warm-brown">
            We could not process your request right now. Please try again later.
          </p>
        ) : null}
      </div>
    </section>
  );
}

