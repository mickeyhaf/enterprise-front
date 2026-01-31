import { api, type NewsArticle } from "./api-client";

export type { NewsArticle };

export async function fetchNews(): Promise<NewsArticle[]> {
  return api.getNews();
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  return api.getNewsBySlug(slug);
}
