import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Factory, Leaf, Building, Microscope } from "lucide-react";
import Image from "next/image";

export default function ExpertisePage() {
  const industries = [
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Supporting industrial growth through machinery sourcing, process optimization, and quality control systems."
    },
    {
      icon: Leaf,
      title: "Agriculture",
      description: "Modernizing farming with advanced inputs, irrigation solutions, and value-chain enhancement."
    },
    {
      icon: Building,
      title: "Construction",
      description: "Providing high-grade materials and engineering consultancy for infrastructure development."
    },
    {
      icon: Microscope,
      title: "Research & Development",
      description: "Leveraging academic insights to solve commercial challenges and drive innovation."
    }
  ];

  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
              alt="Agricultural expertise"
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
               <Factory size={16} />
               Sector Focus
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Industry-Specific <span className="text-accent italic">Expertise</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Deep domain knowledge across key economic sectors. We tailor our solutions to the unique challenges and opportunities of your industry.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Specialized Knowledge"
             description="Tailored solutions for high-impact industries."
             centered
             className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="flex gap-6 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-l-4 border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <industry.icon className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">{industry.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
