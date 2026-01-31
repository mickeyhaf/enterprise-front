"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamList } from "@/components/about/TeamList";
import { useContent } from "@/lib/use-content";
import type { HomeLeadership } from "@/lib/api-client";

const DEFAULT_LEADERSHIP: HomeLeadership = {
  title: "Leadership Team",
  description:
    "Driven by a diverse board of industry experts and academic leaders dedicated to transformative growth.",
};

export function LeadershipSection() {
  const { data: content } = useContent<HomeLeadership>("home_leadership");
  const c = content ?? DEFAULT_LEADERSHIP;

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={c.title} description={c.description} centered />
        <TeamList />
      </div>
    </section>
  );
}
