"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import type { BlockFormSchema, FieldConfig } from "@/lib/content-block-schemas";

function setAt(obj: Record<string, unknown>, path: (string | number)[], value: unknown): Record<string, unknown> {
  const out = JSON.parse(JSON.stringify(obj));
  let cur: unknown = out;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    const parent = cur as Record<string, unknown>;
    if (typeof nextKey === "number") {
      if (!Array.isArray(parent[key])) parent[key] = [];
      const arr = parent[key] as unknown[];
      while (arr.length <= nextKey) arr.push({});
      cur = arr[nextKey];
      i++;
    } else {
      if (parent[key] === undefined) parent[key] = {};
      cur = parent[key];
    }
  }
  const last = path[path.length - 1];
  const parent = cur as Record<string, unknown>;
  parent[last as string] = value;
  return out;
}

function getAt(obj: Record<string, unknown>, path: (string | number)[]): unknown {
  let cur: unknown = obj;
  for (const key of path) {
    if (cur == null) return undefined;
    cur = (cur as Record<string, unknown>)[key as string] ?? (Array.isArray(cur) ? cur[key as number] : undefined);
  }
  return cur;
}

export function ContentBlockForm({
  schema,
  data,
  onSave,
  isSaving,
}: {
  schema: BlockFormSchema;
  data: Record<string, unknown> | null | undefined;
  onSave: (content: Record<string, unknown>) => void;
  isSaving?: boolean;
}) {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setFormState((data && typeof data === "object" && !Array.isArray(data) ? data : {}) as Record<string, unknown>);
  }, [data]);

  const update = (path: (string | number)[], value: unknown) => {
    setFormState((prev) => setAt(prev, path, value));
  };

  const renderField = (field: FieldConfig, path: (string | number)[]) => {
    const val = getAt(formState, path);
    const key = path.join(".");

    if (field.type === "text" || field.type === "textarea") {
      return (
        <FormField
          key={key}
          label={field.label}
          type={field.type}
          value={String(val ?? "")}
          onChange={(v) => update(path, v)}
        />
      );
    }
    if (field.type === "image") {
      return (
        <FormField
          key={key}
          label={`${field.label} (Image URL)`}
          type="url"
          value={String(val ?? "")}
          onChange={(v) => update(path, v)}
        />
      );
    }
    if (field.type === "stringList") {
      const arr = Array.isArray(val) ? (val as string[]) : [];
      const text = arr.join("\n");
      return (
        <div key={key}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
          <textarea
            value={text}
            onChange={(e) => {
              const lines = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean);
              update(path, lines);
            }}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            placeholder="One item per line"
          />
        </div>
      );
    }
    if (field.type === "group" && field.fields) {
      const obj = (val && typeof val === "object" && !Array.isArray(val) ? val : {}) as Record<string, unknown>;
      return (
        <div key={key} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{field.label}</h3>
          {field.fields.map((f) => renderField(f, [...path, f.key]))}
        </div>
      );
    }
    if (field.type === "repeater" && field.itemFields) {
      const arr = Array.isArray(val) ? val : [];
      return (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => update(path, [...arr, field.itemFields!.reduce((o, f) => ({ ...o, [f.key]: "" }), {} as Record<string, string>)])}
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          {arr.map((_, i) => (
            <div
              key={`${key}-${i}`}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 space-y-3"
            >
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    const next = [...arr];
                    next.splice(i, 1);
                    update(path, next);
                  }}
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              </div>
              {field.itemFields!.map((f) => renderField(f, [...path, i, f.key]))}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {schema.fields.map((field) => renderField(field, [field.key]))}
      <div className="pt-4">
        <Button onClick={() => onSave(formState)} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
