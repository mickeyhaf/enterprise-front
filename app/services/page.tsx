import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase, Building, Calculator, LineChart } from "lucide-react";

export default function ServicesPage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Products & Services</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Detailed descriptions of our comprehensive offerings.
           </p>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceDetailCard 
              title="Consultancy" 
              icon={Briefcase}
              description="Expert advice on business strategy, operational efficiency, and market expansion."
            />
            <ServiceDetailCard 
              title="Construction & Engineering" 
              icon={Building}
              description="Full-service engineering solutions from design to project management and supervision."
            />
            <ServiceDetailCard 
              title="Financial Services" 
              icon={Calculator}
              description="Auditing, financial planning, and investment advisory services."
            />
             <ServiceDetailCard 
              title="Market Research" 
              icon={LineChart}
              description="Data-driven insights to help you make informed business decisions."
            />
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}

function ServiceDetailCard({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors hover:shadow-lg group">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
