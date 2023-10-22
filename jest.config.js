// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  modulePathIgnorePatterns: ["mocks"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  globalSetup: "@shopify/react-native-skia/globalJestSetup.js",
  setupFiles: ["@shopify/react-native-skia/jestSetup.js"],
}

module.exports = config
