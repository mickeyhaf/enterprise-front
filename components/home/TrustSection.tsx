"use client";

import { TrustBadge } from "@/components/home/TrustBadge";
import { useContent } from "@/lib/use-content";
import { getIcon } from "@/lib/icon-map";
import type { HomeTrust } from "@/lib/api-client";

const DEFAULT_TRUST: HomeTrust = {
  title: "Trust & Quality",
  description:
    "Our commitment to international standards and professional ethics is recognized globally.",
  badges: [
    { icon: "ShieldCheck", label: "Standard", value: "ISO 9001:2015" },
    { icon: "Award", label: "Excellence", value: "National Trade Award" },
    { icon: "Leaf", label: "Compliance", value: "Green Certification" },
    { icon: "Medal", label: "Recognized", value: "Top Consultant 2023" },
  ],
};

export function TrustSection() {
  const { data: content } = useContent<HomeTrust>("home_trust");
  const c = content ?? DEFAULT_TRUST;
  const badges = c.badges?.length ? c.badges : DEFAULT_TRUST.badges;

  return (
    <section className="py-32 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 items-center gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-6">
              {c.title ?? DEFAULT_TRUST.title}
            </h2>
            <p className="text-slate-500 font-light leading-relaxed">
              {c.description ?? DEFAULT_TRUST.description}
            </p>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge, index) => {
                const Icon = getIcon(badge.icon);
                return (
                  <TrustBadge
                    key={index}
                    icon={Icon}
                    label={badge.label}
                    value={badge.value}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
