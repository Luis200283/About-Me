import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      // Deterministic on purpose: Next 16 Cache Components blocks
      // non-deterministic rendering (bare `new Date()`) at build time.
      lastModified: new Date(site.year, 0, 1),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
