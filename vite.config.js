import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/content/site.js';

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
});
