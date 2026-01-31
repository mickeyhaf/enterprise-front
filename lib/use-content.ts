"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchContentByKey } from "./content";

export function useContent<T = unknown>(key: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["content", key],
    queryFn: () => fetchContentByKey<T>(key),
  });
  return { data: data ?? null, isLoading, isError };
}
