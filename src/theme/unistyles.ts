import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native-unistyles";

import {
  applyThemePreference,
  readThemePreference,
  THEME,
} from "@/theme/preference";

export const hostSeedColor = "#2f95dc";

const lightColors = {
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
    primary: "#2f95dc",
    secondary: "#1b6ca8",
  },
  status: {
    error: "#b00020",
  },
  icon: {
    default: "#ccc",
    selected: "#2f95dc",
  },
};

const darkColors = {
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
    primary: "#8ec8ff",
    secondary: "#4a90c4",
  },
  status: {
    error: "#ff8a80",
  },
  icon: {
    default: "#ccc",
    selected: "#fff",
  },
};

const lightTheme = {
  colors: lightColors,
  navigation: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: lightColors.icon.selected,
      background: lightColors.background.primary,
      card: lightColors.background.primary,
      text: lightColors.text.primary,
      border: lightColors.border.primary,
      notification: lightColors.status.error,
    },
  } satisfies Theme,
};

const darkTheme = {
  colors: darkColors,
  navigation: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: darkColors.icon.selected,
      background: darkColors.background.primary,
      card: darkColors.background.primary,
      text: darkColors.text.primary,
      border: darkColors.border.primary,
      notification: darkColors.status.error,
    },
  } satisfies Theme,
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
