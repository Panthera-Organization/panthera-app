import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import {
  readThemePreference,
  saveThemePreference,
  THEME_PREFERENCES,
} from "@/theme/preference";

export function ThemeDropdown() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [preference, setPreference] = useState(readThemePreference);

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityLabel={t("theme.label")}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        style={styles.control}
        testID="theme-dropdown"
      >
        <Text style={styles.controlText}>{t(`theme.${preference}`)}</Text>
      </Pressable>
      {open ? (
        <View style={styles.menu} testID="theme-dropdown-menu">
          {THEME_PREFERENCES.map((value) => {
            const selected = value === preference;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={value}
                onPress={() => {
                  saveThemePreference(value);
                  setPreference(value);
                  setOpen(false);
                }}
                style={styles.option}
                testID={`theme-option-${value}`}
              >
                <Text
                  style={[styles.optionText, selected && styles.optionSelected]}
                >
                  {t(`theme.${value}`)}
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
    marginTop: 16,
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
