// Transfert des pensées écrites dans le code (src/data/pensees.ts) vers Sanity, photos comprises.
// Une seule fois, après la création du projet Sanity. Relançable sans doublon (identifiants fixes).
//
//   node scripts/migrer-pensees-vers-sanity.ts --essai   → montre ce qui serait envoyé, n'envoie rien
//   node scripts/migrer-pensees-vers-sanity.ts           → envoie (jeton requis dans .env.local)
//
// .env.local doit contenir (jamais dans Git, jamais copié dans une discussion) :
//   PUBLIC_SANITY_PROJECT_ID=…            identifiant du projet (public)
//   SANITY_WRITE_TOKEN=…                  jeton « Editor » créé dans sanity.io/manage → API → Tokens
import { createReadStream, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { createClient } from '@sanity/client';
import { PENSEES } from '../src/data/pensees.ts';

const essai = process.argv.includes('--essai');
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!essai && (!projectId || !token)) {
  console.error('Il manque PUBLIC_SANITY_PROJECT_ID ou SANITY_WRITE_TOKEN dans .env.local.');
  process.exit(1);
}
const client = essai ? null : createClient({ projectId: projectId!, dataset, token, apiVersion: '2025-02-19', useCdn: false });

const ALTS: Record<string, string> = {
  'grass.jpg': "Race Élue assise dans l'herbe, regardant au loin",
  'stage.jpg': "Race Élue au pupitre, micro en main, lors d'un culte",
  'laptop.jpg': 'Race Élue rit devant son ordinateur',
  'studio-laugh.jpg': 'Race Élue rit, assise en studio',
  'portrait-serious.jpg': 'Portrait de Race Élue Disanka devant des arches éclairées',
  'laugh-outdoor.jpg': 'Race Élue éclate de rire en extérieur',
};
const cle = () => randomUUID().slice(0, 12);
const frac = (v: string | undefined, d: number) => (!v || v === 'center' ? d : Number.isFinite(parseFloat(v)) ? parseFloat(v) / 100 : d);

const photos = new Map<string, string>(); // fichier → identifiant de l'image dans Sanity
for (const p of PENSEES) {
  if (!photos.has(p.photo)) {
    if (essai) photos.set(p.photo, `image-essai-${p.photo}`);
    else {
      const a = await client!.assets.upload('image', createReadStream(`src/assets/photos/${p.photo}`), { filename: p.photo });
      photos.set(p.photo, a._id);
      console.log(`Photo envoyée : ${p.photo}`);
    }
  }
  const [px, py] = (p.position ?? 'center 30%').split(/\s+/);
  const corps = p.corps.map((b) => {
    if (b.type === 'p' || b.type === 'h2')
      return { _type: 'block', _key: cle(), style: b.type === 'h2' ? 'h2' : 'normal', markDefs: [], children: [{ _type: 'span', _key: cle(), text: b.texte, marks: [] }] };
    if (b.type === 'verset') return { _type: 'verset', _key: cle(), texte: b.texte, ref: b.ref };
    return { _type: 'video', _key: cle(), url: `https://youtu.be/${b.youtubeId}`, duree: b.duree };
  });
  const doc = {
    _id: `pensee-${p.slug}`,
    _type: 'pensee',
    titre: p.titre,
    titreEm: p.titreEm,
    slug: { _type: 'slug', current: p.slug },
    theme: p.theme,
    date: '2026-02-01',
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: photos.get(p.photo)! },
      hotspot: { x: frac(px, 0.5), y: frac(py ?? px, 0.5), width: 0.4, height: 0.4 },
      alt: ALTS[p.photo] ?? 'Race Élue Disanka',
    },
    resume: p.resume,
    corps,
    priere: p.priere,
    alaune: Boolean(p.alaune),
    magazinePage: p.page,
    magazineRubrique: p.rubrique,
  };
  if (essai) console.log(`[essai] ${doc._id} · ${corps.length} blocs · photo ${p.photo} · « ${p.titre}${p.titreEm ? ' ' + p.titreEm : ''} »`);
  else {
    await client!.createOrReplace(doc);
    console.log(`Article envoyé : ${doc._id}`);
  }
}
console.log(essai ? 'Essai terminé : rien n’a été envoyé.' : `Terminé : ${PENSEES.length} articles dans Sanity.`);
