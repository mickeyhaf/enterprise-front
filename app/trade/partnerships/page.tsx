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

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                title="Join Our Network"
                description="At MU Consultancy, we believe in the power of collaboration. Our partnership programs are designed to create synergies that drive innovation and expand market reach."
                className="mb-8"
              />
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Whether you are a technology provider, a manufacturing entity, or a service organization, partnering with us opens doors to new opportunities in Ethiopia and beyond.
              </p>
              <Button
                size="lg"
                className="bg-primary text-white font-bold hover:bg-primary/90"
                onClick={() => setIsModalOpen(true)}
              >
                Become a Partner <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <Building2 className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">Corporate Partners</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Joint ventures and business alliances for large-scale projects.</p>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <Users className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">Academic Links</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Research collaboration and knowledge transfer with Mekelle University.</p>
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
