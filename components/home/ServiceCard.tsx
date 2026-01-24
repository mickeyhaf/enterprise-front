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
    <div className={`flex gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 ${borderColor}`}>
      <Icon className={`${iconColor} w-8 h-8 shrink-0`} />
      <div>
        <h4 className="font-bold text-lg mb-1 font-display">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
