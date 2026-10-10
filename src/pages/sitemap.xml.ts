import type { APIRoute } from 'astro';
import { chargerPensees } from '../data/blog';

const fixes = [
  '/', '/a-propos', '/publications', '/publications/comment-dieu-guerit-les-coeurs-brises',
  '/publications/comment-dieu-guerit-les-coeurs-brises/extrait', '/publications/devenu-une-legende-n01',
  '/pensees', '/guerie-et-epanouie', '/temoignages', '/contact', '/mentions-legales',
];

export const GET: APIRoute = async ({ site }) => {
  const PENSEES = await chargerPensees();
  const urls = [...fixes, ...PENSEES.map((p) => `/pensees/${p.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${new URL(u, site).href}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
