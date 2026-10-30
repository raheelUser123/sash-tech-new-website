import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    ...services.map((s) => ({ path: s.href, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, changeFrequency: p.changeFrequency, priority: p.priority })),
  ];
}
