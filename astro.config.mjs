// @ts-check
import { defineConfig } from 'astro/config';

// Adresse publique du site : à définir (variable SITE_URL) dès que le nom de domaine sera choisi.
// Elle sert aux balises canoniques, à l'aperçu de partage (Open Graph) et au sitemap.
const site = process.env.SITE_URL || 'https://race-elue-disanka.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
});
