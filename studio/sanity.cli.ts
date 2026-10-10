import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'a-remplacer',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Adresse de l'espace d'écriture : https://race-elue.sanity.studio
  studioHost: 'race-elue',
  deployment: { autoUpdates: true },
});
