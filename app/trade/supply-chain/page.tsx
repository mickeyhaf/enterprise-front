"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Truck, ArrowRight, Layers, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QuoteModal } from "@/components/services/QuoteModal";

export default function SupplyChainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logisticsServices = [
    "Inventory Management",
    "Timely Distribution",
    "Risk Mitigation",
    "End-to-end Optimization"
  ];

  return (
    <PageShell>
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
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
              Logistics Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              Supply Chain <span className="text-accent italic">Management</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              End-to-end supply chain optimization. We ensure your products move efficiently from origin to destination with complete visibility and control.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Optimized Logistics"
            description="Comprehensive solutions for modern supply chain challenges."
            centered
            className="mb-16"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Layers,
                title: "Inventory Management",
                description: "Real-time tracking and optimization of stock levels to reduce holding costs."
              },
              {
                icon: Clock,
                title: "Timely Distribution",
                description: "Efficient routing and scheduling to ensure on-time delivery commitments."
              },
              {
                icon: ShieldCheck,
                title: "Risk Mitigation",
                description: "Proactive identification and management of supply chain disruptions."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Ready to Optimize Your Logistics?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Let us analyze your current supply chain and propose efficiency improvements that save time and money.
              </p>
              <Button
                size="lg"
                className="bg-accent text-primary font-bold hover:bg-white transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
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
        interestOptions={logisticsServices}
      />

      <Footer />
    </PageShell>
  );
}
