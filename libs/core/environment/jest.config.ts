/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../jest.config.base';

const baseConfig = getJestConfig('core-environment');

const config: Config = {
  ...baseConfig,
  collectCoverageFrom: [...baseConfig.collectCoverageFrom!, '!src/lib/environments/*'],
};

export default config;
