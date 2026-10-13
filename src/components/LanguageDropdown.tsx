import { useTranslation } from "react-i18next";

import { OptionDropdown } from "@/components/OptionDropdown";
import {
  APP_LANGUAGES,
  LANGUAGE_NAME_KEYS,
  resolveAppLanguage,
  setAppLanguage,
} from "@/i18n";

export function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const current = resolveAppLanguage(i18n.language);

  return (
    <OptionDropdown
      label={t("language.label")}
      marginTop={24}
      onSelect={(language) => {
        void setAppLanguage(language);
      }}
      optionTestID={(language) => `language-option-${language}`}
      options={APP_LANGUAGES.map((language) => ({
        value: language,
        label: t(LANGUAGE_NAME_KEYS[language]),
      }))}
      selected={current}
      testID="language-dropdown"
    />
  );
}
