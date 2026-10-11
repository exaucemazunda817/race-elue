# Race Élue Disanka : site de l'autrice (RED Éditions)

Site vitrine et ministère de Race Élue Disanka : ebook gratuit, magazine « Devenu une légende », pensées et méditations,
communauté « Guérie et Épanouie » (WhatsApp), contact et invitations. Public surtout mobile Android en RDC (3G/4G faible)
et diaspora. Mazunda est prestataire ; il pilote sans coder.

## Source de vérité du design
- `_design/` : paquet de passation (README, 22 maquettes `.dc.html`, `maquettes.pdf`, photos, PDF des publications).
  Haute fidélité : couleurs, tailles, espacements et textes viennent des maquettes. `support.js` = moteur de maquettes, jamais en production.

## Stack
- **Astro 7** (site statique, zéro JS par défaut), choisi comme le recommande la passation pour la légèreté en 3G.
- CSS natif : jetons dans `src/styles/global.css`, styles par composant (`<style>` Astro). Pas de Tailwind.
- Polices auto-hébergées (`@fontsource`) : Cormorant Garamond + Nunito Sans. Jamais de Google Fonts distant.
- Icônes Phosphor duotone insérées en SVG au build (`src/components/Icon.astro`).
- Images : `src/assets/photos` via `<Photo>` (WebP, 400/800/1200, différé sauf héros).
- Commandes : `npm run dev` (port 4321), `npm run build`, `npx astro preview --port 4322`.

## Contenus
- `src/data/site.ts` : WhatsApp, réseaux, ebook, magazine, adresses des services (`PUBLIC_NEWSLETTER_ENDPOINT`, `PUBLIC_CONTACT_ENDPOINT`).
- `src/data/pensees.ts` et `src/data/temoignages.ts` : **textes d'exemple des maquettes** (`exemple: true`), signalés à l'écran.
  À remplacer par les vrais textes ; un témoignage réel n'est publié qu'avec l'accord écrit de la personne.
- `src/data/magazine.ts` : sommaire réel du N°01 (page 3 du PDF). Pages du lecteur : `public/magazine/n01/pXX.webp`
  (générées depuis le PDF, ≈60 Ko chacune). Couvertures réelles : `src/assets/covers/` (page 1 des PDF).
- Extrait de l'ebook : `src/pages/publications/comment-dieu-guerit-les-coeurs-brises/extrait.astro`, texte intégral des pages 3, 4 et 6,
  ponctuation de l'autrice conservée.
- Église (À propos) : « Église missionnaire Parole faite chair », tirée du magazine N°01 (p. 24 et 26), à faire confirmer.

## Formulaires : fonctionnement actuel (aucun service tiers branché)
- Inscription ebook : sans `PUBLIC_NEWSLETTER_ENDPOINT`, redirige vers `/merci?direct=1` avec téléchargement direct du PDF
  (aucune adresse e-mail n'est collectée). Avec l'adresse d'un service (Brevo, MailerLite, Formspree…), envoi en JSON puis `/merci`.
- « Me prévenir » (magazine) : sans service, message renvoyant vers WhatsApp.
- Contact / invitation : sans `PUBLIC_CONTACT_ENDPOINT`, le message est préparé dans WhatsApp (le visiteur n'a qu'à l'envoyer).
- La variante payante de l'ebook (Mobile Money) n'est pas construite : l'ebook est gratuit, et tout paiement exigerait un prestataire (RCCM).

## Hors ligne (PWA légère)
`public/sw.js` : pages en « réseau d'abord » mises en cache, ressources en « cache d'abord », PDF jamais mis en cache d'office.
Page de repli `/hors-ligne`. Le service worker n'est enregistré qu'en production.

## Effets et animations (10/10/2026)
Identité propre au site (arche, rameau, étoile ✦, vert et or), esprit repris de One Love / SUN Market, sans copier leur design.
- `src/styles/motion.css` : tout le mouvement. `src/scripts/motion-inline.js` : moteur d'apparitions, inséré en ligne
  à la fin du `<body>` (avant le premier affichage). Script du `<head>` (Base.astro) : `html.js`, `save-data`, `is-scrolling`,
  décision de l'intro.
- **Intro d'entrée** (`Intro.astro`, classe `.entree`, jamais `.intro` : déjà pris par un bloc du magazine) : arche dorée
  qui se dessine, ✦, nom qui s'écrit, rameau, rideau qui se lève. À l'arrivée sur le site ou à l'actualisation, jamais
  entre deux pages du site (site multi-pages : sinon elle se jouerait à chaque clic). Retirée par CSS à 2,35 s + 0,9 s.
- **Apparitions rejouées à chaque retour** (règle de Mazunda). Remise en attente seulement à plus de 100 px hors de
  l'écran (sinon un bloc au bord clignote en boucle, son décalage de 28 px le faisant entrer et sortir). Révélé dès 12 %
  visible, ou 120 px visibles, ou s'il dépasse déjà en haut (bloc à moitié passé en bas d'une page courte).
  Le bandeau de haut de page (`main > section` en premier enfant) a son entrée en CSS pur, sans attendre le JS (LCP).
- Effets : transitions entre pages (View Transitions natives), photo qui se dévoile en arche, filet doré qui se trace,
  zoom lent, Border Beam doré (formulaires), Shiny Button, Spotlight (cartes), titres flou → net, citations mot à mot
  avec trait d'or (QuoteBand `trait`), rameau qui se trace (`Rameau.astro`, une fois par page), couverture qui s'incline
  au survol, pages du magazine qui glissent, menu mobile en cascade, ✦ du logo qui scintille.
- « Réduire les animations » = aucun mouvement ; économie de données / 2G = boucles coupées. Jamais de lissage du
  défilement (Lenis exclu, cf. Gospel Nation).
- Test anti-contenu-invisible : script `reveal-test.mjs` (défilement lent, saut en bas, milieu, retour en haut).

## Bandeaux photo pleine largeur (10/10/2026, demande de Mazunda « comme One Love »)
- `PageHero.astro` sur toutes les pages (sauf merci, 404, hors ligne) ; photos par page dans `src/data/hero.ts`.
- Site vivant : les photos se succèdent en fondu (6,5 s, ordre tiré au hasard), zoom lent, bouton pause en haut à droite
  (WCAG 2.2.2 ; en bas il recouvrait « M'écrire »). Photos suivantes chargées après la page, jamais en économie de données.
- Photos petites (805 px pour les portraits, exports WhatsApp) : sur ordinateur, la même photo floutée remplit toute la
  largeur et la photo nette, à sa taille réelle, occupe la droite (56 %) en se fondant vers la gauche ; sur téléphone, photo
  pleine. Contraste mesuré sur le pixel le plus clair sous chaque texte : surtitres en or clair (#E2C27A) sur photo, voile
  dense côté texte ; tout ≥ 4,5:1 (lien « Publications » sur pastille : 5,57:1 même sur fond blanc pur).
- 5 photos ajoutées depuis Téléchargements (studio noir et blanc, studio posée, ordinateur noir et blanc, selfie herbe,
  selfie porte). Écartées : Silikin Village (logo d'une autre entreprise), selfie sérieux, capture WhatsApp.
- Bouton « Accueil » ajouté au menu ordinateur (menu resserré entre 1100 et 1280 px).

## Audit design (10/10/2026, skill audit-design-site)
Rapport : `~/Documents/Mazunda/08-Divers/Race-Elue-Disanka/audit-design-2026-10-10.md`. Note 8/10 → 9/10.
- Image de partage propre à chaque pensée : `public/og/pensees/<slug>.jpg` (1200×630, gabarit vert/or/arche,
  thème + titre + photo de l'article). **Toute nouvelle pensée doit avoir la sienne**, sinon l'aperçu WhatsApp casse (404).
- Longueur de lecture : paragraphes d'article et d'extrait `max-width: 30em` (≈ 72 caractères en Cormorant),
  chapô des bandeaux 32em. Ne jamais élargir la colonne de texte au-delà.
- Jamais de texte sous 12 px (les surtitres étaient à 11 px). Ombres : jetons `--ombre-survol`, `--ombre-carte`.

## En-tête flottant, bandeaux et effets (10/10/2026, 2e passe)
- **En-tête = pilule de verre flottante** (comme One Love, aux couleurs du site) : fixe, `top: 12/16px`, fond vert 78 %
  + flou, plus opaque après 40 px de défilement. Menu mobile plein écran en verre, liens en cartes avec flèche.
  Les pages sans bandeau (merci, 404, hors ligne) ont `bodyClass="sans-bandeau"` (espace pour l'en-tête).
- **Bandeaux** : photos jamais agrandies au-delà du raisonnable (décision de Mazunda). Photo **paysage** = couvre tout
  le bandeau ; **portrait** = taille réelle à droite (60 %) + même photo peu floutée (10 px) à gauche. Le voile n'est
  plus sur tout le bandeau : la partie **floue et teintée suit le bloc de texte** (`.ph-txt::before`), le reste de
  la photo reste net. Contraste mesuré ≥ 5:1 sur toutes les pages (`contrast-hero3.mjs`, qui masque `.ph-txt > *`).
- **Accueil** : une seule photo (paysage, rire en extérieur), sans défilement, texte à droite sur ordinateur
  (`cote="droite"`). Seules 2 photos paysage existent (rire, pupitre), en 1080 px : originaux HD toujours souhaités.
- **Effets ajoutés** : titre du bandeau mot par mot, étoiles ✦ qui scintillent, parallaxe de la photo et texte qui
  remonte au défilement (`animation-timeline: scroll()`, ignoré par les vieux navigateurs), boutons aimantés
  (propriété `translate`, ordinateur), fil d'or de progression en haut, bande de mots qui défile sous le bandeau
  de l'accueil, soulignement glissant du menu. Ne jamais animer l'opacité de `.ph-inner` : un parent à opacité
  animée empêche le flou d'arrière-plan du texte de voir la photo.

## 3e passe (10/10/2026, soir) — modèle One Love appliqué, photos en fond, icônes
- **Bandeaux = modèle One Love** : photo plein bandeau, un simple dégradé du côté du texte, **aucun flou** (il
  cachait les visages). Ordinateur : les 2 photos paysage (`PAYSAGES` dans `data/hero.ts`) ; téléphone : les
  portraits de la page (taille réelle, nets). Texte à droite sur ordinateur (visages à gauche des photos).
  Sur téléphone, le dégradé suit le haut du bloc de texte (`.ph-txt::before`, sans flou). Contraste ≥ 4,5 partout.
- **Photos en fond de parties** (contre la sensation de vide) : quatre rendez-vous (Guérie), trois portes (accueil,
  une photo par case), bandes de citation et d'inscription (prop `photo`), réseaux (pastilles en verre comme la
  bande Contact de One Love, + WhatsApp), Mon église (À propos), Pourquoi ce ministère (portrait en filigrane).
- **Icônes** : fin du style duotone (« fait IA ») : logos des réseaux pleins, commandes en trait normal, le reste
  en trait fin (`Icon.astro`). Plus d'icône posée en haut des cartes : numérotation 01, 02… en or.
- **Espacements** : marges de section ramenées à 48/64/80 px (téléphone/tablette/ordinateur) au lieu de 64/88/128.
- Bande défilante dorée (texte vert).

## 4e passe (10/10/2026, nuit)
- Menu : Publications, Guérie et Épanouie, **Blog** (= /pensees ; `/blog` et `/blog/<article>` redirigés, vercel.json),
  À propos. Le blog est l'endroit où l'autrice publie ses articles et pensées (aujourd'hui en ajoutant un texte
  dans `src/data/pensees.ts` + son image de partage ; un outil de publication sans code reste à choisir).
- Pied de page complet sur **toutes** les pages (`footer = 'full'` par défaut dans Base) ; liens resserrés.
- Trois portes : ombre portée en couches + cadre doré décalé (`outline-offset`). Espace crème entre la bande
  d'inscription et la bande des réseaux (deux fonds photo collés).
- À propos, « Trois fils » : cartes à photo en arche (numéro, titre, texte), remplaçant les colonnes + rangée de
  photos ; rangée qui glisse sur téléphone, sans animation d'apparition (saccades, cf. One Love).

## 5e passe (11/10/2026) : bandeaux de page, règle à ne pas défaire
- **Une seule photo par page**, jamais de défilement : uniquement les 7 portraits de la séance « Ange Photo du Ciel »
  (`src/data/hero.ts`, `HERO` page par page, `photoPensee()` pour les articles du blog). Plus la page a de texte,
  plus le visage doit être haut dans la photo (vérifié sur téléphone, où le texte occupe le bas).
- **Texte toujours à droite** (téléphone : bloc en bas, aligné à droite ; ordinateur : colonne de droite).
- **Photo jamais agrandie** : portrait net à sa taille réelle à gauche sur ordinateur, même photo floutée (38 px) en
  fond ; sur téléphone elle remplit l'écran (sources de 718 à 805 px : à remplacer par les originaux HD).
- **Dégradé léger** : pas de gros dégradé sombre. Voile latéral à 34 % maximum et « nuage » vert flou (56 à 74 %)
  seulement derrière les lignes de texte, pour qu'on voie la photo à travers (comme One Love / Gospel Nation).
  La petite ligne dorée du haut (`.kicker.or`) a sa propre pastille sombre : c'est elle qui porte son contraste.
- Même principe pour les bandes à photo de fond (citation, inscription, réseaux, trois portes, Mon église) : voile
  épaissi pour la lisibilité du texte, photo visible autour.
- Contraste remesuré le 11/10 : zéro échec à 390 et 1440 px sur les pages de bandeau.

## Pièges rencontrés
- `img { display:block }` écrasait l'attribut `hidden` : règle globale `[hidden] { display:none !important }` indispensable.
- Événement `close` de `<dialog>` peu fiable dans certains navigateurs intégrés : le menu mobile fait son nettoyage directement.
- Captures : `--headless --screenshot` de Chrome se bloque sur ce Mac ; utiliser le pilotage par protocole DevTools (script `cdp.mjs`).
- En zsh, ne jamais nommer une variable `path` (elle écrase le PATH).
- Scripts de test Chrome : un script interrompu laissait son Chrome ouvert (97 instances accumulées, tout ralentissait).
  Ils ferment maintenant leur Chrome sur SIGALRM/SIGTERM. Nettoyer : `pkill -9 -f "/tmp/chrome-prof"` (jamais le Chrome de Mazunda).
- Test de contraste sur photo : il cache le texte pour lire le fond ; un élément qui a son propre fond (pastille) se
  calcule à part (pire cas sur blanc pur).

## Reste à faire
Voir la fin du rapport de session : contenus de l'autrice, services d'e-mail, domaine, déploiement.
