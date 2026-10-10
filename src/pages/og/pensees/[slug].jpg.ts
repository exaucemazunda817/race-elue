// Image de partage (WhatsApp, Facebook) de chaque article du blog, fabriquée à la construction du site :
// l'autrice n'a rien à faire quand elle publie (10/10/2026). Même style que les images faites à la main
// avant : fond vert, thème, titre (fin en italique doré), signature, photo en arche avec cadre doré.
import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { chargerPensees } from '../../../data/blog';
import { THEMES, type Pensee } from '../../../data/pensees';
import { urlImage } from '../../../lib/sanity';

export async function getStaticPaths() {
  const liste = await chargerPensees();
  return liste.map((p) => ({ params: { slug: p.slug }, props: { p } }));
}

const racine = process.cwd();
const police = (chemin: string) => readFileSync(join(racine, 'node_modules', chemin));
const POLICES = [
  { name: 'C', data: police('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
  { name: 'C', data: police('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff'), weight: 500 as const, style: 'italic' as const },
  { name: 'C', data: police('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff'), weight: 600 as const, style: 'italic' as const },
  { name: 'N', data: police('@fontsource/nunito-sans/files/nunito-sans-latin-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
];
const W = 840, H = 1040; // photo en arche, en double résolution (420 × 520 à l'écran)
const ETOILE = `data:image/svg+xml;base64,${Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0Z" fill="#C9A24B"/></svg>').toString('base64')}`;

// « center 58% » → fractions (0 à 1) pour recadrer comme sur le site.
const fraction = (v: string | undefined, def: number) => {
  if (!v || v === 'center') return def;
  if (v === 'left' || v === 'top') return 0;
  if (v === 'right' || v === 'bottom') return 1;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n / 100 : def;
};

async function photo(p: Pensee) {
  if (p.photoUrl) {
    // Seulement le service d'images de Sanity (jamais une adresse quelconque venue des données).
    if (!p.photoUrl.startsWith('https://cdn.sanity.io/')) throw new Error(`Photo hors Sanity refusée : ${p.photoUrl}`);
    const r = await fetch(urlImage(p.photoUrl, W, H, p.photoFp).replace('fm=webp', 'fm=jpg'));
    return Buffer.from(await r.arrayBuffer());
  }
  const fichier = join(racine, 'src/assets/photos', p.photo);
  const meta = await sharp(fichier).metadata();
  const [px, py] = (p.position ?? 'center 30%').split(/\s+/);
  const fx = fraction(px, 0.5), fy = fraction(py ?? px, 0.5);
  const iw = meta.width!, ih = meta.height!;
  let cw = iw, ch = ih;
  if (iw / ih > W / H) cw = Math.round(ih * (W / H)); else ch = Math.round(iw / (W / H));
  return sharp(fichier)
    .extract({ left: Math.round((iw - cw) * fx), top: Math.round((ih - ch) * fy), width: cw, height: ch })
    .resize(W, H).jpeg({ quality: 82 }).toBuffer();
}

const el = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) =>
  ({ type, props: { style, children, ...extra } });

export const GET: APIRoute = async ({ props }) => {
  const p = (props as { p: Pensee }).p;
  const img = `data:image/jpeg;base64,${(await photo(p)).toString('base64')}`;
  const longueur = (p.titre + ' ' + (p.titreEm ?? '')).length;
  const taille = longueur > 40 ? 56 : longueur > 26 ? 64 : 72;
  const mots = [
    ...p.titre.split(/\s+/).map((m) => ({ m, em: false })),
    ...(p.titreEm ?? '').split(/\s+/).filter(Boolean).map((m) => ({ m, em: true })),
  ];
  const arrondi = { borderTopLeftRadius: 210, borderTopRightRadius: 210, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 };

  const arbre = el('div', { width: 1200, height: 630, display: 'flex', alignItems: 'center', gap: 56, padding: '0 72px', backgroundColor: '#1E3B2F' }, [
    el('div', { display: 'flex', flexDirection: 'column', flex: 1 }, [
      el('div', { fontFamily: 'N', fontWeight: 800, fontSize: 17, letterSpacing: 3.7, textTransform: 'uppercase', color: '#C9A24B' }, `Pensée · ${THEMES[p.theme]}`),
      el('div', { display: 'flex', flexWrap: 'wrap', marginTop: 22, fontFamily: 'C', fontSize: taille, lineHeight: 1.05, color: '#FBF7F1' },
        mots.map(({ m, em }) => el('span', { marginRight: taille * 0.24, fontStyle: em ? 'italic' : 'normal', color: em ? '#C9A24B' : '#FBF7F1' }, m))),
      el('div', { display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, fontFamily: 'C', fontStyle: 'italic', fontWeight: 600, fontSize: 30, color: '#FBF7F1' }, [
        el('span', {}, 'Race Élue Disanka'),
        el('img', { width: 18, height: 18 }, undefined, { src: ETOILE, width: 18, height: 18 }),
      ]),
    ]),
    el('div', { display: 'flex', position: 'relative', width: 420, height: 520, marginTop: 40 }, [
      el('div', { position: 'absolute', top: -14, left: 14, right: -14, bottom: 14, border: '2px solid #C9A24B', ...arrondi }),
      el('img', { position: 'absolute', top: 0, left: 0, width: 420, height: 520, objectFit: 'cover', ...arrondi }, undefined, { src: img, width: 420, height: 520 }),
    ]),
  ]);

  const svg = await satori(arbre as never, { width: 1200, height: 630, fonts: POLICES });
  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
