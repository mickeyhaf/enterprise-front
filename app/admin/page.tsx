"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Newspaper,
  ShoppingCart,
  FileText,
  Users,
  FolderKanban,
  Package,
  MessageSquare,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api-client";

const STAT_CARDS = [
  { key: "orders", label: "Total Orders", icon: ShoppingCart, href: "/admin/orders" },
  { key: "news", label: "Published News", icon: Newspaper, href: "/admin/news" },
  { key: "resources", label: "Resources", icon: BookOpen, href: "/admin/resources" },
  { key: "team", label: "Team Members", icon: Users, href: "/admin/team" },
];

const QUICK_LINKS = [
  { href: "/admin/content", label: "Content Blocks", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/engagement", label: "Community", icon: MessageSquare },
];

export default function AdminDashboardPage() {
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.getMe(),
  });
  const isAdmin = me?.user?.role === "ADMIN";

  const { data: newsCount } = useQuery({
    queryKey: ["admin", "news", "count"],
    queryFn: () => api.adminNews.list(),
    select: (list) => list.length,
  });

  const { data: ordersCount } = useQuery({
    queryKey: ["admin", "orders", "count"],
    queryFn: () => api.adminOrders.list(),
    select: (list) => list.length,
    enabled: isAdmin,
  });

  const { data: resourcesCount } = useQuery({
    queryKey: ["admin", "resources", "count"],
    queryFn: () => api.adminResources.list(),
    select: (list) => list.length,
    enabled: isAdmin,
  });

  const { data: teamCount } = useQuery({
    queryKey: ["admin", "team", "count"],
    queryFn: () => api.adminTeam.list(),
    select: (list) => list.length,
    enabled: isAdmin,
  });

  const counts: Record<string, number | undefined> = {
    news: newsCount,
    orders: ordersCount,
    resources: resourcesCount,
    team: teamCount,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Overview of content and activities across all sections.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const count = counts[card.key];
          return (
            <Link key={card.key} href={card.href}>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {card.label}
                  </span>
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {count ?? "—"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links section */}
      {isAdmin && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {link.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Recent activity placeholder */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          Recent Activity
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Latest activities across all entities.
        </p>
        <div className="text-center py-8 text-slate-400">
          Activity feed coming soon...
        </div>
      </div>
    </div>
  );
}
