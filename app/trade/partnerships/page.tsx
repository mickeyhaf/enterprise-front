"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Handshake, ArrowRight, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QuoteModal } from "@/components/services/QuoteModal";

export default function PartnershipsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const partnershipTypes = [
    "Corporate Partnership",
    "Academic Collaboration",
    "Joint Venture",
    "Technology Partnership"
  ];

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
              Strategic Alliances
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              Partnerships & <span className="text-accent italic">Collaborations</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              Building strong networks for mutual growth. We foster strategic partnerships with global leaders, local enterprises, and academic institutions.
            </p>
          </div>
        </div>
      </header>

      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader
                title="Join Our Network"
                description="At MU Consultancy, we believe in the power of collaboration. Our partnership programs are designed to create synergies that drive innovation and expand market reach."
                className="mb-10"
              />
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                Whether you are a technology provider, a manufacturing entity, or a service organization, partnering with us opens doors to new opportunities in Ethiopia and beyond.
              </p>
              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all text-base"
                onClick={() => setIsModalOpen(true)}
              >
                Become a Strategic Partner <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-4 text-slate-900 dark:text-white leading-tight">Corporate Partners</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">Joint ventures and business alliances for large-scale projects.</p>
              </div>
              <div className="p-10 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-4 text-slate-900 dark:text-white leading-tight">Academic Links</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">Research collaboration and knowledge transfer with Mekelle University.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName="Partnership Inquiry"
        itemType="service"
        interestOptions={partnershipTypes}
      />

      <Footer />
    </PageShell>
  );
}
