"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import type { ResourceItem } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/admin/FileUpload";

const CATEGORIES = ["brochures", "whitepapers", "case-studies", "reports"];

export default function AdminResourcesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "brochures", fileUrl: "", fileSize: "" });
  const queryClient = useQueryClient();
  const { data: resources, isLoading } = useQuery({
    queryKey: ["admin", "resources"],
    queryFn: () => api.adminResources.list(),
  });
  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.adminResources.create(body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "resources"] }); resetForm(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) => api.adminResources.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "resources"] }); resetForm(); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminResources.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "resources"] }),
  });

  function resetForm() {
    setForm({ title: "", description: "", category: "brochures", fileUrl: "", fileSize: "" });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(r: ResourceItem) {
    setEditing(r);
    setForm({
      title: r.title,
      description: r.description ?? "",
      category: r.category,
      fileUrl: r.fileUrl ?? "",
      fileSize: r.fileSize ?? "",
    });
    setIsFormOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = { ...form };
    if (editing) updateMutation.mutate({ id: editing.id, body });
    else createMutation.mutate(body);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Resources</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage downloadable brochures, whitepapers, reports</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2"><Plus className="w-5 h-5" /> Add Resource</Button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "New"} Resource</h2>
          <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div><label className="block text-sm font-medium mb-1">Category</label><select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"><option value="brochures">Brochures</option><option value="whitepapers">Whitepapers</option><option value="case-studies">Case Studies</option><option value="reports">Reports</option></select></div>
          <FileUpload label="File" value={form.fileUrl} onChange={(url) => setForm((f) => ({ ...f, fileUrl: url }))} />
          <div><label className="block text-sm font-medium mb-1">File Size</label><input type="text" value={form.fileSize} onChange={(e) => setForm((f) => ({ ...f, fileSize: e.target.value }))} placeholder="e.g. 2.4 MB" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div className="flex gap-2"><Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{editing ? "Update" : "Create"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
        </form>
      )}
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Category</th><th className="text-right px-6 py-4 font-semibold">Actions</th></tr></thead>
            <tbody>
              {resources?.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium">{r.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{r.category}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon-sm" className="text-red-600" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(r.id); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!resources || resources.length === 0) && <div className="py-12 text-center text-slate-500">No resources yet.</div>}
        </div>
      )}
    </div>
  );
}
