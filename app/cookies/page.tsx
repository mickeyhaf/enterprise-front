"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Cookie, Info, Settings, ShieldAlert } from "lucide-react";
import { useContent } from "@/lib/use-content";
import type { CookiesPolicyContent } from "@/lib/api-client";

const DEFAULT_COOKIES: CookiesPolicyContent = {
  lastUpdated: "January 25, 2026",
  badge: "Cookie Usage",
  title: "Cookies Policy",
  subtitle: "This policy explains how we use cookies and similar technologies to recognize you when you visit our website.",
  dateLabel: "Policy Date",
  infoRight: "Cookie Management",
  sections: [
    { heading: "1. What are Cookies?", paragraphs: ["Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information."] },
    { heading: "2. Why We Use Cookies", paragraphs: ["We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as \"essential\" or \"strictly necessary\" cookies."] },
    { heading: "", cards: [
      { title: "Essential Cookies", description: "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas." },
      { title: "Analytics & Customization", description: "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are." },
    ]},
    { heading: "3. How Can I Control Cookies?", paragraphs: ["You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information."] },
    { heading: "4. More Information", paragraphs: ["If you would like more information about how we use cookies on our website, please feel free to contact us at:"] },
  ],
  note: { heading: "Note on Disabling Cookies", content: "If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted." },
  contactEmail: "info.consultancy@mu.edu.et",
};

export default function CookiesPolicyPage() {
  const { data: content } = useContent<CookiesPolicyContent>("cookies_policy");
  const c = content ?? DEFAULT_COOKIES;

  return (
    <PageShell>
      <Navbar />

      <header className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Cookie size={14} className="text-accent" />
            {c.badge ?? DEFAULT_COOKIES.badge}
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">{c.title ?? DEFAULT_COOKIES.title}</h1>
          <p className="text-slate-300 font-light max-w-2xl mx-auto">
            {c.subtitle ?? DEFAULT_COOKIES.subtitle}
          </p>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Info className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{c.dateLabel ?? DEFAULT_COOKIES.dateLabel}</div>
                  <div className="font-bold text-slate-900 dark:text-white">{c.lastUpdated ?? DEFAULT_COOKIES.lastUpdated}</div>
                </div>
              </div>
              {c.infoRight && (
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-slate-500">{c.infoRight}</p>
                </div>
              )}
            </div>

            {(c.sections ?? DEFAULT_COOKIES.sections ?? []).map((section, i) => (
              <div key={i}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.cards && section.cards.length > 0 && (
                  <div className="my-16 grid gap-8">
                    {section.cards.map((card, j) => (
                      <div key={j} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        <h3 className="text-xl font-bold flex items-center gap-3 !mt-0">
                          <Settings size={20} className="text-primary" /> {card.title}
                        </h3>
                        <p className="text-base text-slate-500 dark:text-slate-400 font-light !mb-0">{card.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {c.note && (
              <div className="mt-16 p-8 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex gap-6 items-start">
                <ShieldAlert size={24} className="shrink-0 text-amber-500" />
                <div>
                  <h4 className="font-bold !mt-0">{c.note.heading}</h4>
                  <p className="text-base !mb-0">{c.note.content}</p>
                </div>
              </div>
            )}

            {c.contactEmail && (
              <p className="font-bold text-primary mt-8">{c.contactEmail}</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
