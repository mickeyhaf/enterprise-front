import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamList } from "@/components/about/TeamList";
import { Values } from "@/components/about/Values";
import { OrgStructure } from "@/components/about/OrgStructure";
import { Partners } from "@/components/about/Partners";
import { Achievements } from "@/components/about/Achievements";
import { ContactCTA } from "@/components/about/ContactCTA";
import { AboutHero } from "@/components/about/AboutHero";
import { fetchContentByKey } from "@/lib/content";
import type { AboutHistory } from "@/lib/api-client";

const DEFAULT_HISTORY: AboutHistory = {
  paragraphs: [
    "MU Consultancy and Business Enterprise was established in 1993 to leverage the vast intellectual resources of Mekelle University for national development. For over three decades, we have been at the forefront of engineering, environmental science, and business strategy in the Horn of Africa.",
    "We started as a small unit within the university and have grown into a comprehensive enterprise that bridges the gap between academia and industry, turning scientific research into real-world impact.",
  ],
};

export default async function AboutPage() {
  const content = await fetchContentByKey<AboutHistory>("about_history");
  const { paragraphs } = content ?? DEFAULT_HISTORY;
  const list = paragraphs ?? DEFAULT_HISTORY.paragraphs;

  return (
    <PageShell>
      <Navbar />
      <AboutHero />

      <section className="py-32 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionHeader title="Our History" />
            <div className="space-y-6">
              {list.map((p, i) => (
                <p key={i} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Values />
      <OrgStructure />

      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Leadership Team"
            description="Meet the experts leading our organization toward digital transformation and regional excellence."
            centered
          />
          <TeamList />
        </div>
      </section>
      <Partners />
      <Achievements />
      <ContactCTA />
      <Footer />
    </PageShell>
  );
}
