/* Springy Portfolio · original template by amndazhar · https://github.com/amndazhar/portfolio-template · MIT */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/content/site.js';
import { CREATOR, creatorLine } from './src/creator.js';

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

/**
 * Fills the %SITE_*% placeholders in index.html from src/content/site.js, so the
 * page title and meta tags are edited in the same place as everything else.
 */
function siteMeta() {
  const values = {
    LANG: site.meta.lang ?? 'en',
    TITLE: site.meta.title,
    DESCRIPTION: site.meta.description,
    THEME_COLOR: site.meta.themeColor,
    AUTHOR: site.identity.name, // the site owner (you)
    GENERATOR: creatorLine, // the template it was built with
  };
  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.replace(/%SITE_(\w+)%/g, (match, key) => (key in values ? escapeHtml(values[key]) : match)),
  };
}

// `base: './'` keeps asset URLs relative so the build works from any sub-path
// (e.g. GitHub Pages project sites: username.github.io/repo-name/).
export default defineConfig({
  plugins: [react(), siteMeta()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Kept by the minifier (/*! … */ is a "legal comment").
        banner: `/*! ${CREATOR.template} · (c) ${CREATOR.year} ${CREATOR.name} · ${CREATOR.license} License · ${CREATOR.repo} */`,
      },
    },
  },
});
