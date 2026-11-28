"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactFormClient() {
  const endpoint = siteConfig.contactFormEndpoint;
  const emailAddress = siteConfig.contactEmail;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) return;

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (!endpoint) {
    return (
      <div className="border border-blush bg-white p-6 sm:p-8">
        <div className="flex items-start gap-3.5">
          <Mail
            className="mt-1 h-5 w-5 shrink-0 text-rose"
            aria-hidden="true"
          />
          <div className="space-y-3 text-sm leading-relaxed text-dark-ink/80">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-brown">
              Contact Configuration Pending
            </p>
            <h2 className="font-serif text-2xl font-normal text-dark-ink">
              Direct Messaging Is Not Yet Connected
            </h2>
            <p>
              To ensure no reader inquiry is ever lost, a live contact form is
              only displayed once a real submission endpoint is configured.
            </p>
            {emailAddress ? (
              <p>
                You may reach the editorial team directly at{" "}
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-medium text-warm-brown underline decoration-rose/70 underline-offset-4"
                >
                  {emailAddress}
                </a>
                .
              </p>
            ) : (
              <p className="border-l-2 border-rose pl-4 text-xs text-dark-ink/75">
                <strong>Site Owner Setup Note:</strong> Set{" "}
                <code className="bg-ivory px-1.5 py-0.5">
                  NEXT_PUBLIC_CONTACT_EMAIL
                </code>{" "}
                and/or{" "}
                <code className="bg-ivory px-1.5 py-0.5">
                  NEXT_PUBLIC_CONTACT_ENDPOINT
                </code>{" "}
                (e.g., Formspree, Web3Forms, or a custom API route) in your
                environment variables to enable live inquiries.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-border-subtle bg-white p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-medium uppercase tracking-[0.16em] text-dark-ink"
        >
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border border-border-subtle bg-ivory-soft px-4 py-3 text-sm text-dark-ink focus:border-warm-brown focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-medium uppercase tracking-[0.16em] text-dark-ink"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border border-border-subtle bg-ivory-soft px-4 py-3 text-sm text-dark-ink focus:border-warm-brown focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium uppercase tracking-[0.16em] text-dark-ink"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full border border-border-subtle bg-ivory-soft px-4 py-3 text-sm text-dark-ink focus:border-warm-brown focus:bg-white focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="border border-dark-ink bg-dark-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-warm-brown hover:bg-warm-brown disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-warm-brown">
          Thank you. Your message has been sent.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-warm-brown">
          Unable to send right now. Please try again shortly.
        </p>
      ) : null}
    </form>
  );
}

