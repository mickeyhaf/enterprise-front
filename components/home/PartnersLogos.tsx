"use client";

import { useContent } from "@/lib/use-content";
import type { PartnerItem } from "@/lib/api-client";
import Image from "next/image";

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: "Mekelle University", description: "", image: "" },
  { name: "Tigray Development Association", description: "", image: "" },
  { name: "Regional Bureau of Trade", description: "", image: "" },
  { name: "Effort Investment Group", description: "", image: "" },
];

export function PartnersLogos() {
  const { data: content } = useContent<{ items?: PartnerItem[] }>("partners");
  const items = content?.items?.length ? content.items : DEFAULT_PARTNERS;

  return (
    <div className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {items.map((partner, index) => (
          <div key={index} className="flex items-center gap-3">
            {partner.image ? (
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <span className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
            )}
            <span className="font-bold tracking-widest text-sm">{partner.name.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
