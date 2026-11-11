import { site } from "@/lib/site";

// Blog API integration is disabled. Keep callers working without external requests.
export const WORDPRESS_API_URL = "";
export const WORDPRESS_ORIGIN = site.url;

export async function wpFetchAll<T>(path: string): Promise<T[]> {
  void path;
  return [];
}

export async function fetchPostSlugs(): Promise<string[]> {
  return [];
}
