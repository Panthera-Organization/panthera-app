export enum AppLanguage {
  English = "en",
  Polish = "pl",
}

export const DEFAULT_LANGUAGE = AppLanguage.English;

export const APP_LANGUAGES = Object.values(AppLanguage);

export const LANGUAGE_NAME_KEYS: Record<AppLanguage, string> = {
  [AppLanguage.English]: "language.english",
  [AppLanguage.Polish]: "language.polish",
};

export function isAppLanguage(
  value: string | null | undefined,
): value is AppLanguage {
  return APP_LANGUAGES.some((language) => language === value);
}

export function resolveAppLanguage(
  languageCode: string | null | undefined,
): AppLanguage {
  const code = languageCode?.toLowerCase();

  if (!code) {
    return DEFAULT_LANGUAGE;
  }

  const match = APP_LANGUAGES.find(
    (language) => code === language || code.startsWith(`${language}-`),
  );

  return match ?? DEFAULT_LANGUAGE;
}
