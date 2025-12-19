import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/unit/**/*.test.ts',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/infrastructure/**',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};

export default config;
