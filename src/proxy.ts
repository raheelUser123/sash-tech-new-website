import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/work";
import { fetchPostSlugs } from "@/lib/wordpress/api";

const caseStudies = new Set(projects.map((p) => p.slug));

/** Published WordPress slugs, refreshed at most once a minute when an unknown slug is requested. */
let posts = { slugs: new Set<string>(), fetchedAt: 0 };

async function isPublishedPost(slug: string) {
  if (posts.slugs.has(slug)) return true;
  if (Date.now() - posts.fetchedAt < 60_000) return false;
  try {
    posts = { slugs: new Set(await fetchPostSlugs()), fetchedAt: Date.now() };
    return posts.slugs.has(slug);
  } catch {
    return true; // WordPress unreachable: let the page decide.
  }
}


export async function proxy(request: NextRequest) {
  const [, section, raw] = request.nextUrl.pathname.split("/");
  if (!raw) return NextResponse.next();
  const slug = decodeURIComponent(raw);
  const known = section === "case-studies" ? caseStudies.has(slug) : await isPublishedPost(slug);
  return known ? NextResponse.next() : NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/insights/:slug", "/case-studies/:slug"],
};
