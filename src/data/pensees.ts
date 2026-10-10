// Pensées et méditations : textes réels de Race Élue Disanka, repris mot pour mot du magazine
// « Devenu une légende », N°01 (février 2026). Les textes d'exemple des maquettes ont été retirés
// (règle commune aux sites de Mazunda : un contenu non vérifié n'est jamais affiché).
// Titres : ceux du magazine, sauf deux tirés d'une phrase de l'autrice (« Ton Dieu n'est pas mort »,
// « Il y a encore de l'espoir ») parce que le titre d'origine ne tient pas seul hors du magazine.

export type Theme = 'foi' | 'epreuve' | 'priere';
export type Bloc =
  | { type: 'p'; texte: string; html?: string } // html : gras/italique venant de l'espace d'écriture (échappé)
  | { type: 'h2'; texte: string }
  | { type: 'verset'; texte: string; ref: string }
  | { type: 'video'; youtubeId: string; duree: string };

export type Pensee = {
  slug: string;
  titre: string;
  titreEm?: string; // partie du titre en italique
  theme: Theme;
  duree: string;
  date: string; // affichage (le magazine est daté au mois)
  dateIso?: string; // pour <time datetime> et les données structurées
  photo: string; // photo locale (src/assets/photos) ; vide pour un article venu de Sanity
  photoUrl?: string; // photo venue de Sanity
  photoW?: number;
  photoH?: number;
  photoAlt?: string;
  photoFp?: { x: number; y: number }; // point du visage choisi par l'autrice (0 à 1)
  position?: string;
  resume: string;
  rubrique?: string; // rubrique d'origine dans le magazine (extraits du magazine seulement)
  page?: number; // page du magazine
  video?: { duree: string; youtubeId?: string };
  corps: Bloc[];
  priere?: string;
  alaune?: boolean;
};

export const THEMES: Record<Theme, string> = {
  foi: 'Foi',
  epreuve: "Traverser l'épreuve",
  priere: 'Prière',
};

const p = (texte: string): Bloc => ({ type: 'p', texte });

const BRUT: Omit<Pensee, 'duree'>[] = [
  {
    slug: 'la-foi-pendant-l-epreuve',
    titre: 'La foi',
    titreEm: "pendant l'épreuve",
    theme: 'epreuve',
    date: 'février 2026',
    photo: 'grass.jpg',
    position: 'center 58%',
    rubrique: 'Méditation',
    page: 12,
    alaune: true,
    resume: 'On ne sait jamais combien de temps nous serons appelés à vivre une situation difficile. Mais ce que nous devenons à travers elle tient à un choix : celui de croire.',
    corps: [
      p('On ne sait jamais combien de temps nous serons appelés à vivre une situation difficile. Mais ce que nous devenons à travers elle tient à un choix : celui de croire.'),
      p("Avoir la foi pendant l'épreuve est difficile. Pourtant, pour sortir vivant du désert, il faut croire en l'existence de Dieu et en la réalité de ses promesses pour nous."),
      p('Le chemin est peut-être encore long, mais la foi est le carburant qui renouvelle nos forces pendant la marche. Nos forces se renouvellent dès que nos yeux sont fixés sur le Seigneur, et sur l\'objectif et le rêve qu\'il a mis en nous.'),
      p('Les choses peuvent être contraires autour de nous ; gardons pourtant les yeux fixés sur Jésus, « le chef et le consommateur de la foi » (Hébreux 12:2). Quand nos yeux sont sur lui, ils se ferment à ce que l\'on voit et à ce que l\'on vit.'),
      p("Si tu décides aujourd'hui d'abandonner dans le désert, personne ne parlera jamais de toi. Mais ton histoire prend tout son sens quand tu décides de croire et d'avancer malgré tout. C'est ainsi que tu deviendras une légende."),
    ],
  },
  {
    slug: 'l-epreuve-obstacle-ou-tremplin',
    titre: "L'épreuve,",
    titreEm: 'obstacle ou tremplin ?',
    theme: 'epreuve',
    date: 'février 2026',
    photo: 'stage.jpg',
    position: '40% center',
    rubrique: 'Réflexion',
    page: 9,
    resume: "Israël a passé 430 ans en Égypte et 40 ans dans le désert. Ce que Dieu prévoit pour toi est glorieux : il se sert de chaque difficulté pour te rendre prêt, et non surpris.",
    corps: [
      p('Israël a passé 430 ans en Égypte et 40 ans dans le désert. Job, si riche qu\'il était, s\'est retrouvé en un seul jour dépouillé de tout…'),
      p('Ce que Dieu prévoit pour toi est glorieux. C\'est pourquoi il se sert de chaque difficulté que tu rencontres pour te rendre prêt, et non surpris !'),
      p("Je définis toujours l'épreuve comme l'ensemble des moyens difficiles et douloureux que Dieu utilise pour préparer l'homme à la gloire."),
      p("Pourquoi parler d'être surpris ? Parce qu'il existe des hommes que la gloire a surpris. N'y ayant pas été préparés, ils l'ont vite perdue. Saül n'avait pas appris à diriger. Un jour qu'il cherchait les ânesses de son père, il rencontre Samuel, qui l'oint pour la royauté. Il n'a pas duré, et il a vite perdu son trône."),
      { type: 'h2', texte: "Forgé par l'épreuve" },
      p("La Bible nous parle aussi de David, fils d'Isaï. Tout jeune, son père l'envoie garder les brebis ; là, il affronte les lions et les ours. Alors, lorsqu'il se retrouve devant Goliath, il parle avec assurance !"),
      p("Et après sa victoire, David ne devient pas roi tout de suite. Il sert Saül, qui le jalouse et cherche à tout prix à le faire mourir. Mais toutes ces difficultés ont forgé David et l'ont préparé à la royauté. Ne rejette pas l'épreuve. Si tu es éprouvé, c'est que tu as une grande destinée devant toi, et que tu dois y être préparé pour ne pas la perdre comme Saül."),
      { type: 'h2', texte: 'Pourquoi tout ce chemin ?' },
      p("Après quarante ans dans le désert, Israël reçoit enfin l'explication de ce long chemin. On pourrait se dire : « Dieu est assez grand pour me faire passer directement de l'Égypte à la terre promise. Pourquoi tout ce chemin ? »"),
      { type: 'verset', texte: "Souviens-toi de tout le chemin que l'Éternel, ton Dieu, t'a fait faire pendant ces quarante années dans le désert…", ref: 'Deutéronome 8:2' },
      p("Dieu voulait qu'Israël apprenne que l'homme ne vit pas de pain seulement (v. 3), à se garder d'oublier l'Éternel (v. 11), à prendre garde que son cœur ne s'enfle (v. 14), et à ne pas dire en son cœur : « Ma force et la puissance de ma main m'ont acquis ces richesses » (v. 17)."),
      { type: 'h2', texte: "Un signe d'amour" },
      p("En me lisant, j'aimerais que tu sois rassuré : l'épreuve n'est pas un obstacle à tes projets ni à tes rêves. Elle est un signe d'amour, et la preuve de la valeur de ce que Dieu te réserve."),
      p("Un signe d'amour, parce que Dieu ne veut pas que ton cœur s'éloigne de lui une fois que tu auras tout accompli. Sinon, tu pourrais encore tout perdre, comme Saül. La preuve de la valeur de ce qu'il te réserve, parce que ce que Dieu donne est si précieux qu'il ne le confie pas à quelqu'un qui ne saurait pas le gérer."),
      { type: 'h2', texte: 'Ne meurs pas dans le désert' },
      p("Si David n'avait pas passé tant de temps auprès d'un Saül méchant et jaloux, qui le poursuivait pour le faire mourir, il ne serait jamais arrivé à la royauté. Il ne l'aurait pas non plus transmise à plusieurs générations après lui."),
      p("Parfois, nous remettons en cause les promesses de Dieu à cause des difficultés. J'aimerais que tu lises ceci en te disant : « Dieu a un plan pour moi. » Ne baisse pas les bras. Pleure s'il le faut, mais ne te regarde pas comme puni par Dieu ! Il a un plan pour toi au milieu de toutes ces épreuves, et ce n'est pas le moment d'abandonner. Ne meurs pas dans le désert, comme certains l'ont fait."),
    ],
    priere: "Que Dieu te donne assez de force et de courage. Qu'il t'accorde de demeurer à ses pieds, même quand tout semble aller à l'encontre de sa pensée. L'épreuve ne te tuera pas. Notre destination, c'est la terre promise. Le désert n'est qu'un chemin de passage.",
  },
  {
    slug: 'la-foi-oser-sans-garantie',
    titre: 'La foi,',
    titreEm: 'oser sans garantie',
    theme: 'foi',
    date: 'février 2026',
    photo: 'laptop.jpg',
    position: 'center 30%',
    rubrique: 'Dossier',
    page: 7,
    resume: "Avoir la foi, c'est avoir une confiance absolue en un avenir incertain. C'est cette confiance qui a permis à beaucoup d'agir dans certaines saisons.",
    corps: [
      p("La foi est le moyen par lequel l'homme croit en une réalité qui lui est étrangère, invisible, inconnue. Avoir la foi, c'est avoir une confiance absolue en un avenir incertain. C'est cette confiance qui a permis à beaucoup d'agir dans certaines saisons."),
      p("Abraham décide, par simple obéissance, de quitter la maison de son père pour un lieu qu'il ne connaissait pas. Cette obéissance, c'est la foi qui l'a suscitée."),
      p("Parfois, nous n'agissons pas, ou nous réfléchissons trop, parce que la foi nous manque. Si Abraham avait hésité, peut-être ne l'appellerait-on pas aujourd'hui le père d'une multitude. Certaines désobéissances sont le reflet d'un cœur qui manque de foi."),
      { type: 'verset', texte: "C'est par la foi qu'Abraham, lors de sa vocation, obéit et partit (…) sans savoir où il allait.", ref: 'Hébreux 11:8' },
      { type: 'h2', texte: 'Oser sans garantie' },
      p("Prenons un exemple. Un homme d'affaires décide d'investir dans une nouvelle activité. Il emprunte, sollicite des partenaires, sans savoir s'il ne va pas perdre de l'argent. Il ose malgré tout, et obtient des résultats supérieurs à ce qu'il avait prévu."),
      p("Humainement, c'est un acte de courage et de détermination. Mais on n'ose jamais vraiment si, au-dedans, rien ne nous y pousse. La foi, c'est aussi une confiance envers Dieu : pour investir dans le vide et en sortir gagnant, il faut avoir la foi."),
      p("Beaucoup ont abandonné un projet d'entreprise faute de motivation. Et ce manque de motivation venait d'une seule question : « Est-ce que j'y arriverai ? » Celui qui a la foi ne se demande pas s'il y arrivera. Il dit : « J'y arriverai ! »"),
      { type: 'h2', texte: "Noé, ou l'obéissance de la foi" },
      p("Le livre de la Genèse dit simplement que Noé a obéi et qu'il a construit l'arche. Mais l'épître aux Hébreux, elle, parle de foi (Hébreux 11:7). Car l'obéissance, le courage et la détermination naissent tous de la foi."),
      p('Un cœur qui croit obéit, un cœur qui croit agit, un cœur qui croit ne lâche pas !'),
    ],
    priere: "Que tu arrêtes de douter. Tu es responsable de ton histoire, et il suffit d'un peu de toi pour tout changer dans ta vie et devenir une légende, comme les autres.",
  },
  {
    slug: 'ton-dieu-n-est-pas-mort',
    titre: "Ton Dieu",
    titreEm: "n'est pas mort",
    theme: 'foi',
    date: 'février 2026',
    photo: 'studio-laugh.jpg',
    position: 'center 35%',
    rubrique: 'Avant-propos',
    page: 6,
    resume: "Parfois, tu as l'impression que Dieu t'a oublié. Non, il ne t'a pas oublié : il travaille dans les coulisses pour ton bien.",
    corps: [
      p("Avant même de parler de la foi, je veux te faire comprendre une chose. Ce magazine ne parlera pas seulement des hommes et des femmes de la Bible. Il parlera aussi de personnes qui ne sont peut-être jamais allées à l'église comme toi et moi, mais qui sont devenues des légendes, c'est-à-dire une source de force et de motivation pour beaucoup."),
      p("Mon intention est simple : si quelqu'un qui n'a peut-être jamais adressé une prière à Dieu a pu voir les choses changer et se tirer des difficultés de la vie, à combien plus forte raison toi et moi !"),
      p("Je veux te rappeler que ton Dieu est vivant. Il n'est pas mort, il agit encore, et rien ne peut faire obstacle à sa pensée."),
      p("Parfois, tu as l'impression que Dieu t'a oublié. Non, il ne t'a pas oublié : il travaille dans les coulisses pour ton bien. Ton Dieu n'est pas mort."),
    ],
    priere: "Que Dieu fortifie ton cœur. Tu as l'impression que tout marche pour les autres, mais pas pour toi ; tu regardes ton âge, et le résultat ne ressemble pas à ce que tu espérais… Que le Seigneur te nourrisse de plus de foi que de peur, et que les saisons changent pour toi, pour ta famille, ton travail, tes relations et ta santé. Que Dieu soit ta force. Toi aussi, tu deviendras une légende : alors, s'il te plaît, n'abandonne pas.",
  },
  {
    slug: 'ils-ont-cru',
    titre: 'Ils',
    titreEm: 'ont cru',
    theme: 'foi',
    date: 'février 2026',
    photo: 'portrait-serious.jpg',
    position: 'center 18%',
    rubrique: 'Hébreux 11',
    page: 5,
    resume: "Le chapitre 11 de l'épître aux Hébreux raconte l'histoire d'hommes et de femmes qui ont reçu un témoignage favorable grâce à la foi.",
    corps: [
      p("Le chapitre 11 de l'épître aux Hébreux raconte tout entier l'histoire d'hommes et de femmes qui ont reçu un témoignage favorable grâce à la foi."),
      p("Leur vie a été si remarquable qu'ils sont devenus un modèle de foi pour des générations entières. Car l'impact d'une vie ne se mesure pas seulement à ce qu'elle a fait, mais à ce qu'elle apporte encore, des générations après elle."),
      p("La Bible insiste sur un point : tous ont eu foi en Dieu. La foi dans la difficulté. La foi dans l'attente des promesses. La foi dans l'espérance d'une vie meilleure. La foi qui se détache de ce qui se voit pour s'attacher à l'invisible."),
      p("Découvrons ensemble ce qu'est réellement la foi, et pourquoi elle joue un rôle dans ce que nous devenons."),
    ],
  },
  {
    slug: 'il-y-a-encore-de-l-espoir',
    titre: 'Il y a encore',
    titreEm: "de l'espoir",
    theme: 'priere',
    date: 'février 2026',
    photo: 'laugh-outdoor.jpg',
    position: '38% center',
    rubrique: 'Conclusion et prière',
    page: 25,
    resume: "J'ai un message pour toi : il y a encore de l'espoir pour les vivants ! Dieu n'est pas mort. Ne baisse pas les bras.",
    corps: [
      p("J'espère que cette lecture t'a fait du bien. J'ai un message pour toi : il y a encore de l'espoir pour les vivants ! Dieu n'est pas mort."),
      p("Ne baisse pas les bras. C'est peut-être sombre pour toi aujourd'hui, mais sache qu'un jour tu verras la gloire de Dieu. Tu essaies, mais tu ne vois rien ? Ce n'est pas grave : essaie encore. Ne baisse pas les bras, frappe encore, et l'on t'ouvrira (Matthieu 7:7)."),
      p("Tu viens peut-être d'une famille sans nom ? Ne t'en fais pas : même de Nazareth, Jésus est sorti (Jean 1:46). Dieu ne regarde pas d'où tu viens pour agir dans ta vie."),
      p("Ce que tu vois comme un obstacle n'en est pas un pour Dieu : c'est juste un moyen pour lui d'agir. Ne te compare pas, apprécie chaque jour la personne que tu deviens. Un jour, on parlera aussi de toi. Même si ce ne sont pas cent personnes, une seule pourra parler de toi !"),
      p("N'oublie pas que Dieu est vivant. Il est donc possible d'écrire une nouvelle histoire : crois encore, prie, travaille, forme-toi !"),
      { type: 'verset', texte: 'Avec Dieu, nous ferons des exploits ; il écrasera nos ennemis.', ref: 'Psaume 60:12' },
    ],
    priere: "Que le Seigneur Jésus, qui a souffert sur la croix, porte tes peines et te donne la force d'avancer. Que rien ne te fasse douter, qu'aucun échec ne soit un obstacle pour toi. Même dans les larmes, que ton histoire s'écrive ! Tu deviendras toi aussi une légende : un jour, on pourra lire ton histoire et en être fortifié, parce que Dieu est avec toi.",
  },
];

// Durée de lecture calculée sur le texte réel (200 mots par minute, prière comprise).
const minutes = (x: Omit<Pensee, 'duree'>) => {
  const txt = x.corps.map((b) => ('texte' in b ? b.texte : '')).join(' ') + ' ' + (x.priere ?? '');
  return `${Math.max(1, Math.round(txt.split(/\s+/).filter(Boolean).length / 200))} min`;
};

export const PENSEES: Pensee[] = BRUT.map((x) => ({ ...x, dateIso: '2026-02', duree: minutes(x) }));

export const titreComplet = (p: Pensee) => (p.titreEm ? `${p.titre} ${p.titreEm}` : p.titre);
export const kickerCarte = (p: Pensee) => `${THEMES[p.theme]} · ${p.duree}`;
export const themesUtilises = () => [...new Set(PENSEES.map((x) => x.theme))];
