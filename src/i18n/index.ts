import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  APP_LANGUAGES,
  AppLanguage,
  isAppLanguage,
  resolveAppLanguage,
} from "./languages";
import en from "./locales/en.json";
import pl from "./locales/pl.json";

const catalogs: Record<AppLanguage, typeof en> = {
  [AppLanguage.English]: en,
  [AppLanguage.Polish]: pl,
};

export {
  APP_LANGUAGES,
  AppLanguage,
  DEFAULT_LANGUAGE,
  LANGUAGE_NAME_KEYS,
  isAppLanguage,
  resolveAppLanguage,
} from "./languages";

export const LANGUAGE_STORAGE_KEY = "panthera.language";

export function deviceLanguage(): AppLanguage {
  const locale = getLocales()[0];
  return resolveAppLanguage(locale?.languageCode ?? locale?.languageTag);
}

export async function readSavedLanguage(): Promise<AppLanguage | null> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isAppLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

let ready: Promise<void> | null = null;

export function initI18n(): Promise<void> {
  if (ready) {
    return ready;
  }

  ready = (async () => {
    const saved = await readSavedLanguage();
    const lng = saved ?? deviceLanguage();

    await i18n.use(initReactI18next).init({
      resources: Object.fromEntries(
        APP_LANGUAGES.map((language) => [
          language,
          { translation: catalogs[language] },
        ]),
      ),
      lng,
      fallbackLng: false,
      returnNull: false,
      interpolation: { escapeValue: false },
      parseMissingKeyHandler: (key) => key,
    });
  })().catch((error: unknown) => {
    ready = null;
    throw error;
  });

  return ready;
}

export async function setAppLanguage(language: AppLanguage): Promise<void> {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
