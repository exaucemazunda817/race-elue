# Handoff : site Race Élue Disanka (RED Éditions)

## Overview
Site vitrine et ministère de Race Élue Disanka, autrice chrétienne (Kinshasa, RDC ; public aussi en diaspora francophone). Thèmes : foi, créativité, guérison des blessures intérieures. Objectifs : faire télécharger l'ebook gratuit (collecte e-mail), faire lire le magazine, faire rejoindre la communauté « Guérie et Épanouie » via WhatsApp, recevoir des invitations à intervenir. Public majoritairement mobile Android, connexion 3G/4G parfois faible : la légèreté est une exigence.

## About the Design Files
Les fichiers de ce dossier sont des **références de design en HTML** (maquettes montrant l'apparence et le comportement attendus), **pas du code de production à copier**. La tâche : **recréer ces maquettes** dans l'environnement cible. Aucun code existant : choisir la stack la plus adaptée. Recommandation : **Astro** (pages statiques, zéro JS par défaut, îlots interactifs pour formulaires / lecteur magazine / filtres), contenus en Markdown/MDX (collections : `pensees`, `temoignages`, `publications`), hébergement statique (Netlify, Vercel ou Cloudflare Pages), formulaires via un service (Formspree, Netlify Forms) ou une fonction serverless, newsletter via Brevo ou MailerLite.

Ouvrir `Passation - Guide developpeur.dc.html` dans un navigateur pour voir toutes les maquettes et la synthèse visuelle. Chaque écran existe aussi en fichier séparé `Ecran - <page> <desktop|mobile>.dc.html` (styles inline : lire les valeurs directement dans le source). `support.js` n'est que le moteur de prévisualisation des maquettes : ne pas l'utiliser en production.

## Fidelity
**Haute fidélité.** Couleurs, typographies, espacements, rayons et textes sont définitifs, sauf les contenus marqués « exemple », « Texte d'exemple » ou `[à confirmer]` / `[à compléter]`. Les notes jaunes (option `showNotes`) sont des annotations de design, à ne pas reproduire.

## Screens / Views
Largeurs de référence : desktop 1440 px (contenu 1200 px max, marges 120 px), mobile 390 px (marges 20 px). Entre les deux, grille fluide (breakpoints suggérés 640 / 960 / 1200).

| Route | Écran | Fichiers |
|---|---|---|
| `/` | Accueil | Ecran - Accueil desktop / mobile |
| `/publications/comment-dieu-guerit-les-coeurs-brises` | Fiche ebook (+ variante payante) | Ecran - Ebook desktop / mobile / achat mobile |
| `/publications/devenu-une-legende-n01` | Fiche magazine + lecteur | Ecran - Magazine desktop / mobile |
| `/pensees` | Liste pensées et méditations | Ecran - Pensees desktop / mobile |
| `/pensees/[slug]` | Article | Ecran - Article desktop / mobile |
| `/guerie-et-epanouie` | Ministère | Ecran - Guerie desktop / mobile |
| `/a-propos` | À propos | Ecran - A propos desktop / mobile |
| `/contact` | Contact et invitations | Ecran - Contact desktop / mobile |
| `/temoignages` | Témoignages | Ecran - Temoignages desktop / mobile |
| `/mentions-legales` | Mentions légales et confidentialité | Ecran - Mentions legales desktop / mobile |
| `/merci`, `404`, hors ligne | États | Ecran - Etats desktop / mobile |

Une page `/publications` (index) n'est pas maquettée : reprendre la section « Des mots pour t'accompagner » de l'accueil en grille.

### Éléments communs
- **En-tête desktop** : fond #1E3B2F, hauteur 88, padding 0 120. Logo texte « Race Élue Disanka » Cormorant Garamond italique 600 28px #FBF7F1 + « ✦ » #C9A24B 13px. Nav Nunito Sans 600 15px #E3EAD9, gap 36. Item actif : #C9A24B + soulignement 2px #C9A24B. « Contact et invitations » : pilule 44px, contour 1.5px #C9A24B (pleine #C9A24B / texte #1E3B2F quand active).
- **En-tête mobile** : barre 60px #1E3B2F, logo 22px, bouton menu 48×48 (icône `ph-list` 26px). Menu ouvert plein écran vert (voir composant dans `Race Elue Disanka - Site.dc.html` 1c) : liens Cormorant 26px, line-height 2, actif en or + ✦, icônes réseaux 48×48.
- **Pied de page** : fond #1E3B2F, Nunito 13px #B9C7B4, mention obligatoire : « Ce site propose un accompagnement spirituel. Il ne remplace pas un suivi médical ou psychologique. » + « Publié par RED Éditions · © 2026 · Mentions légales · Confidentialité ». Accueil : version complète 4 colonnes (Explorer / Communauté / Me suivre).
- **Bouton WhatsApp flottant** : desktop pilule 60px fond #FBF7F1, icône `ph-whatsapp-logo` #1E7A46 28px + « M'écrire », right/bottom 32px, ombre `0 24px 48px -12px rgba(0,0,0,.4)`. Mobile : rond 60px fond #1E7A46, icône blanche, right 16 bottom 20 ; sur les pages à barre d'action collante (ebook, À propos, Guérie, article), il est intégré à la barre.
- **Barre d'action collante mobile** : fond #FBF7F1, ombre `0 -8px 24px rgba(74,42,26,.12)`, padding 12 16 16, bouton principal 52px + éventuel bouton WhatsApp rond 52px.
- Lien WhatsApp : `https://wa.me/243996891371?text=<message pré-rempli encodé>` (numéro à confirmer).

### Accueil
Héros vert 2 colonnes (1.1fr/1fr) : kicker or « Foi · Créativité · Guérison intérieure », H1 76px « Ton cœur peut guérir. *Dieu n'a pas fini avec toi.* » (italique en or), paragraphe 19px #E3EAD9, boutons « Recevoir l'ebook gratuit » (or) et « Lire le magazine » (contour), signature italique « Je suis guérie et épanouie ! ». Photo en arche 440×580 (rayon `999px 999px 8px 8px`) + filet or décalé de 14px. Puis : publications (2 cartes : ebook sur sable #F3ECE1, magazine sur vert), « Trois portes » sur #E3EAD9 (cartes en arche Guérir / Croire / Créer), citation plein écran verte, « Mon histoire » (photo pupitre), témoignages sur sable (3 cartes), ministère (photo en arche), bandeau newsletter, réseaux (3 cartes contour), pied de page. Mobile : même ordre, portes en liste horizontale (pastille icône 52px), témoignages en carrousel à défilement horizontal (scroll-snap) avec points.

### Fiche ebook
Fil d'Ariane ; couverture 380×506 sur arche #E3EAD9 ; H1 68px ; méta (18 pages, PDF 2 Mo, 45 min — à confirmer) ; carte formulaire « Reçois-le gratuitement » (champ e-mail pilule 56px + bouton « Recevoir l'ebook ») ; sommaire réel en table des matières (numéros italiques cuivre, filets #E6DCCD) :
Salutations · Introduction (03) — Reconnaître sa blessure pour laisser Dieu la guérir (05) — 1. Dieu guérit les personnes brisées à travers d'autres humains (07) — 2. Dieu guérit par notre identité en lui (09) — 3. Dieu guérit nos cœurs par la prière (11) — 4. Dieu guérit avec le temps (13) — 5. Dieu guérit par le présent (15) — Conclusion (17).
Extrait HTML de l'introduction avec lettrine + dégradé de fondu + « Lire l'extrait complet » (3 pages, sans inscription). Bloc autrice, témoignages, « À lire aussi ». **Variante payante** (si l'autrice choisit un prix) : sélection Mobile Money (M-Pesa, Orange Money, Airtel Money) ou carte/PayPal, champ +243, bouton « Payer 5 000 FC » (prix d'exemple). Prestataires possibles : CinetPay, FlexPay, MaxiCash (Mobile Money RDC) ; Stripe/PayPal pour la diaspora.

### Fiche magazine
Héros vert avec couverture, boutons « Lire en ligne » / « Télécharger le PDF ». Sommaire par rubriques (indicatif, à remplacer). **Lecteur en ligne** : pages exportées en images WebP (~150 Ko), chargées à la demande (`loading="lazy"`), double page sur desktop, une page sur mobile, navigation boutons + swipe + flèches clavier, compteur « Pages 2–3 sur 24 », plein écran, sommaire. Citation, newsletter « Me prévenir ».

### Pensées et méditations
Liste : H1 centré, filtres en pastilles 44px (Tout, Guérison intérieure, Identité, Prière, Créativité, Vidéos), carte « À la une » verte, grille 3 colonnes de cartes (image 200px, kicker thème · durée, titre Cormorant 26px), carte méditation (verset) sur #E3EAD9, « Voir plus » (pagination ou chargement progressif). Mobile : liste avec vignettes en arche 96px.
Article : barre de progression de lecture 4px cuivre en haut ; colonne 720px ; H1 72px ; auteur/date/durée ; image en arche ; corps 20px/1.8 (mobile 17px/1.75) ; lettrine Cormorant 104px cuivre ; intertitres 38px ; citation biblique en bloc vert en arche ; **vidéo YouTube en façade** (vignette + bouton play, l'iframe `youtube-nocookie` ne se charge qu'au clic) ; bloc « Prière » sur #E3EAD9 ; partage WhatsApp (`wa.me/?text=`) + copier le lien ; « À lire ensuite ».

### Guérie et Épanouie
Héros vert (photo rire extérieur en arche), « Pourquoi ce ministère », 4 cartes activités (Partages, Prière, Enseignements, Ressources — à confirmer), « Trois pas » (pastilles numérotées en arche 56px), charte de bienveillance (4 points dont la mention médicale), citation « Je suis guérie et épanouie ! » (à remplacer par la signature manuscrite scannée en SVG), témoignages, FAQ en accordéon (`<details>`).

### À propos
Héros crème : portrait en arche 460×600 avec filet cuivre décalé ; H1 80px ; sous-titre italique vert ; boutons. Récit sur sable (colonne 720, lettrine), citation verte, mission en 3 colonnes (I. II. III., filet sauge en haut), bande de 3 photos, bloc église + carte invitation.

### Contact et invitations
Héros vert, puis cartes remontant sur le héros (margin-top −136px). Colonne gauche : carte WhatsApp (bouton vert #1E7A46), e-mail, réseaux, note d'urgence (icône #A23B2A). Colonne droite : formulaire avec **onglets segmentés** « Écrire un message » / « Inviter Race Élue ».
- Message : nom*, WhatsApp ou e-mail*, message*, consentement*.
- Invitation : type* (pastilles à choix unique : Prédication, Conférence, Atelier ou retraite, Interview ou podcast, Autre), nom*, église/organisation*, ville et pays*, date souhaitée, format* (radio présentiel/en ligne), description, contact WhatsApp ou e-mail* (présent en mobile, à ajouter en desktop), consentement*.
Section « Les thèmes que je porte ».

### Témoignages
Héros vert centré, mur en colonnes CSS (3 colonnes desktop, 1 mobile), cartes variées (vert en arche, sable, vert pâle), bandeau « Toi aussi, tu as une histoire à partager ? » (WhatsApp / par écrit).

### Mentions légales
Sommaire latéral collant (260px, actif = filet 2px cuivre), contenu 720px, sections h2 32px. Mobile : accordéons. Contenus `[à compléter]`.

### États
- **Confirmation** (`/merci`, après inscription ebook) : icône enveloppe dans pastille #E3EAD9, « Merci {prénom}, l'ebook est en route. », conseils spam, boutons « Télécharger maintenant » et « Rejoindre la communauté ».
- **404** : fond vert, arche or contenant « 404 », « Cette page s'est égarée. » + « Mais toi, tu n'es pas perdue. Dieu sait toujours où te trouver. », boutons accueil / pensée.
- **Hors ligne** : bandeau cacao #4A2A1A « Tu es hors connexion… Réessayer » ; liste des pages déjà lues (service worker, cache des pages visitées et de l'extrait de l'ebook) ; contenus non disponibles grisés « Nécessite Internet ».

## Interactions & Behavior
- Boutons : survol cuivre → #7A4220 + ombre `0 8px 20px -8px rgba(122,66,32,.6)` ; pressé #5E3218 + translateY(1px) ; focus clavier `outline 2px #94522A, offset 3px` ; désactivé opacité .45. Bouton or sur vert : survol #D9B866. Secondaire contour : survol fond #F5E9DF. Liens texte : survol souligné offset 4px. Transitions 150–200 ms ease-out. Respecter `prefers-reduced-motion`.
- Champs : hauteur 52px, rayon 6, bordure 1px #CDBFAE, fond blanc ; focus bordure 2px #94522A + halo 4px #F0E0D3 ; erreur bordure 2px #A23B2A + message 13px 600 avec icône `ph-warning-circle` (« Il manque la fin de l'adresse (ex. .com). », « Indique le nom de ton église ou organisation. ») ; succès bandeau #E3EAD9 avec `ph-check-circle`. Validation à la sortie du champ puis à la saisie ; libellés toujours visibles (pas de placeholder seul).
- Formulaire ebook → inscription newsletter + e-mail automatique avec lien PDF → redirection `/merci`.
- Filtres pensées : mise à jour de la liste côté client (ou URL `?theme=`).
- Accordéons FAQ / mentions : `<details>/<summary>`, icône plus/moins.
- Carrousel témoignages mobile : `overflow-x:auto; scroll-snap-type:x mandatory`.
- Menu mobile : panneau plein écran, piège du focus, fermeture Échap, `aria-expanded`.
- Ton éditorial : tutoiement, chaleureux. Copie exacte dans les maquettes.

## State Management
Site majoritairement statique. États locaux : menu ouvert ; onglet de contact (message | invitation) ; type d'intervention et format sélectionnés ; état de soumission des formulaires (idle | envoi | succès | erreur) ; filtre de thème ; page courante du lecteur magazine ; façade vidéo chargée ou non ; statut réseau (`navigator.onLine` + événements) pour le bandeau hors ligne. Données : collections Markdown (pensées : titre, slug, thème, durée, date, image, vidéo YouTube optionnelle, prière ; témoignages : texte, initiale, ville, source, accord=true ; publications).

## Design Tokens
**Couleurs**
- vert-profond #1E3B2F (en-tête, héros, citations, pied) · vert-foret #284A3B (survol sur vert) · sauge #8FA88B (décor uniquement, jamais du texte sur crème) · vert-pale #E3EAD9 · creme #FBF7F1 (fond) · sable #F3ECE1 · blanc #FFFFFF (cartes, champs)
- cuivre #94522A (action, liens ; 5,6:1 sur crème) · cuivre-hover #7A4220 · cuivre-press #5E3218 · cuivre-tint #F5E9DF · halo-focus #F0E0D3
- or #C9A24B (**sur vert uniquement**) · or-hover #D9B866 · or-couverture #E2C27A
- cacao #4A2A1A (titres) · encre #3B3029 (texte) · secondaire #6B5E52 · placeholder #857767 · bordure-champ #CDBFAE · filet #E6DCCD · texte-sur-vert #E3EAD9 · texte-discret-sur-vert #B9C7B4 · filet-sur-vert #3A5A4B / #4C6B5C
- erreur #A23B2A · whatsapp #1E7A46
**Typographie** — Cormorant Garamond (500, 600, italiques) pour titres/citations ; Nunito Sans (400, 600, 700, 800) pour texte/UI. Google Fonts, `display=swap`, sous-ensemble latin.
- H1 76/64 desktop, 40–48 mobile, lh 1.0 · H2 48–52 / 30–32, lh 1.05 · H3 34 / 26 · H4 italique 600 26 / 22 · H5 Nunito 700 19 / 18 · H6 Nunito 700 16
- Corps L 19/1.7 · corps 17/1.65 (mobile 16, jamais moins) · article 20/1.8 · légende 13 · kicker 12, 800, uppercase, letter-spacing .22em · bouton 16, 700
**Espacements** base 4 : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections 128 desktop (112 secondaires) / 56–64 mobile.
**Rayons** champ 6 · carte 12 · bandeau 16 · bouton pilule 999 · arche `999px 999px 8px 8px` (6px en mobile).
**Ombres** (teintées cacao) sm `0 1px 2px rgba(74,42,26,.06)` · md `0 1px 2px rgba(74,42,26,.06), 0 8px 24px rgba(74,42,26,.08)` · lg photo `0 32px 64px -16px rgba(0,0,0,.5)` · couverture `0 40px 64px -20px rgba(74,42,26,.45)`.
**Cibles tactiles** ≥ 44px (boutons 48–56px).

## Assets
- Photos (`photos/`, séance « Ange Photo du Ciel », crédit à confirmer) : portrait-arches.jpg (héros accueil), portrait-serious.jpg (À propos), studio-smile.jpg, studio-laugh.jpg, laptop.jpg, laptop-talk.jpg, grass.jpg, laugh-outdoor.jpg, stage.jpg. À exporter en WebP/AVIF, `srcset` 400/800/1200, `loading="lazy"` sauf héros, `fetchpriority="high"` sur l'image héros. Les fichiers sources sont lourds : compresser.
- Publications (`publications/`) : ebook.pdf, magazine-n01.pdf. Les **couvertures dans les maquettes sont redessinées en CSS** : les remplacer par des images extraites de la page 1 de chaque PDF.
- Icônes : Phosphor Icons, style duotone (`@phosphor-icons/web`). En production, préférer des SVG inline des seules icônes utilisées : list, x, arrow-right, arrow-left, caret-*, whatsapp-logo, tiktok-logo, instagram-logo, youtube-logo, envelope-simple(-open), heart, sun-horizon, pen-nib, book-open(-text), book-bookmark, file-pdf, clock, download-simple, chats-circle, hands-praying, microphone-stage, lock-key, lock-simple, plant, first-aid, check, check-circle, warning-circle, calendar-blank, device-mobile, credit-card, play, play-circle, share-network, link-simple, list-bullets, magnifying-glass-plus, arrows-out, shield-check, wifi-slash, cloud-slash, minus, plus.
- Motifs : arche (CSS border-radius), rameau + ✦ (SVG simple, voir 1b), lettrine (CSS float), guillemets « “ » Cormorant en or/cuivre.

## Performance et accessibilité (exigences)
- Poids cible < 500 Ko par page au premier chargement, LCP < 2,5 s en 3G rapide. Pas de vidéo ni d'iframe chargée d'office. JS minimal.
- WCAG 2.2 AA : contrastes vérifiés (or jamais sur fond clair, sauge jamais en texte), focus visible, `alt` descriptifs (fournis dans les maquettes), formulaires avec `<label>`, erreurs liées via `aria-describedby`, `lang="fr"`.
- SEO : balises title/description par page, Open Graph avec couvertures, données structurées `Book` et `Person`.
- PWA légère : manifeste + service worker pour le mode hors ligne.
- Sélecteur FR/EN : prévu seulement si la version anglaise est confirmée (prévoir l'i18n dans la structure).

## En attente de l'autrice
Ebook gratuit ou payant (et prix) · adresse e-mail · confirmation du WhatsApp +243 996 891 371 · église d'appartenance · vraies couvertures · signature manuscrite scannée · vrais témoignages avec accord écrit · fonctionnement réel de Guérie et Épanouie (fréquence, formats, gratuité) · sommaire réel du magazine · textes des pensées · hébergeur et mentions légales.

## Files
- `Passation - Guide developpeur.dc.html` : vue d'ensemble visuelle (tokens + toutes les maquettes).
- `Ecran - *.dc.html` : 22 écrans (desktop et mobile), source de vérité des valeurs.
- `support.js` : moteur de prévisualisation des maquettes (référence uniquement).
- `photos/`, `publications/`.
