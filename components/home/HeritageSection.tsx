"use client";

import { ServiceCard } from "@/components/home/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useContent } from "@/lib/use-content";
import { getIcon } from "@/lib/icon-map";
import type { HomeHeritage } from "@/lib/api-client";
import Image from "next/image";

const DEFAULT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw";

const DEFAULT_HERITAGE: HomeHeritage = {
  sectionTitle: "Our Heritage & Strategic Vision",
  sectionDescription:
    "MU Consultancy and Business Enterprise was established to leverage the vast intellectual resources of Mekelle University for national development. For over three decades, we have been at the forefront of engineering, environmental science, and business strategy in the Horn of Africa.",
  mission: {
    title: "Our Mission",
    description:
      "To provide world-class consultancy and trade solutions that drive innovation and sustainable development across regional industries.",
    icon: "Rocket",
  },
  vision: {
    title: "Our Vision",
    description:
      "To be the preferred strategic partner for private and public enterprises seeking data-driven excellence and engineering precision.",
    icon: "Eye",
  },
  image: DEFAULT_IMAGE,
  badge: { value: "30+", label: "Years of Expertise" },
};

export function HeritageSection() {
  const { data: content } = useContent<HomeHeritage>("home_heritage");
  const c = content ?? DEFAULT_HERITAGE;

  const MissionIcon = getIcon(c.mission?.icon ?? "Rocket");
  const VisionIcon = getIcon(c.vision?.icon ?? "Eye");

  return (
    <section className="py-32 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeader title={c.sectionTitle} description={c.sectionDescription} />
            <div className="grid gap-8">
              <ServiceCard
                variant="primary"
                icon={MissionIcon}
                title={c.mission?.title ?? "Our Mission"}
                description={c.mission?.description ?? ""}
              />
              <ServiceCard
                variant="accent"
                icon={VisionIcon}
                title={c.vision?.title ?? "Our Vision"}
                description={c.vision?.description ?? ""}
              />
            </div>
          </div>
          <div className="relative overflow-hidden lg:overflow-visible">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image src={c.image ?? DEFAULT_IMAGE} alt="Team meeting" fill className="object-cover" />
            </div>
            {c.badge && (
              <div className="absolute -bottom-8 -left-8 bg-primary text-white p-10 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="text-5xl font-bold mb-1 font-display">{c.badge.value}</div>
                <div className="text-sm font-bold opacity-90 uppercase tracking-widest">{c.badge.label}</div>
              </div>
            )}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
