"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Bold, Italic, Heading2, List } from "lucide-react";
import { api } from "@/lib/api-client";
import type { EngagementPost } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminEngagementPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<EngagementPost | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", excerpt: "", date: "", author: "", category: "", image: "", content: "" });
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "engagement"],
    queryFn: () => api.adminEngagement.list(),
  });
  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.adminEngagement.create(body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "engagement"] }); resetForm(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) => api.adminEngagement.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "engagement"] }); resetForm(); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminEngagement.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "engagement"] }),
  });

  function resetForm() {
    setForm({ slug: "", title: "", excerpt: "", date: "", author: "", category: "", image: "", content: "" });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(p: EngagementPost) {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      date: p.date ?? "",
      author: p.author ?? "",
      category: p.category ?? "",
      image: p.image ?? "",
      content: p.content ?? "",
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

  function insertMarkdown(prefix: string, suffix: string = "") {
    if (!contentRef.current) return;
    const start = contentRef.current.selectionStart;
    const end = contentRef.current.selectionEnd;
    const text = form.content;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    setForm(f => ({ ...f, content: before + prefix + selected + suffix + after }));
    
    // Reset focus and selection
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
        contentRef.current.setSelectionRange(start + prefix.length, end + prefix.length);
      }
    }, 0);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Community Engagement</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage community engagement posts</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2"><Plus className="w-5 h-5" /> Add Post</Button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "New"} Post</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input type="text" required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Date</label><input type="text" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="e.g. 2024-01-15" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Author</label><input type="text" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. CSR, Event" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <ImageUpload label="Image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <div className="border border-slate-200 dark:border-slate-700 rounded-t-lg bg-slate-50 dark:bg-slate-800/50 p-2 flex gap-1 border-b-0">
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => insertMarkdown("**", "**")} title="Bold">
                <Bold className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => insertMarkdown("_", "_")} title="Italic">
                <Italic className="w-4 h-4" />
              </Button>
              <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 my-auto mx-1" />
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => insertMarkdown("## ")} title="Heading 2">
                <Heading2 className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => insertMarkdown("- ")} title="Bullet List">
                <List className="w-4 h-4" />
              </Button>
            </div>
            <textarea ref={contentRef} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={10} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm" />
          </div>
          <div className="flex gap-2"><Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{editing ? "Update" : "Create"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
        </form>
      )}
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Category</th><th className="text-right px-6 py-4 font-semibold">Actions</th></tr></thead>
            <tbody>
              {posts?.map((p) => (
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
          {(!posts || posts.length === 0) && <div className="py-12 text-center text-slate-500">No posts yet.</div>}
        </div>
      )}
    </div>
  );
}
