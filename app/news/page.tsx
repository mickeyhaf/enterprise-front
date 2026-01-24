import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";

export default function NewsPage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">News & Insights</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Latest updates, industry trends, and company announcements.
           </p>
        </div>
      </div>
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-slate-500">No news articles available at the moment.</p>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
