import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/blogstudio", "/blogstudio/"],
    },
    sitemap: "https://ghostprojects.in/sitemap.xml",
  };
}

