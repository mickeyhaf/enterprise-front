"use client";

import { Building2, Briefcase, Calculator, Microscope, Scale, Users, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useContent } from "@/lib/use-content";
import type { OrgStructureContent } from "@/lib/api-client";

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  Calculator,
  Microscope,
  Scale,
  Users,
};

const DEFAULT_ORG: OrgStructureContent = {
  title: "Organization Structure",
  description: "A robust framework designed to deliver excellence across all our operations.",
  departments: [
    { icon: "Briefcase", name: "Consultancy Wing", description: "Expert advisory services for engineering, environment, and management projects." },
    { icon: "Building2", name: "Business Development", description: "Driving growth through strategic partnerships and market expansion." },
    { icon: "Calculator", name: "Finance & Admin", description: "Ensuring fiscal responsibility and operational efficiency." },
    { icon: "Microscope", name: "Research & Innovation", description: "Developing cutting-edge solutions and university-industry linkages." },
    { icon: "Scale", name: "Legal & Compliance", description: "Upholding regulatory standards and corporate governance." },
    { icon: "Users", name: "Human Resources", description: "Nurturing talent and fostering a productive work culture." },
  ],
  hierarchy: [
    { label: "Board of Directors" },
    { label: "Managing Director" },
    { label: "Deputy Directors & Managers" },
  ],
};

export function OrgStructure() {
  const { data: content } = useContent<OrgStructureContent>("org_structure");
  const { title, description, departments, hierarchy } = content ?? DEFAULT_ORG;
  const deptList = departments ?? DEFAULT_ORG.departments;
  const hierarchyList = hierarchy ?? DEFAULT_ORG.hierarchy ?? [];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader title={title} description={description} />
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Our organizational structure is built to ensure agility, accountability, and seamless collaboration between our various divisions.
              Overseen by the Board of Directors and led by the Managing Director, our teams work in unison to achieve our strategic goals.
            </p>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-display font-bold text-xl mb-4 text-slate-900 dark:text-white">Leadership Hierarchy</h4>
              <ul className="space-y-4">
                {hierarchyList.map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-primary/70" : "bg-primary/40"}`}></div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {deptList.map((dept, index) => {
              const Icon = ICON_MAP[dept.icon] ?? Briefcase;
              return (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors">
                  <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{dept.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{dept.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
