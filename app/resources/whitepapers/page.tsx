import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResourceList } from "@/components/resources/ResourceList";
import { FileText } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/api-client";

export default async function WhitepapersPage() {
  let items: Awaited<ReturnType<typeof api.getResources>> = [];
  try {
    items = await api.getResources("whitepapers");
  } catch {
    // show empty state if API unavailable
  }

  return (
    <PageShell>
      <Navbar />
      
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
              alt="Technical research documents"
              fill
              className="object-cover grayscale-[20%]"
              priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
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
          <ResourceList items={items} layout="list" emptyMessage="No whitepapers available yet." />
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
