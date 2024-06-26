import { Environment } from './environment.model';

const baseDomain = 'frontend-code-test-api-jhbwml7vva-nw.a.run.app';

export const environment: Environment = {
  production_build: false,
  name: 'local',
  release_version: 'local',
  url: {
    vehicle_api: `https://${baseDomain}/api/vehicles`,
  },
};
