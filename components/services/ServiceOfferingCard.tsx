import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceOfferingCardProps {
  title: string;
  description: string;
  image?: string;
  onRequestQuote: (title: string) => void;
}

export function ServiceOfferingCard({ title, description, image, onRequestQuote }: ServiceOfferingCardProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden">
      {image && (
        <div className="relative h-60 w-full shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}
      <div className="flex flex-col flex-grow p-10">
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 flex-grow leading-relaxed font-light">
          {description}
        </p>
        <Button
          onClick={() => onRequestQuote(title)}
          className="w-full h-12 rounded-xl font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all justify-between px-6 border border-slate-200 dark:border-slate-700 hover:border-primary"
        >
          Request Service <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
