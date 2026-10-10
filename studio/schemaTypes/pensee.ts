// Article du blog (« pensée ») : mêmes champs que les pensées du site (src/data/pensees.ts),
// avec des libellés simples pour l'autrice.
import { defineArrayMember, defineField, defineType } from 'sanity';

const THEMES = [
  { title: 'Foi', value: 'foi' },
  { title: "Traverser l'épreuve", value: 'epreuve' },
  { title: 'Prière', value: 'priere' },
];

export const pensee = defineType({
  name: 'pensee',
  title: 'Article du blog',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre (début)',
      description: 'Le début du titre, en blanc. Exemple : « La foi »',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'titreEm',
      title: 'Titre (fin, en italique doré)',
      description: 'Facultatif. Exemple : « pendant l’épreuve »',
      type: 'string',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse de la page',
      description: 'Cliquez sur « Générer » : elle se crée à partir du titre.',
      type: 'slug',
      options: {
        source: (doc: { titre?: string; titreEm?: string }) => [doc.titre, doc.titreEm].filter(Boolean).join(' '),
        maxLength: 80,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Thème',
      type: 'string',
      options: { list: THEMES, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      description: 'Une photo de vous. Touchez le visage pour qu’il reste toujours visible dans les cadrages.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Description de la photo',
          description: 'Une phrase pour les personnes malvoyantes. Exemple : « Race Élue sourit, assise dans l’herbe »',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Résumé',
      description: 'Deux lignes qui donnent envie de lire (affichées sur les cartes et dans l’aperçu WhatsApp).',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'corps',
      title: 'Texte de l’article',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraphe', value: 'normal' },
            { title: 'Intertitre', value: 'h2' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [],
          },
        }),
        defineArrayMember({
          name: 'verset',
          title: 'Verset biblique',
          type: 'object',
          fields: [
            defineField({ name: 'texte', title: 'Verset', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'ref', title: 'Référence', description: 'Exemple : Hébreux 11:8', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'ref', subtitle: 'texte' } },
        }),
        defineArrayMember({
          name: 'video',
          title: 'Vidéo YouTube',
          type: 'object',
          fields: [
            defineField({ name: 'url', title: 'Lien YouTube', type: 'url', validation: (r) => r.required() }),
            defineField({ name: 'duree', title: 'Durée', description: 'Exemple : 4 min', type: 'string' }),
          ],
          preview: { select: { title: 'url' }, prepare: ({ title }) => ({ title: 'Vidéo YouTube', subtitle: title }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'priere',
      title: 'Prière de fin',
      description: 'Facultatif. Affichée dans un encadré à la fin de l’article.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'alaune',
      title: 'Mettre à la une',
      description: 'L’article mis à la une apparaît en grand en haut du blog (un seul à la fois).',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'magazinePage',
      title: 'Extrait du magazine N°01 (page)',
      description: 'Seulement si le texte vient du magazine « Devenu une légende ». Sinon, laissez vide.',
      type: 'number',
    }),
    defineField({
      name: 'magazineRubrique',
      title: 'Rubrique du magazine',
      description: 'Seulement pour un extrait du magazine. Exemple : Méditation',
      type: 'string',
      hidden: ({ document }) => !document?.magazinePage,
    }),
  ],
  orderings: [{ title: 'Plus récents d’abord', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { titre: 'titre', titreEm: 'titreEm', date: 'date', media: 'image' },
    prepare: ({ titre, titreEm, date, media }) => ({ title: [titre, titreEm].filter(Boolean).join(' '), subtitle: date, media }),
  },
});
