"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Product } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<{
    slug: string;
    title: string;
    shortDescription: string;
    image: string;
    overview: string;
    highlights: string[];
  }>({ slug: "", title: "", shortDescription: "", image: "", overview: "", highlights: [] });
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => api.adminProducts.list(),
  });
  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.adminProducts.create(body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "products"] }); resetForm(); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Record<string, unknown> }) => api.adminProducts.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin", "products"] }); resetForm(); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminProducts.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "products"] }),
  });

  function resetForm() {
    setForm({ slug: "", title: "", shortDescription: "", image: "", overview: "", highlights: [] });
    setEditing(null);
    setIsFormOpen(false);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({ 
      slug: p.slug, 
      title: p.title, 
      shortDescription: p.shortDescription ?? "", 
      image: p.image ?? "", 
      overview: p.overview ?? "",
      highlights: p.highlights ?? [] 
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
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage products</p>
        </div>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="gap-2"><Plus className="w-5 h-5" /> Add Product</Button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "New"} Product</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input type="text" required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Short Description</label><input type="text" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          <ImageUpload label="Image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          <div><label className="block text-sm font-medium mb-1">Overview</label><textarea value={form.overview} onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))} rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" /></div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Key Highlights</label>
              <Button type="button" variant="outline" size="sm" onClick={() => setForm(f => ({ ...f, highlights: [...f.highlights, ""] }))} className="gap-1 h-7 text-xs">
                <Plus className="w-3 h-3" /> Add Highlight
              </Button>
            </div>
            <div className="space-y-2">
              {form.highlights.length === 0 && <div className="text-sm text-slate-500 italic py-2">No highlights added yet.</div>}
              {form.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...form.highlights];
                      newHighlights[index] = e.target.value;
                      setForm(f => ({ ...f, highlights: newHighlights }));
                    }}
                    placeholder={`Highlight ${index + 1}`}
                    className="flex-1 px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newHighlights = [...form.highlights];
                      newHighlights.splice(index, 1);
                      setForm(f => ({ ...f, highlights: newHighlights }));
                    }}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2"><Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{editing ? "Update" : "Create"}</Button><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button></div>
        </form>
      )}
      {isLoading ? <div className="text-slate-500">Loading...</div> : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Slug</th><th className="text-right px-6 py-4 font-semibold">Actions</th></tr></thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium">{p.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{p.slug}</td>
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
          {(!products || products.length === 0) && <div className="py-12 text-center text-slate-500">No products yet.</div>}
        </div>
      )}
    </div>
  );
}
