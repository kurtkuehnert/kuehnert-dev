import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://kuehnert.dev',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
  adapter: cloudflare()
});