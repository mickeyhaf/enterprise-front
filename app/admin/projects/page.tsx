"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Project } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", category: "", image: "", description: "" });
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => api.adminProjects.list(),
  });
  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.adminProjects.create(body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }); resetForm(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) => api.adminProjects.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }); resetForm(); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminProjects.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "projects"] }),
  });

  function resetForm() {
    setForm({ slug: "", title: "", category: "", image: "", description: "" });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({ slug: p.slug, title: p.title, category: p.category ?? "", image: p.image ?? "", description: p.description ?? "" });
    setIsFormOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = { ...form };
    if (editing) updateMutation.mutate({ id: editing.id, body });
    else createMutation.mutate(body);
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage portfolio projects</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2"><Plus className="w-5 h-5" /> Add Project</Button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "New"} Project</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input type="text" required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div className="flex gap-2"><Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{editing ? "Update" : "Create"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
        </form>
      )}
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Category</th><th className="text-right px-6 py-4 font-semibold">Actions</th></tr></thead>
            <tbody>
              {projects?.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium">{p.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{p.category ?? "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon-sm" className="text-red-600" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(p.id); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!projects || projects.length === 0) && <div className="py-12 text-center text-slate-500">No projects yet.</div>}
        </div>
      )}
    </div>
  );
}
