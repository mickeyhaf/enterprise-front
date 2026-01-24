import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ServiceOfferingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  onRequestQuote: (title: string) => void;
}

export function ServiceOfferingCard({ title, description, icon: Icon, image, onRequestQuote }: ServiceOfferingCardProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-primary hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {image && (
        <div className="relative h-48 w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-8">
        <div className="mb-6">
          <Icon className="text-primary w-10 h-10" />
        </div>
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={() => onRequestQuote(title)}
          variant="outline"
          className="w-full justify-between hover:bg-primary hover:text-white hover:border-primary transition-all group-hover:shadow-sm font-semibold bg-transparent border-slate-300 dark:border-slate-700"
        >
          Request Service <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
