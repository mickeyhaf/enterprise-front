"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api-client";
import { useContent } from "@/lib/use-content";
import type { ContactSubjectsContent } from "@/lib/api-client";

const DEFAULT_SUBJECTS = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Request for Quote", label: "Request for Quote" },
  { value: "Partnership Proposal", label: "Partnership Proposal" },
  { value: "Careers", label: "Careers" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: subjectsContent } = useContent<ContactSubjectsContent>("contact_subjects");
  const subjectItems = subjectsContent?.items?.length ? subjectsContent.items : DEFAULT_SUBJECTS;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <h2 className="text-3xl font-bold font-display mb-2 text-slate-900 dark:text-white relative z-10">
        Send a Message
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 relative z-10">
          Thank you! Your message has been sent. We&apos;ll get back to you shortly.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 relative z-10">
          {errorMessage}
        </div>
      )}

      <form
        className="space-y-6 relative z-10"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("submitting");
          setErrorMessage("");

          const form = e.currentTarget;
          const formData = new FormData(form);
          const firstName = (formData.get("firstName") as string) ?? "";
          const lastName = (formData.get("lastName") as string) ?? "";
          const email = (formData.get("email") as string) ?? "";
          const subject = (formData.get("subject") as string) ?? "General Inquiry";
          const message = (formData.get("message") as string) ?? "";

          try {
            await api.submitQuote({
              fullName: `${firstName} ${lastName}`.trim(),
              email,
              productServiceInterest: subject,
              additionalDetails: message,
            });
            setStatus("success");
            form.reset();
          } catch (err) {
            setStatus("error");
            setErrorMessage(
              err instanceof Error ? err.message : "Something went wrong. Please try again."
            );
          }
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              disabled={status === "submitting"}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              disabled={status === "submitting"}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            disabled={status === "submitting"}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none disabled:opacity-60"
          >
            {subjectItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={status === "submitting"}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-40 resize-none disabled:opacity-60"
            placeholder="How can we help you today?"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full bg-primary text-white font-bold hover:bg-primary/90 py-6 rounded-xl shadow-lg shadow-primary/20 disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending..."
            : "Send Message"}{" "}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
