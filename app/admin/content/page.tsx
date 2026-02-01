"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
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
  const blockParam = searchParams.get("block");
  const [selectedKey, setSelectedKey] = useState<string | null>(blockParam);
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
    router.replace(`/admin/content?block=${key}`, { scroll: false });
  };
  const [newBlockType, setNewBlockType] = useState("");
  const [showJsonMode, setShowJsonMode] = useState(false);
  const [jsonValue, setJsonValue] = useState("");
  const [showSchema, setShowSchema] = useState(false);
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["admin", "content"],
    queryFn: () => api.adminContent.getAll(),
  });

  const { data: block } = useQuery({
    queryKey: ["admin", "content", selectedKey],
    queryFn: () => api.adminContent.getByKey(selectedKey!),
    enabled: !!selectedKey,
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
    },
  });

  const keys = content ? Object.keys(content) : [];
  const keysSet = new Set(keys);
  const schema = selectedKey ? getBlockSchema(selectedKey) : null;
  const groupedSchemas = useMemo(() => getGroupedBlockSchemas(), []);
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
                  const existingInCategory = blocks.filter((b) => keysSet.has(b.key));
                  if (existingInCategory.length === 0) return null;
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
                          {existingInCategory.map(({ key, label }) => (
                            <button
                              key={key}
                              onClick={() => selectBlock(key)}
                              className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                                selectedKey === key
                                  ? "bg-primary text-white"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {keys.filter((k) => !Object.values(groupedSchemas).some((b) => b.some((x) => x.key === k))).length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">Uncategorized</p>
                    {keys
                      .filter((k) => !Object.values(groupedSchemas).some((b) => b.some((x) => x.key === k)))
                      .map((k) => (
                        <button
                          key={k}
                          onClick={() => selectBlock(k)}
                          className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                            selectedKey === k ? "bg-primary text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {selectedKey && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                  {schema?.label ?? selectedKey}
                </h2>
                {schema && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowJsonMode((v) => !v);
                      if (!showJsonMode) setJsonValue(displayJson);
                    }}
                    className="text-xs text-slate-500 hover:text-primary"
                  >
                    {showJsonMode ? "Switch to form" : "Advanced: Edit as JSON"}
                  </button>
                )}
              </div>

              {showJsonMode || !schema ? (
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
                    {updateMutation.isError && (
                      <span className="ml-4 text-sm text-red-600">
                        {updateMutation.error instanceof Error
                          ? updateMutation.error.message
                          : "Failed"}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <ContentBlockForm
                  schema={schema}
                  data={blockData}
                  onSave={handleFormSave}
                  isSaving={updateMutation.isPending}
                />
              )}
              {updateMutation.isError && !showJsonMode && (
                <div className="mt-4 text-sm text-red-600">
                  {updateMutation.error instanceof Error
                    ? updateMutation.error.message
                    : "Failed to save"}
                </div>
              )}
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
