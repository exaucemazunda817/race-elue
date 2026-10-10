// Moteur d'apparitions et d'effets (inséré en ligne à la fin du <body>, avant le premier affichage).
// Règles communes aux sites de Mazunda : un bloc se rejoue à chaque retour dans l'écran ; il ne se
// remet en attente qu'une fois entièrement sorti ; aucune marge rognée en bas (sinon la dernière ligne
// du pied de page n'entrerait jamais) ; le défilement n'est jamais détourné ; sans
// IntersectionObserver ou avec « Réduire les animations », tout reste simplement visible.
(function () {
  var d = document;
  var root = d.documentElement;
  if (!('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // [sélecteur, variante, cascade]
  var G = [
    ['.sec-head, .portes-head, .som-intro, .reader-head, .mission > .stack, .activites > .stack, .rej-txt > .stack, .pourquoi > .stack, .suite > h2, .aussi > h2, .reseaux > h2, .faq > h2, .elles > h2, .lectrices > h2', '', 0],
    ['.histoire-txt > *, .ministere-txt > *, .pourquoi-txt > *, .autrice-txt > *, .themes-txt > .stack, .eglise-txt > *, .histoire .col > *, .corps > *, .lecture > section, .lecture > .suite, .extrait-col > *, .share-row', '', 1],
    ['.pub, .porte, .tcard, .item, .act, .fil, .aussi-card, .next, .reseau, .bientot, .wa-card, .line-card, .urgence, .invit, .charte, .nl, .partage, .form-card, .une, .reader, .off .grid > *', '', 1],
    ['.toc li, .pas li, .faq-list details, .acc details, .themes li, .mur > .brique', 'doux', 1],
    ['.histoire-photo, .ministere-photo, .autrice-photo, .photos picture, .themes-photo, .hero-img, .merci .photo', 'arche', 1],
    ['.quote-band', 'fixe', 0],
    ['.rameau', 'fixe', 0],
  ];

  // Le bandeau de haut de page a sa propre entrée, jouée en CSS (motion.css) : on n'y touche pas.
  var first = d.querySelector('main > :first-child');
  var hero = first && first.tagName === 'SECTION' ? first : null;
  var items = [];
  G.forEach(function (g) {
    var seen = new Map();
    d.querySelectorAll(g[0]).forEach(function (el) {
      if (el.hasAttribute('data-reveal') || (hero && hero.contains(el)) || el.closest('dialog, .entree')) return;
      el.setAttribute('data-reveal', 'waiting');
      if (g[1]) el.setAttribute('data-rv', g[1]);
      if (g[2]) {
        var p = el.parentElement;
        var n = seen.get(p) || 0;
        seen.set(p, n + 1);
        if (n) el.style.setProperty('--rd', Math.min(n, 5) * 90 + 'ms');
      }
      items.push(el);
    });
  });

  var show = function (el) { el.setAttribute('data-reveal', 'shown'); };
  var enter = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      // Révélé dès que 12 % du bloc est visible, OU qu'une vraie portion (120 px) l'est (bloc très haut),
      // OU qu'il dépasse déjà en haut de l'écran : en bas d'une page courte qui ne défile plus, un bloc
      // à moitié passé n'atteindrait jamais le seuil et resterait vide.
      if (e.intersectionRatio >= 0.12 || e.intersectionRect.height >= Math.min(120, innerHeight * 0.15) || e.boundingClientRect.top < 0) show(e.target);
    });
  }, { threshold: [0, 0.05, 0.12, 0.25, 0.5, 0.75, 1] });
  var leave = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      // Entièrement sorti de l'écran : remis en attente, sans transition, pour rejouer au retour.
      if (!e.isIntersecting && e.target.getClientRects().length) e.target.setAttribute('data-reveal', 'waiting');
    });
    // Marge de 100 px : un bloc en attente est décalé de 28 px vers le bas ; sans cette marge, un bloc
    // posé au bord de l'écran sortait, revenait, ressortait… et clignotait en boucle.
  }, { threshold: 0, rootMargin: '100px 0px 100px 0px' });
  items.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) {
      requestAnimationFrame(function () { requestAnimationFrame(function () { show(el); }); });
    }
    enter.observe(el);
    leave.observe(el);
  });

  // Titre du bandeau mot par mot (les balises internes, comme <em>, sont conservées).
  if (hero) {
    var h1 = hero.querySelector('h1');
    if (h1 && !h1.classList.contains('is-split')) {
      var wi = 0;
      var walk = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = d.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(part)); return; }
              var w = d.createElement('span');
              w.className = 'hw';
              w.style.setProperty('--wi', wi++);
              w.textContent = part;
              frag.appendChild(w);
            });
            c.parentNode.replaceChild(frag, c);
          } else if (c.nodeType === 1 && !c.matches('svg, br')) walk(c);
        });
      };
      walk(h1);
      h1.classList.add('is-split');
    }
  }

  // Effets Magic UI / React Bits (CSS natif, motion.css)
  var tag = function (sel, cls) { d.querySelectorAll(sel).forEach(function (el) { el.classList.add(cls); }); };
  tag('.get, .nl, .partage, .form-card', 'fx-beam');
  tag('.pub, .porte, .pcard, .act, .reseau, .aussi-card, .next, .wa-card, .une, .tcard, .invit', 'fx-spot');
  tag('.pcard .img, .une-img, .pub-cover', 'fx-photo');

  // Boutons aimantés : ils suivent légèrement la souris (propriété `translate`, distincte du
  // `transform` des effets de survol, donc aucun conflit). Ordinateurs uniquement.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    d.querySelectorAll('.btn-gold, .btn-primary, .btn-ghost-light, .btn-outline, .nav-pill, .fab').forEach(function (b) {
      b.classList.add('fx-aimant');
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        b.style.translate = (x * 6).toFixed(1) + 'px ' + (y * 5).toFixed(1) + 'px';
      });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
  }

  // Spotlight : une seule écoute pour tout le site, ordinateurs uniquement.
  if (matchMedia('(hover: hover)').matches) {
    var frame = 0;
    d.addEventListener('pointermove', function (e) {
      var card = e.target && e.target.closest && e.target.closest('.fx-spot');
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', e.clientX - r.left + 'px');
        card.style.setProperty('--my', e.clientY - r.top + 'px');
      });
    }, { passive: true });
  }
})();
