import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioStatsSection } from "@/components/portfolio/PortfolioStatsSection";
import { TestimonialsSection } from "@/components/portfolio/TestimonialsSection";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchProjects } from "@/lib/projects";

export default async function PortfolioPage() {
  const projects = await fetchProjects();
  return (
    <PageShell>
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
            alt="Engineering blueprint review"
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
              <BarChart3 size={16} />
              Proven Track Record
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              Our Projects & <span className="text-accent italic">Impact</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              Delivering excellence across industries. From large-scale infrastructure to strategic business solutions, explore how we transform vision into reality.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-accent text-primary px-8 py-6 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 text-base shadow-lg shadow-accent/20">
                  Contact Us <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <PortfolioStatsSection />

      {/* Projects Grid */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            description="A selection of our defining work across various sectors, demonstrating our commitment to excellence."
            centered
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-lg text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2 uppercase tracking-widest text-primary">
                    <project.icon size={12} aria-hidden />
                    {project.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-display mb-4 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed font-light text-base line-clamp-3">
                    {project.description}
                  </p>
                  <Link href={`/portfolio/${project.slug}`} className="w-full">
                    <Button variant="outline" className="w-full justify-between h-12 px-6 font-bold border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-all group/btn rounded-xl shadow-sm">
                      View Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="ghost" className="h-12 px-8 rounded-xl font-bold text-slate-500 hover:text-primary transition-all text-base border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
              Explore More Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Partners Logos */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-12">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-bold font-display text-slate-700 dark:text-slate-300 tracking-wider">WORLD BANK</div>
            <div className="text-xl font-bold font-display text-slate-700 dark:text-slate-300 tracking-wider">UN HABITAT</div>
            <div className="text-xl font-bold font-display text-slate-700 dark:text-slate-300 tracking-wider">GIZ</div>
            <div className="text-xl font-bold font-display text-slate-700 dark:text-slate-300 tracking-wider">MINISTRY OF MINES</div>
            <div className="text-xl font-bold font-display text-slate-700 dark:text-slate-300 tracking-wider">ETHIO TELECOM</div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
