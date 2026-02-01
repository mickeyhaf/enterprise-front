"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import type { AuthUser } from "@/lib/api-client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api
      .getMe()
      .then((res) => {
        const { role } = res.user;
        if (role !== "ADMIN" && role !== "NEWS_MANAGER") {
          router.replace("/login");
          return;
        }
        setUser(res.user);
      })
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Suspense
        fallback={
          <aside className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse hidden lg:block" />
        }
      >
        <AdminSidebar
          user={user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </Suspense>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Suspense fallback={<div className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" />}>
          <AdminHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
        </Suspense>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Suspense fallback={<div className="animate-pulse text-slate-500">Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
