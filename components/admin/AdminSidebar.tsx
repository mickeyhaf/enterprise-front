"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  FileText,
} from "lucide-react";
import type { AuthUser } from "@/lib/api-client";
import { ADMIN_NAV_SECTIONS } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";

const NEWS_MANAGER_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "News", icon: Newspaper },
];

export function AdminSidebar({
  user,
  isOpen,
  onClose,
}: {
  user: AuthUser;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contentBlock = searchParams.get("block");

  const isItemActive = (item: { type: string; href?: string; blockKey?: string }) => {
    if (item.type === "link" && item.href) {
      if (item.href === "/admin") return pathname === "/admin";
      return pathname.startsWith(item.href);
    }
    if (item.type === "content-block" && item.blockKey) {
      return pathname === "/admin/content" && contentBlock === item.blockKey;
    }
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">MU</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                MU Enterprise
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Admin Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {user.role === "ADMIN" ? (
            ADMIN_NAV_SECTIONS.map((section) => (
              <div key={section.id} className="mb-4">
                {/* Section label */}
                <div className="px-4 mb-2">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {section.label}
                  </span>
                </div>
                {/* Section items */}
                <div className="space-y-0.5 px-2">
                  {section.items.map((item) => {
                    const href =
                      item.type === "link"
                        ? item.href
                        : `/admin/content?block=${item.blockKey}`;
                    const active = isItemActive(item);
                    const Icon = item.type === "link" ? section.icon : FileText;
                    return (
                      <Link
                        key={item.type === "link" ? item.href : item.blockKey}
                        href={href ?? "#"}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          active
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="px-2 space-y-0.5">
              {NEWS_MANAGER_NAV.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href!);
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
