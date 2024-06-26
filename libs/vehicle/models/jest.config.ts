/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../jest.config.base';

const config: Config = {
  ...getJestConfig('vehicle-models'),
};

export default config;
