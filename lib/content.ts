import { api } from "./api-client";

export async function fetchContent(): Promise<Record<string, unknown>> {
  return api.getContent();
}

export async function fetchContentByKey<T = unknown>(key: string): Promise<T | null> {
  return api.getContentByKey<T>(key);
}
