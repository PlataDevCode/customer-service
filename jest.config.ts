import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/unit/**/*.test.ts',
    '<rootDir>/src/**/*.spec.ts',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/infrastructure/**',
    '!src/main.ts',
    '!src/handler.ts',
    '!src/shared/**',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};

export default config;
