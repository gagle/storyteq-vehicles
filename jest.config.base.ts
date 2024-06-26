/* eslint-disable */
import { readCachedProjectGraph } from '@nx/devkit';
import { Config } from 'jest';
import * as path from 'path';

const getConfigRoot = (projectName: string): string => {
  const projects = readCachedProjectGraph().nodes;
  const sourceRoot = projects[projectName]?.data.sourceRoot;

  if (!sourceRoot) {
    throw new Error(`No sourceRoot found for project "${projectName}"`);
  }

  return sourceRoot.endsWith('/src') ? sourceRoot.split('/src')[0]! : sourceRoot;
};

export const getJestConfig: (projectName?: string) => Config = (projectName) => {
  let relativePathToRoot = '../..';

  const cwd = process.cwd();
  if (projectName) {
    relativePathToRoot = path.relative(getConfigRoot(projectName), cwd);
  }

  return {
    cacheDirectory: `${cwd}/jest_cache/${projectName}`,
    preset: `${relativePathToRoot}/jest.preset.js`,
    displayName: projectName,
    coverageDirectory: `${relativePathToRoot}/coverage/libs/${projectName}`,
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    transform: {
      '^.+\\.(ts|mjs|js|html|svg)$': [
        'jest-preset-angular',
        {
          tsconfig: '<rootDir>/tsconfig.spec.json',
          stringifyContentPathRegex: '\\.(html|svg)$',
          isolatedModules: true,
        },
      ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
    // testRunner: 'jest-jasmine2',
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.ts',
      // important: define exclusions after inclusions
      '!**/testing/**/*.ts',
      '!**/models/**/*.ts',
      '!**/jest.config.ts',
      '!**/index.ts',
    ],
    coverageReporters: process.env['CI'] ? ['text-summary', 'lcov'] : ['text', 'text-summary', 'lcov'],
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    maxWorkers: '50%',
  };
};
