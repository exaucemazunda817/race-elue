// Source unique des articles du blog : Sanity quand il est branché et contient des articles,
// sinon les pensées écrites dans le code (src/data/pensees.ts). Un blog n'est donc jamais vide,
// même avant le transfert des pensées vers Sanity.
import { PENSEES, type Bloc, type Pensee, type Theme } from './pensees';
import { REQUETE_PENSEES, sanity } from '../lib/sanity';

type Span = { _type: 'span'; text: string; marks?: string[] };
type BlocSanity =
  | { _type: 'block'; style?: string; children?: Span[] }
  | { _type: 'verset'; texte: string; ref: string }
  | { _type: 'video'; url: string; duree?: string };

type DocSanity = {
  slug: string; titre: string; titreEm?: string; theme: Theme; date: string; resume: string;
  corps?: BlocSanity[]; priere?: string; alaune?: boolean; magazinePage?: number; magazineRubrique?: string;
  image?: { url?: string; w?: number; h?: number; alt?: string; hotspot?: { x: number; y: number } };
};

const echapper = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = (spans: Span[]) =>
  spans.map((s) => {
    let t = echapper(s.text);
    if (s.marks?.includes('em')) t = `<em>${t}</em>`;
    if (s.marks?.includes('strong')) t = `<strong>${t}</strong>`;
    return t;
  }).join('');

export const idYoutube = (url: string) =>
  url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1];

const JOUR = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
// Un extrait du magazine est daté au mois (comme le magazine), un article du blog au jour.
const MOIS = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const minutes = (corps: Bloc[], priere?: string) => {
  const txt = corps.map((b) => ('texte' in b ? b.texte : '')).join(' ') + ' ' + (priere ?? '');
  return `${Math.max(1, Math.round(txt.split(/\s+/).filter(Boolean).length / 200))} min`;
};

const convertir = (d: DocSanity): Pensee => {
  const corps: Bloc[] = [];
  for (const b of d.corps ?? []) {
    if (b._type === 'block') {
      const spans = b.children ?? [];
      const texte = spans.map((s) => s.text).join('').trim();
      if (!texte) continue;
      if (b.style === 'h2') corps.push({ type: 'h2', texte });
      else corps.push({ type: 'p', texte, html: html(spans) });
    } else if (b._type === 'verset') corps.push({ type: 'verset', texte: b.texte, ref: b.ref });
    else if (b._type === 'video') {
      const id = idYoutube(b.url);
      if (id) corps.push({ type: 'video', youtubeId: id, duree: b.duree ?? '' });
    }
  }
  const hs = d.image?.hotspot;
  return {
    slug: d.slug,
    titre: d.titre,
    titreEm: d.titreEm || undefined,
    theme: d.theme,
    duree: minutes(corps, d.priere),
    date: (typeof d.magazinePage === 'number' ? MOIS : JOUR).format(new Date(d.date)),
    dateIso: typeof d.magazinePage === 'number' ? d.date.slice(0, 7) : d.date,
    photo: '',
    photoUrl: d.image?.url,
    photoW: d.image?.w,
    photoH: d.image?.h,
    photoAlt: d.image?.alt,
    photoFp: hs ? { x: hs.x, y: hs.y } : undefined,
    position: hs ? `${(hs.x * 100).toFixed(0)}% ${(hs.y * 100).toFixed(0)}%` : 'center 30%',
    resume: d.resume,
    rubrique: d.magazineRubrique,
    page: d.magazinePage,
    corps,
    priere: d.priere || undefined,
    alaune: d.alaune,
  };
};

let cache: Promise<Pensee[]> | undefined;

export const chargerPensees = () =>
  (cache ??= (async () => {
    if (!sanity) return PENSEES;
    const docs = await sanity.fetch<DocSanity[]>(REQUETE_PENSEES);
    const liste = docs.filter((d) => d.image?.url).map(convertir);
    return liste.length ? liste : PENSEES;
  })());

export const themesDe = (liste: Pensee[]) => [...new Set(liste.map((x) => x.theme))];
