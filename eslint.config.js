const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier/flat");
const i18next = require("eslint-plugin-i18next");
const i18nDefaults = require("eslint-plugin-i18next/lib/options/defaults");
const reactNative = require("eslint-plugin-react-native");
const unistyles = require("eslint-plugin-react-native-unistyles");

const appFiles = ["src/**/*.{ts,tsx}", "App.tsx"];

module.exports = defineConfig([
  globalIgnores([
    "dist/*",
    ".expo/**",
    "ios/**",
    "android/**",
    ".agents/**",
    ".claude/**",
  ]),
  expoConfig,
  {
    files: appFiles,
    plugins: {
      i18next,
      "react-native": reactNative,
      "react-native-unistyles": unistyles,
    },
    rules: {
      "i18next/no-literal-string": [
        "error",
        {
          mode: "all",
          "should-validate-template": true,
          "jsx-attributes": {
            exclude: [
              ...i18nDefaults["jsx-attributes"].exclude,
              "testID",
              "optionTestID",
              "name",
              "initialRouteName",
              "accessibilityRole",
              "autoCapitalize",
              "autoComplete",
              "keyboardType",
              "textContentType",
              "behavior",
            ],
          },
          callees: {
            exclude: [
              ...i18nDefaults.callees.exclude,
              "navigate",
              "Error",
              "StyleSheet\\.create",
              "getString",
              "set",
              "getItem",
              "setItem",
            ],
          },
          "object-properties": {
            exclude: [
              ...i18nDefaults["object-properties"].exclude,
              "id",
              "ios",
              "android",
              "web",
            ],
          },
          words: {
            exclude: [...i18nDefaults.words.exclude, "#[0-9A-Fa-f]+"],
          },
        },
      ],
      "react-native/no-raw-text": "error",
      "react-native/no-inline-styles": "error",
      "react-native/no-color-literals": "error",
      "react-native/no-single-element-style-arrays": "error",
      "react-native-unistyles/no-unused-styles": "error",
      "react-native-unistyles/sort-styles": [
        "warn",
        "asc",
        {
          ignoreStyleNames: false,
          ignoreStyleProperties: false,
        },
      ],
    },
  },
  prettierConfig,
]);
