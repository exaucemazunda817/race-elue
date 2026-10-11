// Photos des bandeaux, page par page.
// Décision de Mazunda (11/10/2026) : les bandeaux n'utilisent QUE les 7 portraits de la séance « Ange Photo du
// Ciel » (numérotés ci-dessous). Ils sont petits (718 à 805 px de large) : sur ordinateur la photo nette garde
// sa taille réelle sur la gauche, le texte est à droite ; sur téléphone elle remplit l'écran. À remplacer par
// les originaux en haute définition dès qu'ils sont disponibles.
// `pos` : cadrage de la photo nette sur ordinateur (le visage doit rester dans le tiers haut de la photo) ;
// `posMobile` : cadrage sur téléphone. Les pourcentages viennent de la position du visage dans chaque photo.
import type { HeroPhoto } from '../components/PageHero.astro';

const P = {
  /* 1 */ arches: { src: 'portrait-arches.jpg', alt: 'Race Élue Disanka, souriante, les mains sur les hanches, devant des arches éclairées', pos: '50% 0%', posMobile: '48% 50%' },
  /* 2 */ rire: { src: 'studio-laugh.jpg', alt: 'Race Élue rit, assise sur une chaise devant un cœur de lumière', pos: '50% 56%', posMobile: '45% 50%' },
  /* 3 */ posee: { src: 'studio-posee.jpg', alt: 'Race Élue assise, regard posé, devant un cœur de lumière', pos: '50% 62%', posMobile: '45% 50%' },
  /* 4 */ studio: { src: 'studio-smile.jpg', alt: 'Race Élue assise, souriante, devant un cœur de lumière', pos: '50% 62%', posMobile: '42% 50%' },
  /* 5 */ ordi: { src: 'laptop.jpg', alt: 'Race Élue rit, assise avec son ordinateur portable', pos: '50% 20%', posMobile: '38% 50%' },
  /* 6 */ serieuse: { src: 'portrait-serious.jpg', alt: 'Portrait de Race Élue Disanka devant des arches éclairées', pos: '50% 2%', posMobile: '50% 50%' },
  /* 7 */ ordi2: { src: 'laptop-talk.jpg', alt: 'Race Élue souriante, assise avec son ordinateur, la main ouverte', pos: '50% 17%', posMobile: '38% 50%' },
} satisfies Record<string, HeroPhoto>;

export const PORTRAITS: HeroPhoto[] = Object.values(P);

// Une seule photo par page (demande de Mazunda, 11/10/2026) : pas de défilement. Sept portraits pour dix pages,
// donc quelques-uns servent deux fois. Choix fait d'après deux contraintes mesurées sur téléphone, où le texte occupe
// le bas du bandeau : plus la page a de texte, plus le visage doit être haut dans la photo (arches et sérieuse :
// visage dans le tiers haut ; ordinateur portable : un peu plus bas ; assise sur la chaise : à mi-hauteur,
// réservée aux pages à texte court). Ne pas échanger sans revérifier le visage sur téléphone.
export const HERO = {
  accueil: [P.arches],
  apropos: [P.ordi2],
  publications: [P.studio],
  ebook: [P.arches],
  magazine: [P.serieuse],
  guerie: [P.ordi2],
  pensees: [P.rire],
  contact: [P.ordi],
  temoignages: [P.posee],
  mentions: [P.serieuse],
};

// Bandeau d'un article du blog : sa propre photo si elle est en portrait (elle remplit le cadre sans être
// agrandie), sinon un des 7 portraits, choisi d'après l'adresse de l'article (toujours le même pour un article).
const PAYSAGES_LOCAUX = new Set(['stage.jpg', 'laugh-outdoor.jpg']);
export const photoPensee = (
  p: { slug: string; photo: string; photoUrl?: string; photoW?: number; photoH?: number; photoAlt?: string; position?: string },
  alt = 'Race Élue Disanka',
): HeroPhoto[] => {
  const portrait = p.photoUrl ? (p.photoW ?? 0) > 0 && (p.photoH ?? 0) > (p.photoW ?? 0) : !PAYSAGES_LOCAUX.has(p.photo);
  if (portrait) {
    if (p.photoUrl) return [{ src: '', url: p.photoUrl, w: p.photoW, h: p.photoH, alt: p.photoAlt ?? alt, pos: p.position, posMobile: p.position }];
    const connue = PORTRAITS.find((x) => x.src === p.photo);
    return [connue ?? { src: p.photo, alt, pos: '50% 25%', posMobile: '50% 50%' }];
  }
  let h = 0;
  for (const c of p.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return [PORTRAITS[h % PORTRAITS.length]];
};
