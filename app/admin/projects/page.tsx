"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Project } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { IconPicker } from "@/components/admin/IconPicker";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<{
    slug: string; title: string; category: string; image: string; description: string;
    challenge: string; solution: string; impact: string; icon: string;
    location: string; year: string; client: string;
  }>({
    slug: "", title: "", category: "", image: "", description: "",
    challenge: "", solution: "", impact: "", icon: "", location: "", year: "", client: ""
  });
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
    setForm({
      slug: "", title: "", category: "", image: "", description: "",
      challenge: "", solution: "", impact: "", icon: "", location: "", year: "", client: ""
    });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      slug: p.slug, title: p.title, category: p.category ?? "", image: p.image ?? "", description: p.description ?? "",
      challenge: p.challenge ?? "", solution: p.solution ?? "", impact: p.impact ?? "", icon: p.icon ?? "",
      location: p.location ?? "", year: p.year ?? "", client: p.client ?? ""
    });
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <IconPicker label="Icon" value={form.icon} onChange={(iconName) => setForm((f) => ({ ...f, icon: iconName }))} />
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium mb-1">Location</label><input type="text" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Year</label><input type="text" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Client</label><input type="text" value={form.client} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>

          <ImageUpload label="Image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          
          <div><label className="block text-sm font-medium mb-1">Short Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          
          <div className="grid lg:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">The Challenge</label><textarea value={form.challenge} onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))} rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Our Solution</label><textarea value={form.solution} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>

          <div><label className="block text-sm font-medium mb-1">Key Impact Quote</label><textarea value={form.impact} onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value }))} rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
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
