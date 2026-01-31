"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { api } from "@/lib/api-client";
import type { NewsArticle, CreateNewsDto } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminNewsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [form, setForm] = useState<CreateNewsDto>({
    slug: "",
    title: "",
    excerpt: "",
    date: new Date().toISOString().slice(0, 10),
    author: "",
    category: "",
    image: "",
    content: "",
  });

  const queryClient = useQueryClient();
  const { data: articles, isLoading } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: () => api.adminNews.list(),
  });

  const createMutation = useMutation({
    mutationFn: (dto: CreateNewsDto) => api.adminNews.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateNewsDto> }) =>
      api.adminNews.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.adminNews.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "news"] }),
  });

  const resetForm = () => {
    setForm({
      slug: "",
      title: "",
      excerpt: "",
      date: new Date().toISOString().slice(0, 10),
      author: "",
      category: "",
      image: "",
      content: "",
    });
    setEditing(null);
    setIsFormOpen(false);
  };

  const openEdit = (a: NewsArticle) => {
    setEditing(a);
    setForm({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      date: a.date ?? new Date().toISOString().slice(0, 10),
      author: a.author ?? "",
      category: a.category ?? "",
      image: a.image ?? "",
      content: a.content ?? "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing.id, dto: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug || slugify(title),
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            News Articles
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and manage tender announcements and news
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-5 h-5" /> Add Article
        </Button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
        >
          <h2 className="text-lg font-semibold">
            {editing ? "Edit Article" : "New Article"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editing ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
          {(createMutation.isError || updateMutation.isError) && (
            <p className="text-sm text-red-600">
              {createMutation.error instanceof Error
                ? createMutation.error.message
                : updateMutation.error instanceof Error
                  ? updateMutation.error.message
                  : "Something went wrong"}
            </p>
          )}
        </form>
      )}

      {isLoading ? (
        <div className="text-slate-500">Loading...</div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-white">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-white">Author</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles?.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">{a.title}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{a.date ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{a.author ?? "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/news/${a.slug}`} target="_blank">
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(a)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm("Delete this article?")) deleteMutation.mutate(a.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!articles || articles.length === 0) && (
            <div className="py-12 text-center text-slate-500">No articles yet. Create one to get started.</div>
          )}
        </div>
      )}
    </div>
  );
}
