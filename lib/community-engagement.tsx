import { api, type EngagementPost } from "./api-client";

export type { EngagementPost };

export async function fetchEngagementPosts(): Promise<EngagementPost[]> {
  return api.getEngagement();
}

export async function getEngagementPostBySlug(slug: string): Promise<EngagementPost | null> {
  return api.getEngagementBySlug(slug);
}
