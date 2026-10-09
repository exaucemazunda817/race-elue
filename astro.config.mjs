// @ts-check
import { defineConfig } from 'astro/config';

// Adresse publique du site : balises canoniques, aperçu de partage (Open Graph), robots.txt et sitemap.
// Ordre : SITE_URL (à définir le jour du vrai nom de domaine), puis l'adresse de production que Vercel
// fournit automatiquement pendant la construction, puis l'adresse Vercel actuelle.
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = (process.env.SITE_URL || '').trim()
  || (vercelProd ? `https://${vercelProd}` : '')
  || 'https://race-elue.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
});
