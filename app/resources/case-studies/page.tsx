import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
              alt="Project case study review"
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
               Success Stories
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Project <span className="text-accent italic">Case Studies</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Explore how we have helped clients overcome challenges and achieve their goals through our tailored solutions.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Featured Stories" 
             description="Real results from real projects."
             centered
             className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Industrial Park Efficiency Overhaul",
                client: "Mekelle Industrial Park",
                result: "30% reduction in operational costs",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
              },
              {
                title: "Seed Supply Chain Modernization",
                client: "Tigray Agricultural Bureau",
                result: "Reached 5,000+ new farmers",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
              }
            ].map((study, index) => (
              <div key={index} className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-medium opacity-90 mb-1">{study.client}</p>
                    <h3 className="text-2xl font-bold font-display">{study.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Key Result</h4>
                    <p className="text-xl font-medium text-slate-700 dark:text-slate-300">{study.result}</p>
                  </div>
                  <Button variant="outline" className="w-full justify-between">
                    Read Full Story <ArrowRight size={16} />
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
