"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QuoteRequestStatus } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

const STATUSES: QuoteRequestStatus[] = ["pending", "reviewing", "quoted", "rejected"];

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<QuoteRequestStatus | "all">("all");
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => api.adminOrders.list(),
  });
  const updateMutation = useMutation({
    mutationFn: (opts: { id: number; status: QuoteRequestStatus }) =>
      api.adminOrders.updateStatus(opts.id, opts.status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "orders"] }),
  });
  const filtered = orders?.filter((o) => filter === "all" || o.status === filter) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">Quote Requests</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Review and update status</p>
      <div className="flex gap-2 mb-6">
        {(["all", ...STATUSES] as const).map((s) => (
          <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
            {s === "all" ? "All" : s}
          </Button>
        ))}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-xl border overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-4 font-semibold">Name</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Interest</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-right px-6 py-4 font-semibold">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="px-6 py-4 font-medium">{o.fullName}</td>
                  <td className="px-6 py-4">{o.email}</td>
                  <td className="px-6 py-4">{o.productServiceInterest}</td>
                  <td className="px-6 py-4">{o.status}</td>
                  <td className="px-6 py-4 text-right">
                    <select value={o.status} onChange={(e) => updateMutation.mutate({ id: o.id, status: e.target.value as QuoteRequestStatus })} className="text-sm rounded border px-2 py-1">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-slate-500">No quote requests.</div>}
        </div>
      )}
    </div>
  );
}
