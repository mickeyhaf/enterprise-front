import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResourceList } from "@/components/resources/ResourceList";
import { FileBarChart } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/api-client";

export default async function ReportsPage() {
  let items: Awaited<ReturnType<typeof api.getResources>> = [];
  try {
    items = await api.getResources("reports");
  } catch {
    // show empty state if API unavailable
  }

  return (
    <PageShell>
      <Navbar />
      
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
              alt="Financial reporting analysis"
              fill
              className="object-cover grayscale-[20%]"
              priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
             <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               <FileBarChart size={16} />
               Transparency & Growth
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Annual <span className="text-accent italic">Reports</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Review our financial performance, strategic milestones, and community impact over the years.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Financial Archive" 
             description="Download reports from previous fiscal years."
             centered
             className="mb-16"
          />
          <ResourceList items={items} layout="list" emptyMessage="No reports available yet." />
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
