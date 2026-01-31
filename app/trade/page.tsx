"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Globe, Truck, Handshake, Factory, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { QuoteModal } from "@/components/services/QuoteModal";
import { useContent } from "@/lib/use-content";
import type { TradeMainContent } from "@/lib/api-client";

const DEFAULT_TRADE_MAIN: TradeMainContent = {
  hero: {
    title: "Trade & Business Solutions",
    description: "Connecting your business to global markets through expert import/export services, optimized supply chains, and strategic industry partnerships.",
  },
  sections: [
    { id: "import-export", badge: "Global Reach", title: "Import & Export Services", description: "We simplify the complexities of international trade.", bulletItems: ["Global sourcing and procurement", "Customs clearance and regulatory compliance", "Freight forwarding (Air, Sea, Land)", "Export documentation and trade finance"], link: "/trade/import-export" },
    { id: "supply-chain", badge: "Logistics", title: "Supply Chain Management", description: "Efficiency is the backbone of any successful trade operation.", bulletItems: ["Warehousing and inventory management", "Distribution network optimization", "Last-mile delivery solutions", "Supply chain risk assessment"], link: "/trade/supply-chain" },
    { id: "partnerships", badge: "Collaboration", title: "Partnerships & Collaborations", description: "We believe in the power of connection.", bulletItems: ["Joint ventures and strategic alliances", "Academic research collaborations", "Technology transfer programs", "Public-Private Partnerships (PPP)"], link: "/trade/partnerships" },
    { id: "expertise", badge: "Sectors", title: "Industry-Specific Expertise", description: "Generic solutions don't solve specific problems.", bulletItems: ["Manufacturing and industrial processing", "Agriculture and agro-processing", "Construction and infrastructure", "Research and development projects"], link: "/trade/expertise" },
  ],
};

const SECTION_ICONS = { "import-export": Globe, "supply-chain": Truck, partnerships: Handshake, expertise: Factory };
const SECTION_MODALS = { "import-export": "Import/Export Consultation", "supply-chain": "Supply Chain Analysis", partnerships: "Partnership Inquiry", expertise: "Industry Expert Consultation" };

export default function TradePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Trade Consultation");
  const { data: content } = useContent<TradeMainContent>("trade_main");
  const c = content ?? DEFAULT_TRADE_MAIN;
  const sections = c.sections ?? DEFAULT_TRADE_MAIN.sections;

  const openModal = (sectionId: string) => {
    setSelectedItem(SECTION_MODALS[sectionId as keyof typeof SECTION_MODALS] ?? "Trade Consultation");
    setIsModalOpen(true);
  };

  return (
    <PageShell>
      <Navbar />

      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
            alt="Global trade background"
            fill
            className="object-cover grayscale-[20%]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              {c.hero?.title?.replace(/Solutions$/, "") ?? "Trade & Business "}
              <span className="text-accent italic">Solutions</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              {c.hero?.description ?? DEFAULT_TRADE_MAIN.hero.description}
            </p>
            <Button size="lg" className="h-14 bg-accent text-primary px-10 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-3 text-base w-fit shadow-lg shadow-accent/20" onClick={() => openModal("import-export")}>
              Consult Our Team <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {sections.map((section) => {
        const Icon = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS] ?? Globe;
        const isAlt = section.id === "supply-chain" || section.id === "expertise";
        const isImageLeft = section.id === "import-export" || section.id === "partnerships";
        const badgeClass = section.id === "import-export" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" : section.id === "supply-chain" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300" : section.id === "partnerships" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300";
        const checkClass = section.id === "import-export" ? "text-primary" : section.id === "supply-chain" ? "text-emerald-500" : section.id === "partnerships" ? "text-purple-500" : "text-amber-500";
        return (
          <section key={section.id} id={section.id} className={`py-32 scroll-mt-20 ${isAlt ? "bg-slate-50 dark:bg-slate-950" : "bg-white dark:bg-slate-900/50"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                {isImageLeft && (
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1 border border-slate-200 dark:border-slate-800">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw" alt={section.title} fill className="object-cover" />
                  </div>
                )}
                <div className={isImageLeft ? "order-1 lg:order-2" : ""}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${badgeClass}`}>
                    <Icon className="w-4 h-4" />
                    <span>{section.badge}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">{section.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg font-light">{section.description}</p>
                  <ul className="space-y-4 mb-10">
                    {section.bulletItems?.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <CheckCircle className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${checkClass}`} />
                        <span className="text-slate-700 dark:text-slate-300 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Button className="h-12 px-8 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all" onClick={() => openModal(section.id)}>
                      {section.id === "supply-chain" ? "Analyze My Supply Chain" : section.id === "expertise" ? "Consult an Expert" : section.id === "partnerships" ? "Become a Partner" : "Request a Quote"}
                    </Button>
                    <Link href={section.link}><Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">View Full Details</Button></Link>
                  </div>
                </div>
                {!isImageLeft && (
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir" alt={section.title} fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName={selectedItem}
        itemType="service"
      />

      <Footer />
    </PageShell>
  );
}
