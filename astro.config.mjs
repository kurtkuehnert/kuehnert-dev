import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://kuehnert.dev",
  output: "static",
  integrations: [sitemap()],
});
