import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import {
  APP_LANGUAGES,
  LANGUAGE_NAME_KEYS,
  resolveAppLanguage,
  setAppLanguage,
} from "@/i18n";

export function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = resolveAppLanguage(i18n.language);

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityLabel={t("language.label")}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        style={styles.control}
        testID="language-dropdown"
      >
        <Text style={styles.controlText}>
          {t(LANGUAGE_NAME_KEYS[current])}
        </Text>
      </Pressable>
      {open ? (
        <View style={styles.menu} testID="language-dropdown-menu">
          {APP_LANGUAGES.map((language) => {
            const selected = language === current;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={language}
                onPress={() => {
                  void setAppLanguage(language);
                  setOpen(false);
                }}
                style={styles.option}
                testID={`language-option-${language}`}
              >
                <Text
                  style={[styles.optionText, selected && styles.optionSelected]}
                >
                  {t(LANGUAGE_NAME_KEYS[language])}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    marginTop: 24,
    minWidth: 180,
  },
  control: {
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  controlText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
  menu: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
    borderTopWidth: 0,
    borderWidth: 1,
    marginTop: -1,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
  optionSelected: {
    fontWeight: "bold",
  },
}));
