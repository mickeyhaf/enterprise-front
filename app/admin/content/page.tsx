"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

const BLOCK_SCHEMA: Record<string, string> = {
  navbar: '{"siteName":"","tagline":"","mainLinks":[],"dropdowns":[],"trailingLinks":[],"resourcesDropdown":{},"adminLoginHref":"","adminLoginLabel":"","languages":[]}',
  home_hero: '{"headline":"","tagline":"","badge":""}',
  home_heritage: '{"sectionTitle":"","sectionDescription":"","mission":{},"vision":{},"image":"","badge":{}}',
  home_leadership: '{"title":"","description":""}',
  home_trust: '{"title":"","description":"","badges":[]}',
  about_hero: '{"title":"","description":""}',
  about_history: '{"paragraphs":[]}',
  contact_info: '{"address":"","email":"","supportEmail":"","phone":"","hours":""}',
  contact_cta: '{"title":"","description":"","primaryButtonText":"","secondaryButtonText":"","secondaryLink":""}',
  contact_subjects: '{"items":[{"value":"","label":""}]}',
  footer_contact: '{"companyName":"","description":"","address":"","email":"","phone":""}',
  footer_social: '{"facebook":"","twitter":"","linkedin":""}',
  footer_links: '{"quickLinks":[],"resourceLinks":[]}',
  services_hero: '{"title":"","description":"","image":""}',
  services: '{"items":[{"title":"","description":"","image":""}]}',
  resources_hero: '{"badge":"","title":"","description":"","image":""}',
  resources_categories: '{"items":[{"title":"","description":"","icon":"","link":""}]}',
  values: '{"title":"","description":"","items":[]}',
  achievements: '{"title":"","description":"","stats":[],"awards":[]}',
  partners: '{"items":[{"name":"","description":"","image":""}]}',
  org_structure: '{"title":"","description":"","departments":[],"hierarchy":[]}',
  portfolio_stats: '{"projectsCompleted":"","yearsExperience":"","globalPartners":"","valueGenerated":""}',
  testimonials: '{"items":[{"quote":"","author":"","role":""}]}',
  trade_main: '{"hero":{},"sections":[]}',
  trade_expertise: '{"hero":{},"section":{},"services":[],"industries":[]}',
  trade_import_export: '{"hero":{"badge":"","title":"","description":"","image":""},"section":{"title":"","description":"","image":""},"services":[]}',
  trade_supply_chain: '{"hero":{"badge":"","title":"","description":"","image":""},"section":{"title":"","description":""},"services":[],"features":[{"icon":"","title":"","description":""}],"cta":{"title":"","description":"","buttonText":""}}',
  trade_partnerships: '{"hero":{"badge":"","title":"","description":"","image":""},"section":{"title":"","description":""},"services":[],"features":[{"icon":"","title":"","description":""}]}',
  cookies_policy: '{"lastUpdated":"","badge":"","title":"","subtitle":"","dateLabel":"","infoRight":"","sections":[{"heading":"","paragraphs":[],"cards":[{"title":"","description":""}]}],"note":{"heading":"","content":""},"contactEmail":""}',
  privacy_policy: '{"lastUpdated":"","badge":"","title":"","subtitle":"","dateLabel":"","version":"","sections":[{"heading":"","content":""}],"contactBlock":{"companyName":"","address":"","email":""}}',
  terms_of_service: '{"lastUpdated":"","badge":"","title":"","subtitle":"","dateLabel":"","infoRight":"","sections":[{"heading":"","content":""}],"callouts":[]}',
  downloads_hero: '{"title":"","description":""}',
  footer_copyright: '{"companyName":"","links":[{"label":"","href":""}]}',
  about_sections: '{"historyTitle":"","leadershipTitle":"","leadershipDescription":""}',
  quote_labels: '{"importExport":"","supplyChain":"","partnerships":"","requestQuote":""}',
};

export default function AdminContentPage() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newContent, setNewContent] = useState("{}");
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
        Edit site content blocks (JSON). Create new blocks or edit existing.
      </p>

      <div className="mb-6 space-y-4">
        <button
          type="button"
          onClick={() => setShowSchema((v) => !v)}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary"
        >
          {showSchema ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Block schema reference
        </button>
        {showSchema && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-sm">
            <p className="mb-3 text-slate-600 dark:text-slate-400">Known keys and starter JSON. Use as template when creating blocks.</p>
            <div className="grid sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {Object.entries(BLOCK_SCHEMA).map(([k, v]) => (
                <div key={k} className="font-mono text-xs">
                  <span className="text-primary font-semibold">{k}</span>
                  <pre className="mt-1 text-slate-500 truncate">{v.slice(0, 60)}...</pre>
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
              <Button size="sm" variant="outline" onClick={() => setShowCreate(true)} className="gap-1"><Plus className="w-4 h-4" /> New</Button>
            </div>
            {showCreate && (
              <div className="mb-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
                <input
                  type="text"
                  placeholder="Block key (e.g. home_hero)"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full px-2 py-1 text-sm rounded border"
                />
                <textarea
                  placeholder='{"key": "value"}'
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full px-2 py-1 text-sm font-mono rounded border"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={async () => {
                    if (!newKey.trim()) return;
                    try {
                      const parsed = JSON.parse(newContent || "{}");
                      await api.adminContent.set(newKey.trim(), parsed);
                      queryClient.invalidateQueries({ queryKey: ["admin", "content"] });
                      setSelectedKey(newKey.trim());
                      setEditValue("");
                      setShowCreate(false);
                      setNewKey("");
                      setNewContent("{}");
                    } catch {
                      alert("Invalid JSON");
                    }
                  }}>Create</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setShowCreate(false); setNewKey(""); setNewContent("{}"); }}>Cancel</Button>
                </div>
              </div>
            )}
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
