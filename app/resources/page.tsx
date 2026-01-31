"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { ResourcesCategories } from "@/components/resources/ResourcesCategories";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/lib/use-content";
import type { ResourcesHeroContent } from "@/lib/api-client";

const DEFAULT_RESOURCES_HERO: ResourcesHeroContent = {
  badge: "Knowledge Hub",
  title: "Our Resources",
  description: "Access a wealth of information including company brochures, technical whitepapers, case studies, and annual reports.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm",
};

export default function ResourcesPage() {
  const { data: heroContent } = useContent<ResourcesHeroContent>("resources_hero");
  const hero = heroContent ?? DEFAULT_RESOURCES_HERO;

  return (
    <PageShell>
      <Navbar />
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={hero.image ?? DEFAULT_RESOURCES_HERO.image}
            alt="Resources library"
            fill
            className="object-cover grayscale-[20%]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <BookOpen size={16} />
              {hero.badge ?? DEFAULT_RESOURCES_HERO.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              {((): React.ReactNode => {
                const t = hero.title ?? DEFAULT_RESOURCES_HERO.title;
                const parts = t.split("Resources");
                return parts.length === 2 ? (
                  <>
                    {parts[0]}
                    <span className="text-accent italic">Resources</span>
                    {parts[1]}
                  </>
                ) : (
                  t
                );
              })()}
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              {hero.description ?? DEFAULT_RESOURCES_HERO.description}
            </p>
          </div>
        </div>
      </header>
      <ResourcesCategories />
      <Footer />
    </PageShell>
  );
}
