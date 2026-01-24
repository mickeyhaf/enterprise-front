import { Trophy, Calendar, Briefcase, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const stats = [
  { icon: Calendar, value: "30+", label: "Years of Excellence" },
  { icon: Briefcase, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "1000+", label: "Professionals Engaged" },
  { icon: Trophy, value: "15+", label: "Industry Awards" },
];

const awards = [
  {
    year: "2024",
    title: "Excellence in Innovation",
    issuer: "Regional Chamber of Commerce",
    description: "Awarded for the development of sustainable agricultural processing technologies.",
  },
  {
    year: "2023",
    title: "Best Consultancy Firm",
    issuer: "Construction & Engineering Association",
    description: "Recognized for outstanding project management in infrastructure development.",
  },
  {
    year: "2021",
    title: "Community Impact Award",
    issuer: "Mekelle City Administration",
    description: "Honored for creating significant employment opportunities for university graduates.",
  },
];

export function Achievements() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <SectionHeader
            title="Awards & Milestones"
            description="A legacy of success built on dedication and quality."
            centered
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
           {/* Stats Section */}
           <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-primary w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Awards Section */}
          <div className="space-y-8">
             <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Recent Recognition</h3>
             <div className="space-y-6">
                {awards.map((award, index) => (
                  <div key={index} className="flex gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent-foreground font-bold text-xl font-display group-hover:bg-accent group-hover:text-white transition-colors">
                      {award.year}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{award.title}</h4>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{award.issuer}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{award.description}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
