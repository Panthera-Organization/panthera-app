import { createMMKV } from "react-native-mmkv";
import { UnistylesRuntime } from "react-native-unistyles";

const storage = createMMKV({ id: "panthera" });

export enum THEME {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export const THEME_PREFERENCES = [THEME.SYSTEM, THEME.LIGHT, THEME.DARK];

function isThemePreference(value: string | undefined): value is THEME {
  return THEME_PREFERENCES.some((preference) => preference === value);
}

export function readThemePreference(): THEME {
  const stored = storage.getString("panthera.theme");
  return isThemePreference(stored) ? stored : THEME.SYSTEM;
}

export function syncRootViewBackground(): void {
  UnistylesRuntime.setRootViewBackgroundColor(
    UnistylesRuntime.getTheme().colors.background.primary,
  );
}

export function applyThemePreference(preference: THEME): void {
  if (preference === THEME.SYSTEM) {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(preference);
  }

  syncRootViewBackground();
}

export function saveThemePreference(preference: THEME): void {
  storage.set("panthera.theme", preference);
  applyThemePreference(preference);
}
