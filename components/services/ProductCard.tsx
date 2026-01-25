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
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onRequestQuote(title);
          }}
          variant="secondary"
          className="w-full font-bold group-hover:bg-primary group-hover:text-white transition-colors justify-between"
        >
          Request Quote <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
