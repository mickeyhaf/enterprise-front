import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container, Globe, Truck } from "lucide-react";

export default function TradePage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Trade & Business Solutions</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Facilitating global commerce through efficient trade solutions.
           </p>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid gap-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-accent/10 rounded-full text-accent-foreground">
                    <Globe size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-4">Import / Export Services</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      We handle the complexities of international trade, ensuring compliance with regulations and smooth customs clearance. Our network spans across major global markets.
                    </p>
                  </div>
              </div>

               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <Truck size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-4">Supply Chain Management</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      Optimizing logistics to ensure timely delivery of goods. We offer warehousing, inventory management, and distribution services tailored to your needs.
                    </p>
                  </div>
              </div>

               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-green-100 rounded-full text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <Container size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-4">Partnerships & Collaborations</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      We foster strategic alliances to expand market reach and enhance service delivery. Join our network of trusted partners.
                    </p>
                  </div>
              </div>
           </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
