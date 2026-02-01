"use client";

import { ArrowRight, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/use-content";
import type { HomeHero } from "@/lib/api-client";

const DEFAULT_HERO: HomeHero = {
  badge: "Est. 1993",
  headline: "Pioneering Excellence in Industry.",
  tagline:
    "Mekelle University Consultancy and Business Enterprise serves as the bridge between academic rigor and practical industrial solutions.",
  image: "",
  ctaText: "Contact Us",
  ctaLink: "/contact",
};

export function Hero() {
  const { data: content } = useContent<HomeHero>("home_hero");
  const { badge, headline, tagline, image: heroImage, ctaText, ctaLink } = content ?? DEFAULT_HERO;
  const currentHeadline = headline || DEFAULT_HERO.headline;
  const headlineParts = currentHeadline.split("Excellence");
  const hasExcellence = headlineParts.length === 2;

  return (
    <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"}
          alt="Hero background"
          fill
          className="object-cover grayscale-[20%]"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest">
            <Verified className="w-4 h-4" />
            {badge || DEFAULT_HERO.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] tracking-tight">
            {hasExcellence ? (
              <>
                {headlineParts[0]}
                <span className="text-secondary italic font-serif">Excellence</span>
                {headlineParts[1]}
              </>
            ) : (
              currentHeadline
            )}
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed max-w-2xl">
            {tagline || DEFAULT_HERO.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 group">
              <Link href={ctaLink || "/contact"} className="gap-3">
                {ctaText || "Contact Us"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
