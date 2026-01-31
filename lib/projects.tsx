import { Building2, Leaf, Globe, CheckCircle, type LucideIcon } from "lucide-react";
import { api, type Project as ApiProject } from "./api-client";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Leaf,
  Globe,
  CheckCircle,
};

export type Project = Omit<ApiProject, "icon"> & {
  icon: LucideIcon;
};

function mapProject(p: ApiProject): Project {
  const Icon = ICON_MAP[p.icon] ?? Building2;
  return { ...p, icon: Icon };
}

export async function fetchProjects(): Promise<Project[]> {
  const list = await api.getProjects();
  return list.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const p = await api.getProjectBySlug(slug);
  if (!p) return null;
  return mapProject(p);
}
