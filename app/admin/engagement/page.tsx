"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function AdminEngagementPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "engagement"],
    queryFn: () => api.adminEngagement.list(),
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Community Engagement</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Manage community engagement posts (admin)</p>
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Category</th></tr></thead>
            <tbody>
              {posts?.map((p) => <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800"><td className="px-6 py-4 font-medium">{p.title}</td><td className="px-6 py-4">{p.category ?? "—"}</td></tr>)}
            </tbody>
          </table>
          {(!posts || posts.length === 0) && <div className="py-12 text-center text-slate-500">No posts.</div>}
        </div>
      )}
    </div>
  );
}
