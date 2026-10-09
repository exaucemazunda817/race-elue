// Informations générales du site. Les valeurs marquées « à confirmer » viennent des maquettes
// et attendent la validation de l'autrice (voir README de passation, « En attente de l'autrice »).

export const SITE = {
  nom: 'Race Élue Disanka',
  editeur: 'RED Éditions',
  description:
    "Foi, créativité et guérison des blessures intérieures. Ebook gratuit, magazine de la foi, pensées et méditations, et la communauté Guérie et Épanouie.",
  // Numéro WhatsApp au format international, sans + ni espaces (à confirmer par l'autrice).
  whatsapp: '243996891371',
  whatsappAffiche: '+243 996 891 371',
  email: '', // à confirmer : laisser vide tant que l'adresse n'est pas connue
  eglise: '', // à confirmer
};

export const RESEAUX = [
  { nom: 'TikTok', pseudo: '@_raceeluedisanka', url: 'https://www.tiktok.com/@_raceeluedisanka', icon: 'tiktok-logo' },
  { nom: 'Instagram', pseudo: '@race_elue07', url: 'https://www.instagram.com/race_elue07/', icon: 'instagram-logo' },
  { nom: 'YouTube', pseudo: '@RaceelueDisanka', url: 'https://www.youtube.com/@RaceelueDisanka', icon: 'youtube-logo' },
];

export const NAV = [
  { href: '/a-propos', label: 'À propos', match: '/a-propos' },
  { href: '/publications', label: 'Publications', match: '/publications' },
  { href: '/guerie-et-epanouie', label: 'Guérie et Épanouie', match: '/guerie-et-epanouie' },
  { href: '/pensees', label: 'Pensées', labelLong: 'Pensées et méditations', match: '/pensees' },
];

export const EBOOK = {
  slug: 'comment-dieu-guerit-les-coeurs-brises',
  titre: 'Comment Dieu guérit les cœurs brisés',
  pdf: '/publications/comment-dieu-guerit-les-coeurs-brises.pdf',
  pages: 18,
  poids: 'PDF · 0,6 Mo',
  lecture: '45 min de lecture', // à confirmer
};

export const MAGAZINE = {
  slug: 'devenu-une-legende-n01',
  titre: 'Devenu une légende',
  numero: 'N°01',
  date: 'Février 2026',
  pdf: '/publications/devenu-une-legende-n01.pdf',
  poids: 'PDF · 3,3 Mo',
  pages: 27,
};

/** Lien WhatsApp avec message pré-rempli. */
export function wa(message = 'Bonjour Race Élue, je te contacte depuis ton site.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const MSG = {
  general: 'Bonjour Race Élue, je te contacte depuis ton site.',
  communaute: 'Bonjour, je souhaite rejoindre Guérie et Épanouie.',
  temoignage: 'Bonjour Race Élue, je souhaite partager mon témoignage.',
  invitation: "Bonjour Race Élue, je souhaite t'inviter à intervenir.",
};

// Services externes (à brancher) : si l'adresse est vide, le site utilise une solution de repli
// (WhatsApp pour les messages, téléchargement direct pour l'ebook).
export const ENDPOINTS = {
  newsletter: import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT || '',
  contact: import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
};
