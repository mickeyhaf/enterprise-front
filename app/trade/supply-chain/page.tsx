"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QuoteModal } from "@/components/services/QuoteModal";
import { useContent } from "@/lib/use-content";
import { getIcon } from "@/lib/icon-map";
import type { TradeSectionContent, QuoteLabelsContent } from "@/lib/api-client";

const DEFAULT_HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir";

const DEFAULT: TradeSectionContent = {
  hero: { badge: "Logistics Solutions", title: "Supply Chain Management", description: "End-to-end supply chain optimization." },
  section: { title: "Optimized Logistics", description: "Comprehensive solutions for modern supply chain challenges.", items: ["Inventory Management", "Timely Distribution", "Risk Mitigation", "End-to-end Optimization"] },
  services: ["Inventory Management", "Timely Distribution", "Risk Mitigation", "End-to-end Optimization"],
  features: [{ icon: "Layers", title: "Inventory Management", description: "Real-time tracking and optimization of stock levels." }, { icon: "Clock", title: "Timely Distribution", description: "AI-driven efficient routing and scheduling." }, { icon: "ShieldCheck", title: "Risk Mitigation", description: "Proactive identification and expert management of supply chain disruptions." }],
};

export default function SupplyChainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: content } = useContent<TradeSectionContent>("trade_supply_chain");
  const c = content ?? DEFAULT;
  const services = c.services ?? c.section?.items ?? DEFAULT.services ?? [];
  const features = c.features ?? DEFAULT.features ?? [];

  return (
    <PageShell>
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroImage}
            alt="Supply chain warehouse"
            fill
            className="object-cover grayscale-[20%]"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Truck size={16} />
              {c.hero?.badge ?? "Logistics Solutions"}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              {c.hero?.title?.replace(/Management$/, "") ?? "Supply Chain "}
              <span className="text-accent italic">Management</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              {c.hero?.description ?? DEFAULT.hero.description}
            </p>
          </div>
        </div>
      </header>

      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={c.section?.title ?? "Optimized Logistics"}
            description={c.section?.description ?? "Comprehensive solutions for modern supply chain challenges, ensuring seamless operations across the globe."}
            centered
            className="mb-20"
          />

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={i} className="p-10 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-4 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-primary rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-[80px] translate-y-1/2 -track-x-1/2"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-8 leading-tight">{c.cta?.title ?? "Ready to Optimize Your Logistics?"}</h2>
              <p className="text-slate-100 text-lg mb-10 font-light leading-relaxed">
                {c.cta?.description ?? "Let us analyze your current supply chain and propose data-driven efficiency improvements that save time and reduce operational costs."}
              </p>
              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-accent text-primary font-bold hover:bg-white transition-all shadow-lg shadow-accent/10 text-base"
                onClick={() => setIsModalOpen(true)}
              >
                {c.cta?.buttonText ?? quoteLabels?.requestQuote ?? "Analyze My Supply Chain"} <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName="Supply Chain Consultation"
        itemType="service"
        interestOptions={services}
      />

      <Footer />
    </PageShell>
  );
}
