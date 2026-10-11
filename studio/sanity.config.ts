// Espace d'écriture du blog de Race Élue Disanka (Sanity Studio), publié sur <nom>.sanity.studio.
// L'identifiant de projet n'est pas un secret : il est public par nature (il figure dans le site).
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { frFRLocale } from '@sanity/locale-fr-fr';
import { pensee } from './schemaTypes/pensee';

export default defineConfig({
  name: 'race-elue',
  title: 'Race Élue · Blog',
  projectId: 'ce2f34e7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([S.documentTypeListItem('pensee').title('Articles du blog')]),
    }),
    frFRLocale(),
  ],
  schema: { types: [pensee] },
});
