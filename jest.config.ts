import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/*.stories.{ts,tsx}',
    '!src/main.tsx',
  ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',

    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/__mocks__/',
    '<rootDir>/src/constants/',
    '<rootDir>/src/themes/',
    '<rootDir>/src/routers/',
    '<rootDir>/src/types/',
    '<rootDir>/src/pages/index.ts',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/main.tsx',
    '<rootDir>/src/layouts/index.ts',
    '<rootDir>/src/services/index.ts',
    '<rootDir>/src/contexts/index.ts',
    '<rootDir>/src/components/index.ts',
    '<rootDir>/src/components/Form/index.ts',
    '<rootDir>/src/vite-env.d.ts',
    '<rootDir>/vite.config.ts',
    '<rootDir>/jest.config.ts',
    '<rootDir>/jest.setup.ts',
    '/.storybook/',
  ],
  // collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
