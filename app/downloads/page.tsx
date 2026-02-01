import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { ResourceList } from "@/components/resources/ResourceList";
import { api } from "@/lib/api-client";
import { fetchContentByKey } from "@/lib/content";
import type { DownloadsHeroContent } from "@/lib/api-client";

const DEFAULT_DOWNLOADS_HERO: DownloadsHeroContent = {
  title: "Downloads & Resources",
  description: "Access brochures, whitepapers, policies, and more.",
};

export default async function DownloadsPage() {
  let items: Awaited<ReturnType<typeof api.getResources>> = [];
  try {
    items = await api.getResources();
  } catch {
    // show empty state if API unavailable
  }

  const heroContent = await fetchContentByKey<DownloadsHeroContent>("downloads_hero");
  const hero = heroContent ?? DEFAULT_DOWNLOADS_HERO;

  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            {hero.title ?? DEFAULT_DOWNLOADS_HERO.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
            {hero.description ?? DEFAULT_DOWNLOADS_HERO.description}
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
