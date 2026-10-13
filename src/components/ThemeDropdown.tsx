import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OptionDropdown } from "@/components/OptionDropdown";
import {
  readThemePreference,
  saveThemePreference,
  THEME_PREFERENCES,
} from "@/theme/preference";

export function ThemeDropdown() {
  const { t } = useTranslation();
  const [preference, setPreference] = useState(readThemePreference);

  return (
    <OptionDropdown
      label={t("theme.label")}
      marginTop={16}
      onSelect={(value) => {
        saveThemePreference(value);
        setPreference(value);
      }}
      optionTestID={(value) => `theme-option-${value}`}
      options={THEME_PREFERENCES.map((value) => ({
        value,
        label: t(`theme.${value}`),
      }))}
      selected={preference}
      testID="theme-dropdown"
    />
  );
}
