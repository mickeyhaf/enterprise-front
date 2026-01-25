"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { QuoteModal } from "@/components/services/QuoteModal";

export default function ImportExportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tradeServices = [
    "Customs Clearance & Compliance",
    "Freight Forwarding & Logistics",
    "Market Entry Strategy",
    "Document Processing",
    "Trade Finance Assistance"
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
            alt="Global trade container ship"
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
              <Globe size={16} />
              Global Trade Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              Import & Export <span className="text-accent italic">Services</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              Navigating the complexities of international trade with precision. We connect markets through reliable import and export channels, ensuring compliance and efficiency.
            </p>
          </div>
        </div>
      </header>

      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader
                title="Connecting Global Markets"
                description="Our import/export services are designed to streamline your international business operations. From sourcing high-quality materials to reaching new customer bases abroad, we handle the logistics so you can focus on growth."
                className="mb-10"
              />

              <ul className="space-y-6 mb-12">
                {tradeServices.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-light text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="h-14 px-10 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all text-base"
                onClick={() => setIsModalOpen(true)}
              >
                Request a Quote <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>

            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-200 dark:border-slate-800">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
                alt="Global Logistics"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName="Import/Export Consultation"
        itemType="service"
        interestOptions={tradeServices}
      />

      <Footer />
    </PageShell>
  );
}
