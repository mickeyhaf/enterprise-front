"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, ChevronRight, Settings, LogOut } from "lucide-react";
import type { AuthUser } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const BREADCRUMB_MAP: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/news": "News",
  "/admin/orders": "Quote Requests",
  "/admin/content": "Content",
  "/admin/team": "Team",
  "/admin/projects": "Projects",
  "/admin/products": "Products",
  "/admin/engagement": "Community",
  "/admin/resources": "Resources",
};

export function AdminHeader({
  user,
  onMenuClick,
}: {
  user: AuthUser;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const breadcrumbLabel = BREADCRUMB_MAP[pathname] ?? "Overview";
  const initials = user.email?.slice(0, 2).toUpperCase() ?? "AD";

  const handleLogout = async () => {
    const { api } = await import("@/lib/api-client");
    await api.logout();
    window.location.href = "/login";
  };

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
      {/* Left side: hamburger + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/admin"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium">
            {breadcrumbLabel}
          </span>
        </nav>
      </div>

      {/* Right side: user dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg py-2 z-50">
            {/* User info */}
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
              <p className="font-medium text-sm text-slate-900 dark:text-white">
                {user.email?.split("@")[0] ?? "Admin User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Settings className="w-4 h-4" />
                Account settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
