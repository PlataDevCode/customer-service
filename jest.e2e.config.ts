import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: ['<rootDir>/test/e2e/**/*.e2e.spec.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  testTimeout: 30000,

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
