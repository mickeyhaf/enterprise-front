"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/lib/icon-map";
import type { ResourcesCategoryItem } from "@/lib/api-client";

const DEFAULT_CATEGORIES: ResourcesCategoryItem[] = [
  { title: "Brochures", description: "Download our latest corporate brochures and service catalogs.", icon: "Presentation", link: "/resources/brochures" },
  { title: "Whitepapers", description: "In-depth analysis and technical reports on industry trends.", icon: "FileText", link: "/resources/whitepapers" },
  { title: "Case Studies", description: "Real-world examples of our successful projects and solutions.", icon: "BookOpen", link: "/resources/case-studies" },
  { title: "Annual Reports", description: "Financial performance and impact reports from previous years.", icon: "FileBarChart", link: "/resources/reports" },
];

export function ResourcesCategories() {
  const items = DEFAULT_CATEGORIES;

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Explore Categories"
          description="Find the documents and insights you need."
          centered
          className="mb-16"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((resource, index) => {
            const Icon = getIcon(resource.icon);
            return (
              <div
                key={index}
                className="group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">
                  {resource.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm flex-grow">
                  {resource.description}
                </p>
                <Link href={resource.link}>
                  <Button
                    variant="outline"
                    className="font-bold border-slate-300 dark:border-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                  >
                    View {resource.title} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
