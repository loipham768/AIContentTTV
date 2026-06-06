import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/create", "/editor", "/profile", "/checkout"],
    },
    sitemap: "https://taopage.vn/sitemap.xml",
  };
}
