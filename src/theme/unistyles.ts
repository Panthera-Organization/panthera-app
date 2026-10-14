import { StyleSheet } from "react-native-unistyles";

import {
  applyThemePreference,
  readThemePreference,
  THEME,
} from "@/theme/preference";

// Same value in light and dark. Host applies it as seedColor, so a theme
// change does not render Host to retint buttons.
export const buttonSeedColor = "#2f95dc";

const lightTheme = {
  colors: {
    text: {
      primary: "#000",
      inverse: "#fff",
    },
    background: {
      primary: "#fff",
    },
    border: {
      primary: "#ccc",
    },
    button: {
      primary: buttonSeedColor,
      secondary: buttonSeedColor,
    },
    status: {
      error: "#b00020",
    },
    icon: {
      default: "#ccc",
      selected: "#2f95dc",
    },
  },
};

const darkTheme = {
  colors: {
    text: {
      primary: "#fff",
      inverse: "#fff",
    },
    background: {
      primary: "#000",
    },
    border: {
      primary: "#444",
    },
    button: {
      primary: buttonSeedColor,
      secondary: buttonSeedColor,
    },
    status: {
      error: "#ff8a80",
    },
    icon: {
      default: "#ccc",
      selected: "#fff",
    },
  },
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

const preference = readThemePreference();

StyleSheet.configure({
  themes: appThemes,
  settings:
    preference === THEME.SYSTEM
      ? { adaptiveThemes: true }
      : { initialTheme: preference },
});

applyThemePreference(preference);
