// Photos des bandeaux, page par page (elles se succèdent en fondu, ordre tiré au hasard après la 1re).
// `pos` : cadrage sur ordinateur (bandeau large) ; `posMobile` : cadrage sur téléphone (bandeau haut).
// Photos de la séance « Ange Photo du Ciel » fournies avec les maquettes (petites : 805 px de large pour
// les portraits) ; à remplacer par les originaux en haute définition dès qu'ils sont disponibles.
import type { HeroPhoto } from '../components/PageHero.astro';

const P = {
  arches: { src: 'portrait-arches.jpg', alt: 'Race Élue Disanka, souriante, en blazer crème devant des arches éclairées', pos: '50% 24%', posMobile: '50% 14%' },
  serieuse: { src: 'portrait-serious.jpg', alt: 'Portrait de Race Élue Disanka devant des arches éclairées', pos: '50% 22%', posMobile: '50% 12%' },
  studio: { src: 'studio-smile.jpg', alt: 'Race Élue assise, souriante, devant un cœur de lumière', pos: '50% 38%', posMobile: '50% 26%' },
  rire: { src: 'studio-laugh.jpg', alt: 'Race Élue rit, assise en studio', pos: '50% 38%', posMobile: '50% 26%' },
  posee: { src: 'studio-posee.jpg', alt: 'Race Élue assise en studio, regard posé, devant un cœur de lumière', pos: '50% 40%', posMobile: '50% 28%' },
  nb: { src: 'studio-nb.jpg', alt: 'Portrait en noir et blanc de Race Élue, assise devant un cœur de lumière', pos: '50% 42%', posMobile: '50% 30%' },
  ordi: { src: 'laptop.jpg', alt: 'Race Élue rit devant son ordinateur', pos: '50% 28%', posMobile: '50% 18%' },
  ordi2: { src: 'laptop-talk.jpg', alt: 'Race Élue souriante devant son ordinateur', pos: '50% 28%', posMobile: '50% 18%' },
  ordiNb: { src: 'laptop-nb.jpg', alt: 'Portrait en noir et blanc de Race Élue, souriante, devant son ordinateur', pos: '50% 32%', posMobile: '50% 22%' },
  herbe: { src: 'grass.jpg', alt: "Race Élue assise dans l'herbe, regardant au loin", pos: '50% 45%', posMobile: '45% 40%' },
  herbeSourire: { src: 'herbe-sourire.jpg', alt: 'Race Élue sourit, dans un jardin', pos: '50% 62%', posMobile: '50% 55%' },
  porte: { src: 'porte-sourire.jpg', alt: 'Race Élue sourit, devant une porte en bois', pos: '60% 42%', posMobile: '55% 35%' },
  dehors: { src: 'laugh-outdoor.jpg', alt: 'Race Élue éclate de rire en extérieur', pos: '45% 38%', posMobile: '44% 30%' },
  pupitre: { src: 'stage.jpg', alt: "Race Élue au pupitre, micro en main, lors d'un culte", pos: '55% 35%', posMobile: '40% 35%' },
} satisfies Record<string, HeroPhoto>;

export const HERO = {
  // Accueil : une seule photo, en format paysage (elle remplit l'écran sans être trop agrandie).
  accueil: [P.dehors],
  publications: [P.studio, P.ordi, P.ordiNb],
  ebook: [P.studio, P.rire, P.nb],
  magazine: [P.pupitre, P.serieuse, P.ordiNb],
  pensees: [P.ordi2, P.herbe, P.herbeSourire],
  guerie: [P.dehors, P.herbe, P.herbeSourire, P.rire],
  apropos: [P.serieuse, P.arches, P.posee, P.pupitre],
  contact: [P.porte, P.pupitre, P.ordi2],
  temoignages: [P.herbe, P.dehors, P.rire],
  mentions: [P.ordi],
};
export const photoPensee = (src: string, alt = 'Race Élue Disanka'): HeroPhoto[] => {
  const base = Object.values(P).find((p) => p.src === src);
  return [base ?? { src, alt, pos: '50% 35%' }];
};
