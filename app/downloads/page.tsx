import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadsPage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Downloads & Resources</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Access brochures, whitepapers, policies, and more.
           </p>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-6">
              <DownloadItem title="Company Profile 2024" size="2.4 MB" />
              <DownloadItem title="Service Catalog" size="5.1 MB" />
              <DownloadItem title="ISO 9001:2015 Certification" size="1.2 MB" />
              <DownloadItem title="Client Guidelines" size="800 KB" />
           </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}

function DownloadItem({ title, size }: { title: string; size: string }) {
  return (
    <div className="flex items-center justify-between p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
       <div className="flex items-center gap-4">
         <div className="p-3 bg-primary/10 text-primary rounded-lg">
           <FileText size={24} />
         </div>
         <div>
           <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
           <p className="text-xs text-slate-500">{size}</p>
         </div>
       </div>
       <Button variant="outline" size="sm" className="gap-2">
         <Download size={16} />
         Download
       </Button>
    </div>
  )
}
