import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://velvetkeyproperties.com";

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/communities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/off-plan`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic property detail pages
  const propertyRoutes: MetadataRoute.Sitemap = PROPERTIES.map((prop) => ({
    url: `${baseUrl}/property/${prop.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
