/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  testMatch: ["<rootDir>/test/?(*.)+(spec|test).ts"],
  transform: { "\\.[jt]s?$": ["ts-jest", { tsconfig: { allowJs: true } }] },
  transformIgnorePatterns: ["node_modules/(?!get-port/.*)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.[jt]s$": "$1",
  },
};

module.exports = jestConfig;
