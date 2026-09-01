import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public site contains only the current AOE information architecture.
// Historical AOE material lives in the Engine repository's
// legacy area and is intentionally not built into the public sitemap.
export default defineConfig({
  site: 'https://kernary-aoe.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
