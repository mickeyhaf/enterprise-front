"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function AdminProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => api.adminProducts.list(),
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">Products</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Manage products</p>
      {isLoading ? <div>Loading...</div> : (
        <div className="rounded-xl border overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full">
            <thead><tr className="border-b bg-slate-50 dark:bg-slate-800/50"><th className="text-left px-6 py-4 font-semibold">Title</th><th className="text-left px-6 py-4 font-semibold">Slug</th></tr></thead>
            <tbody>
              {products?.map((p) => <tr key={p.id} className="border-b"><td className="px-6 py-4 font-medium">{p.title}</td><td className="px-6 py-4">{p.slug}</td></tr>)}
            </tbody>
          </table>
          {(!products || products.length === 0) && <div className="py-12 text-center text-slate-500">No products.</div>}
        </div>
      )}
    </div>
  );
}
