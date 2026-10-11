// Lecture des articles du blog depuis Sanity, au moment de la construction du site (jamais dans le
// navigateur : aucun jeton n'est envoyé aux visiteurs). Sans identifiant de projet, rien n'est appelé.
import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production';
// Jeton de lecture facultatif (seulement si le jeu de données est privé). Jamais préfixé PUBLIC_.
const token = import.meta.env.SANITY_READ_TOKEN as string | undefined;

export const sanityActif = Boolean(projectId);

export const sanity = sanityActif
  ? createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false, perspective: 'published', token })
  : null;

// Adresse d'image Sanity redimensionnée et convertie en WebP par leur service d'images.
export const urlImage = (base: string, w: number, h?: number, fp?: { x: number; y: number }) => {
  const q = new URLSearchParams({ w: String(w), fm: 'webp', q: '74', fit: h ? 'crop' : 'max' });
  if (h) q.set('h', String(h));
  if (h && fp) { q.set('crop', 'focalpoint'); q.set('fp-x', fp.x.toFixed(3)); q.set('fp-y', fp.y.toFixed(3)); }
  return `${base}?${q}`;
};

export const REQUETE_PENSEES = `*[_type == "pensee" && defined(slug.current)] | order(date desc, _createdAt asc) {
  "slug": slug.current, titre, titreEm, theme, date, resume, corps, priere, alaune, magazinePage, magazineRubrique,
  "image": { "url": image.asset->url, "w": image.asset->metadata.dimensions.width, "h": image.asset->metadata.dimensions.height, "alt": image.alt, "hotspot": image.hotspot }
}`;
