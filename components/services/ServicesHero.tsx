"use client";

import Image from "next/image";
import { useContent } from "@/lib/use-content";
import type { ServicesHeroContent } from "@/lib/api-client";

const DEFAULT_SERVICES_HERO: ServicesHeroContent = {
  title: "Our Services & Solutions",
  description: "Providing world-class consultancy, trade, and engineering solutions tailored to your business needs.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm",
};

export function ServicesHero() {
  const { data: content } = useContent<ServicesHeroContent>("services_hero");
  const { title, description, image } = content ?? DEFAULT_SERVICES_HERO;

  const titleParts = (title ?? DEFAULT_SERVICES_HERO.title).split("Services");
  const hasServices = titleParts.length === 2;

  return (
    <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image ?? DEFAULT_SERVICES_HERO.image}
          alt="Engineering and consultancy services"
          fill
          className="object-cover grayscale-[20%]"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
            {hasServices ? (
              <>
                {titleParts[0]}
                <span className="text-accent italic">Services</span>
                {titleParts[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
