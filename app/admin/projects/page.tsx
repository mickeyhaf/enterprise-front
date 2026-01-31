"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function AdminProjectsPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => api.adminProjects.list(),
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">Projects</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Manage portfolio projects</p>
      {isLoading ? <div>Loading...</div> : (
        <div className="rounded-xl border overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Category</th></tr></thead>
            <tbody>
              {projects?.map((p) => <tr key={p.id} className="border-b"><td className="px-6 py-4 font-medium">{p.title}</td><td className="px-6 py-4">{p.category ?? "—"}</td></tr>)}
            </tbody>
          </table>
          {(!projects || projects.length === 0) && <div className="py-12 text-center text-slate-500">No projects.</div>}
        </div>
      )}
    </div>
  );
}
