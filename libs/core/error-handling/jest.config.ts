/* eslint-disable */
import { Config } from 'jest';
import { getJestConfig } from '../../../jest.config.base';

const config: Config = {
  ...getJestConfig('core-error-handling'),
};

export default config;
