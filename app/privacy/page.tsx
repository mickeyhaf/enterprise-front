"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Lock, FileText, Shield } from "lucide-react";
import { useContent } from "@/lib/use-content";
import type { PrivacyPolicyContent } from "@/lib/api-client";

const DEFAULT_PRIVACY: PrivacyPolicyContent = {
  lastUpdated: "January 25, 2026",
  badge: "Data Protection",
  title: "Privacy Policy",
  subtitle: "Your privacy is important to us. This policy outlines how we handle and protect your personal data at MU Consultancy & Business Enterprise.",
  dateLabel: "Effective Date",
  version: "Version 1.0",
  sections: [
    { heading: "1. Introduction", content: "MU Consultancy & Business Enterprise (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services." },
    { heading: "2. Information We Collect", content: "We may collect information about you in a variety of ways. The information we may collect on the site includes:\n\nPersonal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you request services or information.\n\nDerivative Data: Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, and your access times." },
    { heading: "3. Use of Your Information", content: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to: deliver specialized consultancy and trade services; improve our website and service offerings; send you administrative information and service updates; respond to your quote requests and inquiries." },
    { heading: "4. Disclosure of Your Information", content: "We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process. Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf." },
    { heading: "5. Contact Us", content: "If you have questions or comments about this Privacy Policy, please contact us." },
  ],
  contactBlock: {
    companyName: "MU Consultancy & Business Enterprise",
    address: "Main Campus, Mekelle\nTigray, Ethiopia",
    email: "info.consultancy@mu.edu.et",
  },
};

function renderSectionContent(content: string | undefined) {
  if (!content) return null;
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("Personal Data:") || block.startsWith("Derivative Data:") || block.startsWith("By Law") || block.startsWith("Third-Party")) {
      const [label, ...rest] = block.split(":");
      return (
        <ul key={i}>
          <li><strong>{label}:</strong> {rest.join(":").trim()}</li>
        </ul>
      );
    }
    if (block.includes(";")) {
      const items = block.split(";").map((s) => s.trim()).filter(Boolean);
      return (
        <ul key={i}>
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{block}</p>;
  });
}

export default function PrivacyPolicyPage() {
  const { data: content } = useContent<PrivacyPolicyContent>("privacy_policy");
  const c = content ?? DEFAULT_PRIVACY;

  return (
    <PageShell>
      <Navbar />

      <header className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Lock size={14} className="text-accent" />
            {c.badge ?? DEFAULT_PRIVACY.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">{c.title ?? DEFAULT_PRIVACY.title}</h1>
          <p className="text-slate-300 font-light max-w-2xl mx-auto">
            {c.subtitle ?? DEFAULT_PRIVACY.subtitle}
          </p>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-ul:text-slate-600 dark:prose-ul:text-slate-400">

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{c.dateLabel ?? DEFAULT_PRIVACY.dateLabel}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{c.lastUpdated ?? DEFAULT_PRIVACY.lastUpdated}</div>
                </div>
              </div>
              {c.version && (
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-slate-500">{c.version}</p>
                </div>
              )}
            </div>

            <div className="my-16 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl text-primary !mt-0 flex items-center gap-3">
                <Shield size={24} /> Data Security Commitment
              </h3>
              <p className="italic">
                &quot;We implement robust technical and organizational security measures to protect the integrity and confidentiality of your data against unauthorized access, alteration, or destruction.&quot;
              </p>
            </div>

            {(c.sections ?? DEFAULT_PRIVACY.sections ?? []).map((section, i) => (
              <div key={i}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.content && renderSectionContent(section.content)}
              </div>
            ))}

            {c.contactBlock && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mt-8">
                <p className="font-bold text-slate-900 dark:text-white !mb-1">{c.contactBlock.companyName}</p>
                <p className="!mb-1 whitespace-pre-line">{c.contactBlock.address}</p>
                <p className="!mb-4"></p>
                <p className="font-bold text-primary">{c.contactBlock.email}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
