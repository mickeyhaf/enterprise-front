import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { ResourceList } from "@/components/resources/ResourceList";
import { api } from "@/lib/api-client";

export default async function DownloadsPage() {
  let items: Awaited<ReturnType<typeof api.getResources>> = [];
  try {
    items = await api.getResources();
  } catch {
    // show empty state if API unavailable
  }

  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Downloads & Resources
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
            Access brochures, whitepapers, policies, and more.
          </p>
        </div>
      </div>
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResourceList
            items={items}
            layout="grid"
            emptyMessage="No downloads available yet."
          />
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
