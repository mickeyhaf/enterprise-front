import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FileBarChart, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ReportsPage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
              alt="Financial reporting analysis"
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
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[2025, 2024, 2023, 2022].map((year) => (
              <div key={year} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                    {year}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Annual Impact Report {year}</h3>
                    <p className="text-sm text-slate-500">Fiscal Year Ending July 7</p>
                  </div>
                </div>
                <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5">
                  Download <Download size={16} className="ml-2" />
                </Button>
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
