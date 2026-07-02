import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("User-agent: *\nAllow: /\n");
  }

  const sitemapUrl = new URL("/sitemap-index.xml", site);

  return new Response(
    ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemapUrl}`, ""].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
