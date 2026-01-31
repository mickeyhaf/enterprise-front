"use client";

import { ShieldCheck, Sparkles, Medal, Handshake, Leaf, UserCheck, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useContent } from "@/lib/use-content";
import type { ValuesContent } from "@/lib/api-client";

const ICONS: LucideIcon[] = [ShieldCheck, Sparkles, Medal, Handshake, Leaf, UserCheck];

const DEFAULT_VALUES: ValuesContent = {
  title: "Our Core Values",
  description: "The principles that guide our decisions and actions every day.",
  items: [
    { title: "Integrity", description: "We uphold the highest standards of honesty and ethical behavior in all our dealings." },
    { title: "Innovation", description: "We constantly seek creative solutions to complex challenges." },
    { title: "Excellence", description: "We strive for superior quality in every project and service we deliver." },
    { title: "Collaboration", description: "We believe in the power of teamwork and strategic partnerships." },
    { title: "Sustainability", description: "We are committed to environmentally responsible and sustainable practices." },
    { title: "Customer Focus", description: "Our clients' success is our top priority and drives everything we do." },
  ],
};

export function Values() {
  const { data: content } = useContent<ValuesContent>("values");
  const { title, description, items } = content ?? DEFAULT_VALUES;
  const list = items ?? DEFAULT_VALUES.items;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          description={description}
          centered
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((value, index) => {
            const Icon = ICONS[index % ICONS.length];
            const borderColor = index % 2 === 0 ? "border-primary" : "border-accent";
            const iconBg = index % 2 === 0 ? "bg-primary/10" : "bg-accent/15";
            const iconColor = index % 2 === 0 ? "text-primary" : "text-accent";
            return (
              <div
                key={index}
                className={`flex gap-5 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${borderColor} hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-sm shrink-0`}>
                  <Icon className={`${iconColor} w-6 h-6`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
