/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
