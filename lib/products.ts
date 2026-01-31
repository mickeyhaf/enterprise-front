import { api, type Product } from "./api-client";

export type { Product };

export async function fetchProducts(): Promise<Product[]> {
  return api.getProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return api.getProductBySlug(slug);
}
