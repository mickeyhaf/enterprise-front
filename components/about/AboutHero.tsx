"use client";

import Image from "next/image";
import { useContent } from "@/lib/use-content";
import type { AboutHeroContent } from "@/lib/api-client";

const DEFAULT_HERO: AboutHeroContent = {
  title: "About Us",
  description:
    "Learn more about our history, mission, and the dedicated team driving our success in the Horn of Africa.",
};

export function AboutHero() {
  const { data: content } = useContent<AboutHeroContent>("about_hero");
  const c = content ?? DEFAULT_HERO;

  return (
    <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
          alt="Corporate team working together"
          fill
          className="object-cover grayscale-[20%]"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
            {c.title?.replace(/Us$/, "") ?? "About "}
            <span className="text-accent italic">Us</span>
          </h1>
          <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
            {c.description ?? DEFAULT_HERO.description}
          </p>
        </div>
      </div>
    </header>
  );
}
