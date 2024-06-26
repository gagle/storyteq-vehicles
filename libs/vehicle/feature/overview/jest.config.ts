/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../../jest.config.base';

const config: Config = {
  ...getJestConfig('vehicle-feature-overview'),
};

export default config;
