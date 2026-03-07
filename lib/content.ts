import { api } from "./api-client";

export async function fetchContent(): Promise<Record<string, unknown>> {
  try {
    return await api.getContent();
  } catch {
    return {};
  }
}

export async function fetchContentByKey<T = unknown>(key: string): Promise<T | null> {
  try {
    const data = await api.getContentByKey<T>(key);
    return data ?? null;
  } catch {
    return null;
  }
}
