import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const legacyDocSegments = [
  '/docs/background/',
  '/docs/spec/',
  '/docs/architecture/',
  '/docs/implementation/',
  '/docs/usage/',
  '/docs/extending/',
  '/docs/skills/',
  '/docs/community/',
];

function isCurrentRoute(page) {
  const pathname = new URL(page).pathname.replace(/^\/zh(?=\/)/, '');
  return !legacyDocSegments.some((segment) => pathname.startsWith(segment));
}

const legacyRedirects = {
  '/docs/background/problem': '/docs',
  '/docs/background/existence-not-content': '/docs/concepts/compilation-snapshots',
  '/docs/background/prior-art': '/docs',
  '/docs/spec/overview': '/docs/concepts/package-model',
  '/docs/spec/atoms': '/docs/concepts/package-model',
  '/docs/spec/edges': '/docs/concepts/package-model',
  '/docs/spec/projection': '/docs/concepts/compilation-snapshots',
  '/docs/spec/contracts': '/docs/concepts/selection-execution',
  '/docs/spec/registry': '/docs/reference/http-registry',
  '/docs/spec/index-format': '/docs/concepts/compilation-snapshots',
  '/docs/architecture/pipeline': '/docs/concepts/compilation-snapshots',
  '/docs/architecture/compile-time': '/docs/concepts/compilation-snapshots',
  '/docs/architecture/runtime': '/docs/concepts/selection-execution',
  '/docs/architecture/domain-plugin': '/docs/concepts/package-model',
  '/docs/implementation/parser': '/docs/concepts/compilation-snapshots',
  '/docs/implementation/checkers': '/docs/concepts/compilation-snapshots',
  '/docs/implementation/chunker': '/docs/concepts/compilation-snapshots',
  '/docs/implementation/runtime': '/docs/concepts/selection-execution',
  '/docs/implementation/mcp-server': '/docs/reference/mcp',
  '/docs/usage/install': '/docs',
  '/docs/usage/first-atom': '/docs/examples/frontend-design/authoring',
  '/docs/usage/compile': '/docs/concepts/compilation-snapshots',
  '/docs/usage/mcp-claude': '/docs/start/connect-agent',
  '/docs/usage/publish-install': '/docs/operate/releases-migrations',
  '/docs/extending/custom-kinds': '/docs/concepts/package-model',
  '/docs/extending/custom-verbs': '/docs/concepts/package-model',
  '/docs/extending/domain-yaml': '/docs/concepts/package-model',
  '/docs/extending/domain-mcp': '/docs/start/connect-agent',
  '/docs/reference/dsl': '/docs/concepts/package-model',
  '/docs/skills/frontend-design': '/docs/examples/frontend-design',
  '/docs/community/roadmap': '/docs',
};

const redirects = Object.fromEntries([
  ...Object.entries(legacyRedirects),
  ...Object.entries(legacyRedirects).map(([from, to]) => [`/zh${from}`, `/zh${to}`]),
]);

// Kernary docs — static-first, zero-JS by default. The configured site remains
// the compatibility GitHub Pages URL until the external domain migration is
// complete and verified.
export default defineConfig({
  site: 'https://skill-wiki.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  redirects,
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: isCurrentRoute })],
});
