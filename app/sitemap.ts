import type { MetadataRoute } from "next";

const BASE_URL = "https://mmk-studios-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/chat", "/images", "/pricing", "/about", "/contact", "/privacy", "/terms"];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path === "/pricing" || path === "/chat" ? 0.9 : 0.7,
  }));
}
