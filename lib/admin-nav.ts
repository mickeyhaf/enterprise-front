import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Newspaper,
  ShoppingCart,
  Home,
  Users,
  Briefcase,
  FolderKanban,
  Package,
  MessageSquare,
  BookOpen,
  Truck,
  Mail,
  Download,
  PanelTop,
  Scale,
} from "lucide-react";
import { getGroupedBlockSchemas } from "./content-block-schemas";

export interface AdminNavItem {
  type: "link" | "content-block";
  label: string;
  href?: string;
  blockKey?: string;
}

export interface AdminNavSection {
  id: string;
  label: string;
  icon: LucideIcon;
  items: AdminNavItem[];
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  Main: LayoutDashboard,
  "Home Page": Home,
  "About Page": Users,
  "Services Page": Briefcase,
  "Portfolio Page": FolderKanban,
  "Resources Page": BookOpen,
  "Trade Pages": Truck,
  "Contact Page": Mail,
  "Downloads Page": Download,
  "Header and Footer": PanelTop,
  "Legal Pages": Scale,
};

const CRUD_ITEMS: Record<string, AdminNavItem[]> = {
  "About Page": [
    { type: "link", label: "Team", href: "/admin/team" },
  ],
  "Services Page": [
    { type: "link", label: "Products", href: "/admin/products" },
  ],
  "Portfolio Page": [
    { type: "link", label: "Projects", href: "/admin/projects" },
    { type: "link", label: "Community", href: "/admin/engagement" },
  ],
  "Resources Page": [
    { type: "link", label: "Resources", href: "/admin/resources" },
  ],
};

function buildAdminNavSections(): AdminNavSection[] {
  const grouped = getGroupedBlockSchemas();
  const sections: AdminNavSection[] = [];

  const mainItems: AdminNavItem[] = [
    { type: "link", label: "Dashboard", href: "/admin" },
    { type: "link", label: "News", href: "/admin/news" },
    { type: "link", label: "Quote Requests", href: "/admin/orders" },
  ];

  sections.push({
    id: "main",
    label: "Main",
    icon: LayoutDashboard,
    items: mainItems,
  });

  const pageCategories = [
    "Home Page",
    "About Page",
    "Services Page",
    "Portfolio Page",
    "Resources Page",
    "Trade Pages",
    "Contact Page",
    "Downloads Page",
    "Header and Footer",
    "Legal Pages",
  ] as const;

  for (const category of pageCategories) {
    const blocks = grouped[category] ?? [];
    const crud = CRUD_ITEMS[category] ?? [];
    const blockItems: AdminNavItem[] = blocks.map((b) => ({
      type: "content-block" as const,
      label: b.label,
      blockKey: b.key,
    }));
    const items = [...blockItems, ...crud];
    if (items.length === 0) continue;

    const icon = SECTION_ICONS[category] ?? LayoutDashboard;
    sections.push({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      label: category.replace(" Page", "").replace(" Pages", ""),
      icon,
      items,
    });
  }

  return sections;
}

export const ADMIN_NAV_SECTIONS = buildAdminNavSections();
