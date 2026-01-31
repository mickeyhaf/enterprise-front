"use client";

import { useContent } from "@/lib/use-content";
import type { PortfolioStats } from "@/lib/api-client";

const DEFAULT_STATS: PortfolioStats = {
  projectsCompleted: "150+",
  yearsExperience: "30+",
  globalPartners: "50+",
  valueGenerated: "2B+",
};

export function PortfolioStatsSection() {
  const { data: content } = useContent<PortfolioStats>("portfolio_stats");
  const stats = content ?? DEFAULT_STATS;

  return (
    <section className="bg-primary text-white py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold font-display mb-2">{stats.projectsCompleted}</div>
            <div className="text-sm opacity-80 uppercase tracking-widest">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-display mb-2">{stats.yearsExperience}</div>
            <div className="text-sm opacity-80 uppercase tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-display mb-2">{stats.globalPartners}</div>
            <div className="text-sm opacity-80 uppercase tracking-widest">Global Partners</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-display mb-2">{stats.valueGenerated}</div>
            <div className="text-sm opacity-80 uppercase tracking-widest">ETB Value Generated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
