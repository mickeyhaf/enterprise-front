import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResourceList } from "@/components/resources/ResourceList";
import { Presentation } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/api-client";

export default async function BrochuresPage() {
  let items: Awaited<ReturnType<typeof api.getResources>> = [];
  try {
    items = await api.getResources("brochures");
  } catch {
    // show empty state if API unavailable
  }

  return (
    <PageShell>
      <Navbar />
      
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
              alt="Brochures and marketing materials"
              fill
              className="object-cover grayscale-[20%]"
              priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
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
          <ResourceList items={items} layout="grid" emptyMessage="No brochures available yet." />
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
