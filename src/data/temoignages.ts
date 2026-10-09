// Témoignages. ATTENTION : ceux-ci sont les textes d'exemple des maquettes.
// À remplacer par de vrais témoignages, publiés uniquement avec l'accord écrit de chaque personne
// (accord: true, exemple: false). Les textes d'exemple ne s'affichent jamais (règle commune aux sites de Mazunda).

export type Temoignage = {
  texte: string;
  court?: string; // version courte pour mobile
  auteur: string; // initiale + ville
  source: 'Ebook' | 'Communauté' | 'Magazine' | 'Pensées';
  exemple: boolean;
  accord: boolean;
};

export const TEMOIGNAGES: Temoignage[] = [
  {
    texte: "J'ai lu l'ebook en une soirée. Pour la première fois, j'ai osé nommer ma blessure devant Dieu.",
    auteur: 'M., Kinshasa', source: 'Ebook', exemple: true, accord: false,
  },
  {
    texte: 'Le groupe Guérie et Épanouie m\'a montré que je n\'étais pas seule. On prie les unes pour les autres.',
    court: "Le groupe m'a montré que je n'étais pas seule.",
    auteur: 'D., Lubumbashi', source: 'Communauté', exemple: true, accord: false,
  },
  {
    texte: 'Le magazine m\'a redonné envie de lire la Bible. Je le partage avec mes sœurs à Bruxelles.',
    court: "Le magazine m'a redonné envie de lire la Bible.",
    auteur: 'S., Bruxelles', source: 'Magazine', exemple: true, accord: false,
  },
  {
    texte: "La pensée sur le temps m'a libérée. J'arrête de me presser d'aller bien.",
    auteur: 'R., Paris', source: 'Pensées', exemple: true, accord: false,
  },
  {
    texte: "J'ai pu dire des choses que je n'avais jamais dites à personne, sans honte.",
    auteur: 'A., Kinshasa', source: 'Communauté', exemple: true, accord: false,
  },
  {
    texte: 'Même depuis Lyon, je me sens portée par mes sœurs chaque semaine.',
    auteur: 'E., Lyon', source: 'Communauté', exemple: true, accord: false,
  },
];

/** Témoignages affichables : réels ET publiés avec accord. Tant qu'il n'y en a aucun, les sections témoignages sont masquées. */
export const PUBLIES = TEMOIGNAGES.filter((t) => t.accord && !t.exemple);
export const premiers = (n: number) => PUBLIES.slice(0, n);
