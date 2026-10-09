// Pensées et méditations. ATTENTION : textes d'exemple repris des maquettes, à remplacer
// par les vraies pensées de Race Élue (champ `exemple` à passer à false une fois le texte réel en place).

export type Theme = 'guerison' | 'identite' | 'priere' | 'creativite' | 'foi';
export type Bloc =
  | { type: 'p'; texte: string }
  | { type: 'h2'; texte: string }
  | { type: 'verset'; texte: string; ref: string }
  | { type: 'video'; youtubeId: string; duree: string };

export type Pensee = {
  slug: string;
  titre: string;
  titreEm?: string; // partie du titre en italique
  theme: Theme;
  duree: string;
  date?: string; // AAAA-MM-JJ
  photo: string; // nom de fichier dans src/assets/photos
  position?: string; // object-position de la photo
  resume?: string;
  video?: { duree: string; youtubeId?: string };
  corps: Bloc[];
  priere?: string;
  alaune?: boolean;
  exemple: boolean;
};

export const THEMES: Record<Theme, string> = {
  guerison: 'Guérison intérieure',
  identite: 'Identité',
  priere: 'Prière',
  creativite: 'Créativité',
  foi: 'Foi',
};

const aRemplacer: Bloc[] = [
  { type: 'p', texte: "Texte d'exemple : cette pensée sera remplacée par le texte réel de Race Élue." },
];

export const PENSEES: Pensee[] = [
  {
    slug: 'dieu-guerit-avec-le-temps',
    titre: 'Dieu guérit',
    titreEm: 'avec le temps',
    theme: 'guerison',
    duree: '5 min',
    date: '2026-03-12',
    photo: 'grass.jpg',
    position: 'center 58%',
    resume: "Et si la lenteur de ta guérison n'était pas un échec, mais une manière dont Dieu prend soin de toi ?",
    alaune: true,
    exemple: true,
    corps: [
      { type: 'p', texte: "On aimerait parfois que la guérison soit instantanée. Une prière, une parole, et tout serait réglé. Pourtant, dans ma vie, Dieu a souvent choisi un autre chemin : celui du temps." },
      { type: 'p', texte: "Le temps n'est pas l'ennemi de ta guérison. C'est l'espace dans lequel Dieu travaille, couche après couche, avec une patience que nous n'avons pas toujours pour nous-mêmes." },
      { type: 'h2', texte: 'Accepter le rythme de Dieu' },
      { type: 'p', texte: "Accepter le rythme de Dieu, c'est arrêter de se comparer, et reconnaître chaque petit pas comme une victoire." },
      { type: 'verset', texte: 'Il y a un temps pour tout, un temps pour toute chose sous les cieux.', ref: 'Ecclésiaste 3.1' },
      { type: 'p', texte: "Aujourd'hui, je t'invite à regarder le chemin parcouru plutôt que celui qui reste." },
    ],
    priere: "Seigneur, apprends-moi à te faire confiance dans la lenteur. Je remets entre tes mains ce qui n'est pas encore guéri. Amen.",
  },
  {
    slug: 'tu-es-plus-que-ce-qui-t-a-blessee',
    titre: "Tu es plus que ce qui t'a blessée",
    theme: 'identite', duree: '4 min', photo: 'grass.jpg', position: 'center 60%', exemple: true, corps: aRemplacer,
  },
  {
    slug: 'prier-quand-on-n-a-plus-de-mots',
    titre: "Prier quand on n'a plus de mots",
    theme: 'priere', duree: '8 min', photo: 'stage.jpg', position: '40% center',
    video: { duree: '8 min' }, // youtubeId à renseigner
    exemple: true, corps: aRemplacer,
  },
  {
    slug: 'creer-avec-dieu-quand-on-se-sent-vide',
    titre: 'Créer avec Dieu quand on se sent vide',
    theme: 'creativite', duree: '4 min', photo: 'laptop.jpg', position: 'center 30%', exemple: true, corps: aRemplacer,
  },
  {
    slug: 'reconnaitre-sa-blessure-sans-honte',
    titre: 'Reconnaître sa blessure sans honte',
    theme: 'guerison', duree: '6 min', photo: 'studio-laugh.jpg', position: 'center 35%', exemple: true, corps: aRemplacer,
  },
  {
    slug: 'la-joie-est-aussi-un-acte-de-foi',
    titre: 'La joie est aussi un acte de foi',
    theme: 'foi', duree: '3 min', photo: 'laugh-outdoor.jpg', position: '38% center', exemple: true, corps: aRemplacer,
  },
];

export const titreComplet = (p: Pensee) => (p.titreEm ? `${p.titre} ${p.titreEm}` : p.titre);
export const kickerCarte = (p: Pensee) => (p.video ? `${THEMES[p.theme]} · Vidéo` : `${THEMES[p.theme]} · ${p.duree}`);

export function dateFr(iso?: string) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Kinshasa' }).format(new Date(iso + 'T12:00:00Z'));
}
