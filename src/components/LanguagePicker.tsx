import { Picker, Row, Spacer } from "@expo/ui";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Text } from "@/components/Text";
import {
  APP_LANGUAGES,
  isAppLanguage,
  LANGUAGE_NAME_KEYS,
  resolveAppLanguage,
  setAppLanguage,
} from "@/i18n";

export function LanguagePicker() {
  const { t, i18n } = useTranslation();
  const currentLanguage = resolveAppLanguage(i18n.language);

  return (
    <Row alignment="center" spacing={12} style={styles.row}>
      <Text textStyle={styles.label}>{t("language.label")}</Text>
      <Spacer flexible />
      <Picker
        onValueChange={(value) => {
          const language = String(value);

          if (isAppLanguage(language)) {
            void setAppLanguage(language);
          }
        }}
        selectedValue={currentLanguage}
        testID="language-dropdown"
      >
        {APP_LANGUAGES.map((language) => (
          <Picker.Item
            key={language}
            label={t(LANGUAGE_NAME_KEYS[language])}
            value={language}
          />
        ))}
      </Picker>
    </Row>
  );
}

const styles = StyleSheet.create(() => ({
  label: {
    fontSize: 16,
  },
  row: {
    width: "100%",
  },
}));
