/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../jest.config.base';

const config: Config = {
  ...getJestConfig('vehicle-api'),
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 72,
      functions: 66,
      lines: 80,
    },
  },
};

export default config;
