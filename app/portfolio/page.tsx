import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function PortfolioPage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Client Portfolio</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Showcasing our trusted clients and successful projects.
           </p>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Trusted Partners" centered />
          
          <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder logos */}
             <div className="h-20 w-40 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400">Partner 1</div>
             <div className="h-20 w-40 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400">Partner 2</div>
             <div className="h-20 w-40 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400">Partner 3</div>
             <div className="h-20 w-40 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400">Partner 4</div>
             <div className="h-20 w-40 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400">Partner 5</div>
          </div>
        </div>
      </section>

       <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SectionHeader title="Testimonials" centered />
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <TestimonialCard 
               quote="MU Consultancy delivered exceptional results for our infrastructure project. Their expertise is unmatched."
               author="Ato Kebede"
               role="CEO, Construction Corp"
             />
             <TestimonialCard 
               quote="Professional, reliable, and innovative. They truly understand the local market dynamics."
               author="Dr. Sarah Jones"
               role="Director, NGO International"
             />
             <TestimonialCard 
               quote="Their trade solutions streamlined our supply chain significantly. Highly recommended."
               author="Ms. Bethelhem"
               role="Operations Manager, Import/Export Ltd"
             />
           </div>
        </div>
       </section>
      <Footer />
    </PageShell>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{quote}"</p>
      <div>
        <div className="font-bold text-slate-900 dark:text-white">{author}</div>
        <div className="text-sm text-primary">{role}</div>
      </div>
    </div>
  )
}
