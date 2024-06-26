/* eslint-disable */
import { getJestConfig } from '../../jest.config.base';

const projectName = 'storyteq-vehicle';
const baseConfig = getJestConfig(projectName);

export default {
  ...baseConfig,
  coverageDirectory: `../../coverage/apps/${projectName}`,
  collectCoverageFrom: [...baseConfig.collectCoverageFrom!, '!src/main.ts', '!src/environments/*'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
