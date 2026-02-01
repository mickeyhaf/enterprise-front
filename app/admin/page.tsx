"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Newspaper, ShoppingCart, FileText, Users, FolderKanban, Package, MessageSquare, BookOpen, ArrowRight } from "lucide-react";
import { api } from "@/lib/api-client";

const ADMIN_CARDS = [
  { href: "/admin/news", label: "News Articles", icon: Newspaper, key: "news" },
  { href: "/admin/orders", label: "Quote Requests", icon: ShoppingCart, key: "orders" },
  { href: "/admin/resources", label: "Resources", icon: BookOpen, key: "resources" },
  { href: "/admin/content", label: "Content Blocks", icon: FileText, key: "content" },
  { href: "/admin/team", label: "Team Members", icon: Users, key: "team" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, key: "projects" },
  { href: "/admin/products", label: "Products", icon: Package, key: "products" },
  { href: "/admin/engagement", label: "Community", icon: MessageSquare, key: "engagement" },
];

const NEWS_CARDS = [
  { href: "/admin/news", label: "News Articles", icon: Newspaper, key: "news" },
];

export default function AdminDashboardPage() {
  const { data: me } = useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });
  const isAdmin = me?.user?.role === "ADMIN";
  const cards = isAdmin ? ADMIN_CARDS : NEWS_CARDS;

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

  const counts: Record<string, number> = {};
  if (newsCount !== undefined) counts.news = newsCount;
  if (ordersCount !== undefined) counts.orders = ordersCount;
  if (resourcesCount !== undefined) counts.resources = resourcesCount;

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Welcome back. Manage your content and requests.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const count = counts[card.key];
          return (
            <Link key={card.href} href={card.href}>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary"><Icon className="w-6 h-6" /></div>
                  {count !== undefined && <span className="text-2xl font-bold text-slate-900 dark:text-white">{count}</span>}
                </div>
                <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">{card.label}</h2>
                <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Manage <ArrowRight className="w-4 h-4" /></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
