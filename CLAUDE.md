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

## Pièges rencontrés
- `img { display:block }` écrasait l'attribut `hidden` : règle globale `[hidden] { display:none !important }` indispensable.
- Événement `close` de `<dialog>` peu fiable dans certains navigateurs intégrés : le menu mobile fait son nettoyage directement.
- Captures : `--headless --screenshot` de Chrome se bloque sur ce Mac ; utiliser le pilotage par protocole DevTools (script `cdp.mjs`).
- En zsh, ne jamais nommer une variable `path` (elle écrase le PATH).

## Reste à faire
Voir la fin du rapport de session : contenus de l'autrice, services d'e-mail, domaine, déploiement.
