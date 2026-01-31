"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResourceItem } from "@/lib/api-client";

function formatDate(value: string | undefined): string {
  if (!value) return "";
  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? value : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return value;
  }
}

interface ResourceListProps {
  items: ResourceItem[];
  layout?: "grid" | "list";
  emptyMessage?: string;
}

export function ResourceList({ items, layout = "grid", emptyMessage = "No documents in this category yet." }: ResourceListProps) {
  if (!items.length) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400 py-12">
        {emptyMessage}
      </p>
    );
  }

  if (layout === "list") {
    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {item.fileSize ? `${item.fileSize}` : ""}
                  {item.fileSize && item.updatedAt ? " • " : ""}
                  {item.updatedAt ? formatDate(item.updatedAt) : ""}
                </p>
                {item.description && (
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            {item.fileUrl && (
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5">
                  Download <Download size={16} className="ml-2" />
                </Button>
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group"
        >
          <div className="p-3 bg-white dark:bg-slate-700 rounded-lg text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
            <FileText size={24} />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 line-clamp-2">
                {item.description}
              </p>
            )}
            <p className="text-xs text-slate-500 mb-4">
              {item.fileSize ? `${item.fileSize}` : ""}
              {item.fileSize && item.updatedAt ? " • " : ""}
              {item.updatedAt ? formatDate(item.updatedAt) : ""}
            </p>
            {item.fileUrl && (
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-primary group-hover:text-primary">
                  Download <Download size={14} />
                </Button>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
