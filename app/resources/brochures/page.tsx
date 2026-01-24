import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Download, FileText, Presentation, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BrochuresPage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
              alt="Brochures and marketing materials"
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
               <Presentation size={16} />
               Marketing Materials
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Company <span className="text-accent italic">Brochures</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Download detailed guides about our services, product specifications, and corporate capabilities.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Available Downloads" 
             description="Get the information you need in a convenient format."
             centered
             className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "General Company Profile",
              "Engineering Services Catalog",
              "Import/Export Guidelines",
              "Construction Products Spec Sheet",
              "Agricultural Inputs Overview"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-lg text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item}</h3>
                  <p className="text-xs text-slate-500 mb-4">PDF • 2.4 MB • Updated Jan 2026</p>
                  <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-primary group-hover:text-primary">
                    Download <Download size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center items-center gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="icon" className="w-10 h-10 bg-primary text-white hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 hover:bg-primary hover:text-white transition-colors">
              2
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 hover:bg-primary hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
