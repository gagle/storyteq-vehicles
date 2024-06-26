export interface Environment {
  production_build: boolean;
  release_version: string;
  name: string;
  url: {
    vehicle_api: string;
  };
}
