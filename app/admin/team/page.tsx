"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import type { TeamMember } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

export default function AdminTeamPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({ name: "", role: "", description: "", image: "", email: "", linkedin: "" });
  const queryClient = useQueryClient();
  const { data: members, isLoading } = useQuery({
    queryKey: ["admin", "team"],
    queryFn: () => api.adminTeam.list(),
  });
  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.adminTeam.create(body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "team"] }); resetForm(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) => api.adminTeam.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "team"] }); resetForm(); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminTeam.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "team"] }),
  });

  function resetForm() {
    setForm({ name: "", role: "", description: "", image: "", email: "", linkedin: "" });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(m: TeamMember) {
    setEditing(m);
    setForm({ name: m.name, role: m.role ?? "", description: m.description ?? "", image: m.image ?? "", email: m.email ?? "", linkedin: m.linkedin ?? "" });
    setIsFormOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = { ...form, email: form.email || undefined, linkedin: form.linkedin || undefined };
    if (editing) updateMutation.mutate({ id: editing.id, body });
    else createMutation.mutate(body);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Team Members</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage leadership team profiles</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2"><Plus className="w-5 h-5" /> Add Member</Button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "New"} Member</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Role</label><input type="text" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input type="url" value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <div className="flex gap-2"><Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{editing ? "Update" : "Create"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
        </form>
      )}
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Name</th><th className="text-left px-6 py-4 font-semibold">Role</th><th className="text-right px-6 py-4 font-semibold">Actions</th></tr></thead>
            <tbody>
              {members?.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{m.role ?? "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(m)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon-sm" className="text-red-600" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(m.id); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!members || members.length === 0) && <div className="py-12 text-center text-slate-500">No team members yet.</div>}
        </div>
      )}
    </div>
  );
}
