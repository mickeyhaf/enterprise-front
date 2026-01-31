"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QuoteModal } from "@/components/services/QuoteModal";
import { useContent } from "@/lib/use-content";
import { getIcon } from "@/lib/icon-map";
import type { TradeSectionContent } from "@/lib/api-client";

const DEFAULT: TradeSectionContent = {
  hero: { badge: "Strategic Alliances", title: "Partnerships & Collaborations", description: "Building lasting relationships with industry leaders." },
  section: { title: "Collaborative Growth", description: "We believe in the power of connection.", items: ["Joint ventures and strategic alliances", "Academic research collaborations", "Technology transfer programs", "Public-Private Partnerships (PPP)"] },
  services: ["Joint ventures and strategic alliances", "Academic research collaborations", "Technology transfer programs", "Public-Private Partnerships (PPP)"],
  features: [{ icon: "Building2", title: "Strategic Alliances", description: "Long-term partnerships with industry leaders." }, { icon: "Users", title: "Academic Collaborations", description: "Bridging academia and industry through research partnerships." }],
};

export default function PartnershipsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: content } = useContent<TradeSectionContent>("trade_partnerships");
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
            alt="Strategic partnership meeting"
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
              <Handshake size={16} />
              {c.hero?.badge ?? "Strategic Alliances"}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              {c.hero?.title?.replace(/Collaborations$/, "") ?? "Partnerships & "}
              <span className="text-accent italic">Collaborations</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              {c.hero?.description ?? DEFAULT.hero.description}
            </p>
          </div>
        </div>
      </header>

      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader
                title={c.section?.title ?? "Join Our Network"}
                description={c.section?.description ?? DEFAULT.section.description}
                className="mb-10"
              />
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                {c.section?.description ?? "Whether you are a technology provider, a manufacturing entity, or a service organization, partnering with us opens doors to new opportunities in Ethiopia and beyond."}
              </p>
              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all text-base"
                onClick={() => setIsModalOpen(true)}
              >
                Become a Partner <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div key={i} className="p-10 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-4 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName="Partnership Inquiry"
        itemType="service"
        interestOptions={services}
      />

      <Footer />
    </PageShell>
  );
}
