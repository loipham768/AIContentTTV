import { MetadataRoute } from "next";
import { getArticlesMeta } from "@/lib/articles-db";
import { SITE_URL as BASE_URL } from "@/lib/constants";

export const revalidate = 3600;

// Static pages with their actual creation/last-significant-update dates
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/kien-thuc`,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/templates`,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/upgrade`,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticlesMeta();
    articleUrls = articles.map((article) => ({
      url: `${BASE_URL}/kien-thuc/${article.slug}`,
      lastModified: new Date(article.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB not available — sitemap generated without articles
  }

  return [...STATIC_PAGES, ...articleUrls];
}
