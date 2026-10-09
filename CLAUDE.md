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

## Pièges rencontrés
- `img { display:block }` écrasait l'attribut `hidden` : règle globale `[hidden] { display:none !important }` indispensable.
- Événement `close` de `<dialog>` peu fiable dans certains navigateurs intégrés : le menu mobile fait son nettoyage directement.
- Captures : `--headless --screenshot` de Chrome se bloque sur ce Mac ; utiliser le pilotage par protocole DevTools (script `cdp.mjs`).
- En zsh, ne jamais nommer une variable `path` (elle écrase le PATH).

## Reste à faire
Voir la fin du rapport de session : contenus de l'autrice, services d'e-mail, domaine, déploiement.
