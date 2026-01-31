"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

export default function AdminContentPage() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
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
  const displayValue =
    selectedKey && block !== undefined
      ? typeof block === "string"
        ? block
        : JSON.stringify(block, null, 2)
      : "";

  const handleSave = () => {
    if (!selectedKey) return;
    try {
      const parsed = JSON.parse(editValue);
      updateMutation.mutate({ key: selectedKey, content: parsed });
    } catch {
      updateMutation.mutate({ key: selectedKey, content: editValue });
    }
    setEditValue("");
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
        Content Blocks
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Edit site content blocks (JSON)
      </p>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="lg:w-64 shrink-0">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <h2 className="font-semibold mb-3">Blocks</h2>
            {isLoading ? (
              <div className="text-slate-500 text-sm">Loading...</div>
            ) : (
              <div className="space-y-1">
                {keys.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSelectedKey(k);
                      setEditValue("");
                    }}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      selectedKey === k
                        ? "bg-primary text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {selectedKey && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <h2 className="font-semibold mb-4">{selectedKey}</h2>
              <textarea
                value={editValue || displayValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={16}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
              />
              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
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
          )}
          {!selectedKey && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
              Select a content block to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
