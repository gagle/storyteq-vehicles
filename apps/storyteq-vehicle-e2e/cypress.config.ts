import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run storyteq-vehicle:serve:local',
        production: 'nx run storyteq-vehicle:serve:production',
      },
      ciWebServerCommand: 'nx run storyteq-vehicle:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
