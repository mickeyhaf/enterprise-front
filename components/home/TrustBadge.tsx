import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function TrustBadge({ icon: Icon, label, value }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors text-center group">
      <Icon className="text-4xl text-primary mb-3 w-10 h-10" />
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
      <span className="font-bold text-sm">{value}</span>
    </div>
  );
}
