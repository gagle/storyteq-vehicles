/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../jest.config.base';

const config: Config = {
  ...getJestConfig('vehicle-shared'),
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 71,
      functions: 40,
      lines: 79,
    },
  },
};

export default config;
