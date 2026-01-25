import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "primary" | "accent";
}

export function ServiceCard({ title, description, icon: Icon, variant }: ServiceCardProps) {
  const borderColor = variant === "primary" ? "border-primary" : "border-accent";
  const iconColor = variant === "primary" ? "text-primary" : "text-accent";

  return (
    <div className={`flex gap-5 p-8 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group border-l-4 ${borderColor}`}>
      <div className={`shrink-0 w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center`}>
        <Icon className={`${iconColor} w-7 h-7`} />
      </div>
      <div>
        <h4 className="font-bold text-xl mb-2 font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
