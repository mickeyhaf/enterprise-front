"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Pencil, ChevronDown, ChevronUp, ChevronRight, Building2 } from "lucide-react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { ContentBlockForm } from "@/components/admin/ContentBlockForm";
import {
  getBlockSchema,
  getGroupedBlockSchemas,
} from "@/lib/content-block-schemas";

export default function AdminContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const groupedSchemas = useMemo(() => getGroupedBlockSchemas(), []);

  const blockParam = searchParams.get("block");
  const [selectedKey, setSelectedKey] = useState<string | null>(blockParam);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [selectedKey]);

  const [showCreate, setShowCreate] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (blockParam) setSelectedKey(blockParam);
  }, [blockParam]);

  useEffect(() => {
    if (selectedKey) {
      for (const [category, blocks] of Object.entries(groupedSchemas)) {
        if (blocks.some((b) => b.key === selectedKey)) {
          setExpandedCategories((prev) => {
            if (prev.has(category)) return prev;
            const next = new Set(prev);
            next.add(category);
            return next;
          });
          break;
        }
      }
    }
  }, [selectedKey, groupedSchemas]);

  const selectBlock = (key: string) => {
    setSelectedKey(key);
    setShowJsonMode(false);
    setJsonValue("");
    setIsEditing(false);
    router.replace(`/admin/content?block=${key}`, { scroll: false });
  };
  const [newBlockType, setNewBlockType] = useState("");
  const [showJsonMode, setShowJsonMode] = useState(false);
  const [jsonValue, setJsonValue] = useState("");
  const [showSchema, setShowSchema] = useState(false);

  const { data: content, isLoading } = useQuery({
    queryKey: ["admin", "content"],
    queryFn: () => api.adminContent.getAll(),
  });

  const { data: block, isError, error } = useQuery({
    queryKey: ["admin", "content", selectedKey],
    queryFn: () => api.adminContent.getByKey(selectedKey!),
    enabled: !!selectedKey,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: ({ key, content }: { key: string; content: unknown }) =>
      api.adminContent.set(key, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "content"] });
      if (selectedKey) {
        queryClient.invalidateQueries({
          queryKey: ["admin", "content", selectedKey],
        });
      }
      setIsEditing(false);
    },
  });

  const keys = content ? Object.keys(content) : [];
  const keysSet = new Set(keys);
  const schema = selectedKey ? getBlockSchema(selectedKey) : null;
  const blockData =
    block !== undefined && block !== null && typeof block === "object"
      ? (block as Record<string, unknown>)
      : null;

  const handleFormSave = (formContent: Record<string, unknown>) => {
    if (!selectedKey) return;
    updateMutation.mutate({ key: selectedKey, content: formContent });
  };

  const handleJsonSave = () => {
    if (!selectedKey) return;
    try {
      const parsed = JSON.parse(jsonValue);
      updateMutation.mutate({ key: selectedKey, content: parsed });
    } catch {
      alert("Invalid JSON");
    }
  };

  const handleCreateBlock = async () => {
    if (!newBlockType.trim()) return;
    const key = newBlockType.trim();
    const blockSchema = getBlockSchema(key);
    const defaultContent: Record<string, unknown> = {};
    if (blockSchema) {
      for (const field of blockSchema.fields) {
        if (field.type === "repeater") {
          defaultContent[field.key] = [];
        } else if (field.type === "group") {
          defaultContent[field.key] = {};
        } else if (field.type === "stringList") {
          defaultContent[field.key] = [];
        } else {
          defaultContent[field.key] = "";
        }
      }
    }
    await api.adminContent.set(key, Object.keys(defaultContent).length > 0 ? defaultContent : {});
    queryClient.invalidateQueries({ queryKey: ["admin", "content"] });
    setSelectedKey(key);
    setShowCreate(false);
    setNewBlockType("");
    setIsEditing(true);
    router.replace(`/admin/content?block=${key}`, { scroll: false });
  };

  const displayJson =
    selectedKey && block !== undefined
      ? typeof block === "string"
        ? block
        : JSON.stringify(block, null, 2)
      : "";

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
        Content Blocks
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Edit site content. Use the form fields below or switch to JSON for custom blocks.
      </p>

      <div className="mb-6 space-y-4">
        <button
          type="button"
          onClick={() => setShowSchema((v) => !v)}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary"
        >
          {showSchema ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Block type reference
        </button>
        {showSchema && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-sm">
            <p className="mb-3 text-slate-600 dark:text-slate-400">
              Known content block types. Select one when creating a new block.
            </p>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {Object.entries(groupedSchemas).map(([category, blocks]) => (
                <div key={category}>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{category}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mt-1">
                    {blocks.map(({ key, label }) => (
                      <div key={key} className="text-sm">
                        <span className="text-primary font-medium">{key}</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="lg:w-64 shrink-0 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Blocks</h2>
              <Button size="sm" variant="outline" onClick={() => setShowCreate(true)} className="gap-1">
                <Plus className="w-4 h-4" /> New
              </Button>
            </div>
            {showCreate && (
              <div className="mb-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="block text-sm font-medium mb-1">Select content type</label>
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="">Choose...</option>
                  {Object.entries(groupedSchemas).map(([category, blocks]) => (
                    <optgroup key={category} label={category}>
                      {blocks.map(({ key, label }) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleCreateBlock}
                    disabled={!newBlockType.trim()}
                  >
                    Create
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowCreate(false);
                      setNewBlockType("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="text-slate-500 text-sm">Loading...</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(groupedSchemas).map(([category, blocks]) => {
                  const isExpanded = expandedCategories.has(category);
                  return (
                    <div key={category}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCategories((prev) => {
                            const next = new Set(prev);
                            if (next.has(category)) next.delete(category);
                            else next.add(category);
                            return next;
                          })
                        }
                        className="flex w-full items-center gap-1 px-2 py-1.5 rounded text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        )}
                        {category}
                      </button>
                      {isExpanded && (
                        <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-200 dark:border-slate-700 pl-2">
                          {blocks.map(({ key, label }) => (
                            <button
                              key={key}
                              onClick={() => selectBlock(key)}
                              className={`block w-full text-left px-2 py-1.5 rounded text-sm ${selectedKey === key
                                ? "bg-primary text-white"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                            >
                              <span>{label}</span>
                              {!keysSet.has(key) && (
                                <span className={`ml-1 text-[10px] font-semibold px-1 py-0.5 rounded ${selectedKey === key ? "bg-white/20 text-white" : "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"}`}>
                                  NEW
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {selectedKey && (
            <div className="space-y-6">
              {isError && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                  <p className="font-semibold">Error loading content</p>
                  <p className="text-sm">{error instanceof Error ? error.message : "Unknown error occurred"}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-white dark:bg-slate-900"
                    onClick={() => queryClient.invalidateQueries({ queryKey: ["admin", "content", selectedKey] })}
                  >
                    Retry
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <button onClick={() => setSelectedKey(null)} className="hover:text-primary transition-colors">Admin</button>
                <ChevronRight className="w-4 h-4" />
                <button onClick={() => setSelectedKey(null)} className="hover:text-primary transition-colors">Content</button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 dark:text-white font-medium">{schema?.label ?? selectedKey}</span>
              </div>

              {!isError && block === null && selectedKey && !keysSet.has(selectedKey) && (
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-sm mb-2">
                  <p className="font-semibold">This block has not been configured yet.</p>
                  <p className="mt-1">Click <strong>Edit Section</strong> to set the content for this block and save it.</p>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                {!isEditing && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-10 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Building2 className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                          <span className="w-8 h-px bg-primary" />
                          {schema?.category ?? "General Content"}
                        </div>
                        <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                          {schema?.label ?? selectedKey}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                          Manage and update the information for this section.
                        </p>
                      </div>
                      <Button onClick={() => setIsEditing(true)} className="gap-2 shadow-lg shadow-primary/20">
                        <Pencil className="w-4 h-4" /> Edit Section
                      </Button>
                    </div>
                  </div>
                )}

                <div className="p-10">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-bold text-xl text-slate-900 dark:text-white">
                      {isEditing ? "Editing Details" : "Detailed Information"}
                    </h2>
                    {schema && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowJsonMode((v) => !v);
                          if (!showJsonMode) {
                            setJsonValue(displayJson);
                            setIsEditing(true);
                          }
                        }}
                        className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                      >
                        {showJsonMode ? "Switch to form" : "Advanced JSON Mode"}
                      </button>
                    )}
                  </div>

                  {updateMutation.isError && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-sm">
                      <p className="font-semibold">Save failed</p>
                      <p>{updateMutation.error instanceof Error ? updateMutation.error.message : "Unknown error"}</p>
                    </div>
                  )}

                  {isEditing ? (
                    showJsonMode || !schema ? (
                      <div>
                        <textarea
                          value={showJsonMode ? jsonValue : displayJson}
                          onChange={(e) => setJsonValue(e.target.value)}
                          readOnly={!showJsonMode}
                          rows={16}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm text-slate-900 dark:text-white"
                        />
                        <div className="mt-4">
                          <Button
                            onClick={handleJsonSave}
                            disabled={updateMutation.isPending || !showJsonMode}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <ContentBlockForm
                        schema={schema}
                        data={blockData}
                        onSave={handleFormSave}
                        isSaving={updateMutation.isPending}
                      />
                    )
                  ) : (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <div className="p-8">
                          <div className="grid sm:grid-cols-2 gap-10">
                            {schema?.fields.filter(f => f.type === "text").map((field) => {
                              const value = blockData?.[field.key];
                              return (
                                <div key={field.key} className="space-y-1">
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    {field.label}
                                  </p>
                                  <p className="text-lg text-slate-900 dark:text-white font-medium">
                                    {value ? String(value) : "—"}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {schema?.fields.filter(f => f.type !== "text").map((field) => {
                        const value = blockData?.[field.key];
                        return (
                          <div key={field.key} className="space-y-4">
                            <div className="flex items-center gap-4">
                              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">
                                {field.label}
                              </h3>
                              <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
                            </div>

                            {field.type === "image" && value ? (
                              <div className="relative w-full max-w-4xl aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-sm group">
                                <img src={value as string} alt={field.label} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              </div>
                            ) : field.type === "repeater" ? (
                              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {((value as unknown[]) ?? []).length > 0 ? (
                                  (value as any[]).map((item, idx) => (
                                    <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                                      {item.image && (
                                        <div className="mb-4 h-12 w-12 rounded-lg bg-slate-50 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                          <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                                        </div>
                                      )}
                                      <p className="font-bold text-slate-900 dark:text-white">{item.name || item.title || item.label || `Item ${idx + 1}`}</p>
                                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description || item.value || ""}</p>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-full py-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
                                    No items configured. Click edit to add items.
                                  </div>
                                )}
                              </div>
                            ) : field.type === "stringList" ? (
                              <div className="flex flex-wrap gap-2">
                                {(value as string[])?.map((s, i) => (
                                  <span key={i} className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <div className="prose dark:prose-invert max-w-none">
                                <p className="text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed">
                                  {value ? String(value) : "—"}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!selectedKey && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
              Select a content block to edit, or create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
