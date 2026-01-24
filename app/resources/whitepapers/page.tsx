import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WhitepapersPage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
              alt="Technical research documents"
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
               <FileText size={16} />
               Technical Insights
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Industry <span className="text-accent italic">Whitepapers</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Deep dives into technical challenges, market analysis, and innovative solutions for the modern enterprise.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Research & Analysis" 
             description="Expert knowledge shared for your benefit."
             centered
             className="mb-16"
          />
          
          <div className="grid gap-8">
            {[
              {
                title: "Sustainable Urban Development in East Africa",
                desc: "Analyzing the impact of green infrastructure on rapidly growing cities.",
                date: "Dec 2025"
              },
              {
                title: "Optimizing Supply Chains for Landlocked Nations",
                desc: "Strategies for efficient logistics and trade facilitation in Ethiopia.",
                date: "Oct 2025"
              },
              {
                title: "The Future of Agro-Processing Technology",
                desc: "Emerging trends in machinery and value addition for agricultural products.",
                date: "Aug 2025"
              }
            ].map((paper, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all items-center">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Whitepaper</span>
                    <span className="text-xs text-slate-500">{paper.date}</span>
                  </div>
                  <h3 className="font-bold text-2xl mb-2 text-slate-900 dark:text-white">{paper.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {paper.desc}
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <Button className="w-full font-bold">
                    Download PDF <Download size={16} className="ml-2" />
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
