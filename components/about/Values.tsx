import { Heart, Lightbulb, Award, Users, Leaf, Target } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We uphold the highest standards of honesty and ethical behavior in all our dealings.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly seek creative solutions to complex challenges.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for superior quality in every project and service we deliver.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and strategic partnerships.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We are committed to environmentally responsible and sustainable practices.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Our clients' success is our top priority and drives everything we do.",
  },
];

export function Values() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Core Values"
          description="The principles that guide our decisions and actions every day."
          centered
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
