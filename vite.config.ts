import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));
const pages = ['index', 'experience', 'projects', 'blog'];

/** Drawing revision shown in the title blocks: the build's YYYY.MM. */
const now = new Date();
const revision = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;

/**
 * Replaces `<!-- @include name -->` in HTML pages with `src/partials/name.html`,
 * so the shared head/header/footer are static HTML at build time (no JS needed),
 * then stamps `%REV%` with the revision.
 */
function htmlPartials(dir: string): Plugin {
  return {
    name: 'html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_match, name: string) =>
            readFileSync(resolve(dir, `${name}.html`), 'utf8'),
          )
          .replaceAll('%REV%', revision),
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(dir)) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  // GitHub Pages serves the site from https://aristotelissym.github.io/personal-eportfolio/
  base: '/personal-eportfolio/',
  plugins: [htmlPartials(resolve(root, 'src/partials'))],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(root, `${page}.html`)])),
    },
  },
});
