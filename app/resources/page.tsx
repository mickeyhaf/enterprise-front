import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FileText, BookOpen, FileBarChart, Presentation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Brochures",
      description: "Download our latest corporate brochures and service catalogs.",
      icon: Presentation,
      link: "/resources/brochures"
    },
    {
      title: "Whitepapers",
      description: "In-depth analysis and technical reports on industry trends.",
      icon: FileText,
      link: "/resources/whitepapers"
    },
    {
      title: "Case Studies",
      description: "Real-world examples of our successful projects and solutions.",
      icon: BookOpen,
      link: "/resources/case-studies"
    },
    {
      title: "Annual Reports",
      description: "Financial performance and impact reports from previous years.",
      icon: FileBarChart,
      link: "/resources/reports"
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
              alt="Resources library"
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
               <BookOpen size={16} />
               Knowledge Hub
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Our <span className="text-accent italic">Resources</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Access a wealth of information including company brochures, technical whitepapers, case studies, and annual reports.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Explore Categories" 
             description="Find the documents and insights you need."
             centered
             className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <resource.icon size={32} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">{resource.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm flex-grow">
                  {resource.description}
                </p>
                <Link href={resource.link}>
                  <Button variant="outline" className="font-bold border-slate-300 dark:border-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    View {resource.title} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
