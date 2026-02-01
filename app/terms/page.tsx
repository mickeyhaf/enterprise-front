"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Scale, ShieldCheck, AlertCircle, FileCheck } from "lucide-react";
import { useContent } from "@/lib/use-content";
import type { TermsOfServiceContent } from "@/lib/api-client";

const DEFAULT_TERMS: TermsOfServiceContent = {
  lastUpdated: "January 25, 2026",
  badge: "Legal Agreement",
  title: "Terms of Service",
  subtitle: "Please read these terms carefully before using our services. By accessing our site, you agree to be bound by these terms.",
  dateLabel: "Review Date",
  infoRight: "Service Agreement",
  sections: [
    { heading: "1. Agreement to Terms", content: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (\"you\") and MU Consultancy & Business Enterprise (\"we,\" \"us,\" or \"our\"), concerning your access to and use of our website and services." },
    { heading: "2. Intellectual Property Rights", content: "Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the \"Content\") are owned or controlled by us." },
    { heading: "3. User Representations", content: "By using the site, you represent and warrant that: All registration information you submit will be true, accurate, current, and complete. You have the legal capacity and you agree to comply with these Terms of Service. You are not a minor in the jurisdiction in which you reside. You will not use the site for any illegal or unauthorized purpose." },
    { heading: "4. Prohibited Activities", content: "You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us." },
    { heading: "5. Service Modifications", content: "We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of our services without notice at any time." },
  ],
  callouts: [
    { heading: "User Responsibility", content: "\"Users are responsible for ensuring that all information provided for consultancy or trade inquiries is accurate, current, and complete.\"", variant: "amber" },
    { heading: "Professional Integrity", content: "MU Consultancy & Business Enterprise adheres to the highest standards of professional and academic ethics as established by Mekelle University.", variant: "primary" },
  ],
};

export default function TermsOfServicePage() {
  const { data: content } = useContent<TermsOfServiceContent>("terms_of_service");
  const c = content ?? DEFAULT_TERMS;

  return (
    <PageShell>
      <Navbar />

      <header className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Scale size={14} className="text-accent" />
            {c.badge ?? DEFAULT_TERMS.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">{c.title ?? DEFAULT_TERMS.title}</h1>
          <p className="text-slate-300 font-light max-w-2xl mx-auto">
            {c.subtitle ?? DEFAULT_TERMS.subtitle}
          </p>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-ul:text-slate-600 dark:prose-ul:text-slate-400">

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileCheck className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{c.dateLabel ?? DEFAULT_TERMS.dateLabel}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{c.lastUpdated ?? DEFAULT_TERMS.lastUpdated}</div>
                </div>
              </div>
              {c.infoRight && (
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-slate-500">{c.infoRight}</p>
                </div>
              )}
            </div>

            {(c.sections ?? DEFAULT_TERMS.sections ?? []).map((section, i) => (
              <div key={i}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.content && <p>{section.content}</p>}
              </div>
            ))}

            {(c.callouts ?? DEFAULT_TERMS.callouts ?? []).map((callout, i) => (
              <div
                key={i}
                className={`mt-16 p-8 rounded-2xl ${
                  callout.variant === "primary"
                    ? "bg-primary text-white"
                    : "bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50"
                }`}
              >
                <h3 className={`!mt-0 flex items-center gap-3 ${
                  callout.variant === "primary" ? "text-white" : "text-amber-700 dark:text-amber-500"
                }`}>
                  {callout.variant === "primary" ? (
                    <ShieldCheck size={24} className="text-accent" />
                  ) : (
                    <AlertCircle size={24} />
                  )}{" "}
                  {callout.heading}
                </h3>
                <p className={callout.variant === "primary" ? "opacity-90 font-light !mb-0" : "italic !mb-0"}>
                  {callout.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
