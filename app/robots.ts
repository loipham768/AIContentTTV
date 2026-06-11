import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/create", "/editor", "/profile", "/checkout"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
