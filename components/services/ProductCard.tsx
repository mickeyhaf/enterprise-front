"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  onRequestQuote: (title: string) => void;
}

export function ProductCard({ title, description, image, href, onRequestQuote }: ProductCardProps) {
  const router = useRouter();
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") router.push(href);
      }}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:-translate-y-1"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed font-light">
          {description}
        </p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRequestQuote(title);
          }}
          className="w-full h-12 rounded-xl font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all justify-between px-6"
        >
          Request Quote <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
