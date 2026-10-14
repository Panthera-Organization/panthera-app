import { Button, Column, Picker, Row, Spacer } from "@expo/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Host } from "@/components/Host";
import { Text } from "@/components/Text";
import {
  APP_LANGUAGES,
  isAppLanguage,
  LANGUAGE_NAME_KEYS,
  resolveAppLanguage,
  setAppLanguage,
} from "@/i18n";
import { useAuth } from "@/state/AuthContext";
import { runAuthAction } from "@/state/runAuthAction";
import {
  readThemePreference,
  saveThemePreference,
  THEME,
  THEME_PREFERENCES,
} from "@/theme/preference";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { signOut } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [themePreference, setThemePreference] = useState(readThemePreference);
  const currentLanguage = resolveAppLanguage(i18n.language);

  async function handleSignOut() {
    if (isSubmitting) {
      return;
    }

    await runAuthAction(signOut, setIsSubmitting, setErrorMessage);
  }

  return (
    <Host style={styles.host} useViewportSizeMeasurement>
      <Column alignment="center" spacing={16}>
        <Spacer flexible />
        <Text textStyle={styles.title}>{t("screens.profile.title")}</Text>
        {errorMessage ? (
          <Text textStyle={styles.error}>{errorMessage}</Text>
        ) : null}
        <Button
          disabled={isSubmitting}
          label={t("screens.auth.signOut")}
          onPress={() => {
            void handleSignOut();
          }}
        />
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
        <Row alignment="center" spacing={12} style={styles.row}>
          <Text textStyle={styles.label}>{t("theme.label")}</Text>
          <Spacer flexible />
          <Picker
            onValueChange={(value) => {
              if (!isThemePreference(value)) {
                return;
              }

              saveThemePreference(value);
              setThemePreference(value);
            }}
            selectedValue={themePreference}
            testID="theme-dropdown"
          >
            {THEME_PREFERENCES.map((preference) => (
              <Picker.Item
                key={preference}
                label={t(`theme.${preference}`)}
                value={preference}
              />
            ))}
          </Picker>
        </Row>
        <Spacer flexible />
      </Column>
    </Host>
  );
}

function isThemePreference(value: string | number): value is THEME {
  return THEME_PREFERENCES.some((preference) => preference === value);
}

const styles = StyleSheet.create((theme) => ({
  error: {
    color: theme.colors.status.error,
    fontSize: 16,
    textAlign: "center",
  },
  host: {
    backgroundColor: theme.colors.background.primary,
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: 16,
  },
  row: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
}));
