import { getEnvVar } from '../get-env-var';
import { Environment } from './environment.model';

export const environment: Environment = {
  production_build: true,
  name: getEnvVar('APP_NAME'),
  release_version: getEnvVar('APP_VERSION'),
  url: {
    vehicle_api: getEnvVar('API_URL_VEHICLE'),
  },
};
