import { Appearance } from "react-native";
import { createMMKV } from "react-native-mmkv";
import { UnistylesRuntime } from "react-native-unistyles";

const storage = createMMKV({ id: "panthera" });

export enum THEME {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export const THEME_PREFERENCES = [THEME.SYSTEM, THEME.LIGHT, THEME.DARK];

export function isThemePreference(
  value: string | number | undefined,
): value is THEME {
  return THEME_PREFERENCES.some((preference) => preference === value);
}

export function readThemePreference(): THEME {
  const stored = storage.getString("panthera.theme");
  return isThemePreference(stored) ? stored : THEME.SYSTEM;
}

export function applyThemePreference(preference: THEME): void {
  if (preference === THEME.SYSTEM) {
    UnistylesRuntime.setAdaptiveThemes(true);
    // React Native uses "auto" to clear an app scheme and follow the system.
    // eslint-disable-next-line i18next/no-literal-string
    Appearance.setColorScheme("auto");
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(preference);
    Appearance.setColorScheme(preference);
  }
}

export function saveThemePreference(preference: THEME): void {
  storage.set("panthera.theme", preference);
  applyThemePreference(preference);
}
