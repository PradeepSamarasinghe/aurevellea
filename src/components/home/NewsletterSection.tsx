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
      className="bg-[linear-gradient(135deg,#fde8e3_0%,#f9cfc9_52%,#f2b3b0_100%)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="inline-block rounded-full border border-white/70 bg-white/60 px-3.5 py-1 text-[11px] font-medium text-mocha backdrop-blur-sm">
          The {siteConfig.brandName} Letter
        </p>
        <h2
          id="newsletter-heading"
          className="mt-4 font-sans text-3xl font-semibold tracking-tight text-cocoa sm:text-4xl"
        >
          Seasonal Style Notes &amp;{" "}
          <span className="font-serif font-medium italic text-mocha">
            Editorial
          </span>{" "}
          Dispatches
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cocoa/80 sm:text-base">
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
              className="flex-1 rounded-lg border border-white/70 bg-white/70 px-4 py-3 text-sm text-cocoa backdrop-blur-sm placeholder:text-cocoa/80 focus:border-cocoa focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg bg-gradient-to-b from-[#6a3222] to-cocoa px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(75,34,24,0.7)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "submitting" ? "Joining..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/70 bg-white/60 px-6 py-5 text-left backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-mocha"
                aria-hidden="true"
              />
              <div className="text-sm leading-relaxed text-cocoa/85">
                <p className="font-medium text-cocoa">
                  Newsletter signups are not yet connected to an email provider.
                </p>
                <p className="mt-1 text-xs text-cocoa/80">
                  To keep reader trust intact, no form submissions are collected
                  until an email service (such as Buttondown, Kit, or Resend) is
                  configured via{" "}
                  <code className="rounded bg-white/70 px-1.5 py-0.5 text-[11px]">
                    NEXT_PUBLIC_NEWSLETTER_ENDPOINT
                  </code>
                  . In the meantime, explore the{" "}
                  <Link
                    href="/blog"
                    className="font-medium text-mocha underline decoration-cocoa/40 underline-offset-4"
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
          <p className="mt-4 text-sm font-medium text-cocoa">
            Thank you for subscribing to {siteConfig.brandName}.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 text-sm text-cocoa">
            We could not process your request right now. Please try again later.
          </p>
        ) : null}
      </div>
    </section>
  );
}