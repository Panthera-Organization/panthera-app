import { Picker, Row, Spacer } from "@expo/ui";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Text } from "@/components/Text";
import {
  isThemePreference,
  readThemePreference,
  saveThemePreference,
  THEME_PREFERENCES,
} from "@/theme/preference";

export function ThemePicker() {
  const { t } = useTranslation();

  return (
    <Row alignment="center" spacing={12} style={styles.row}>
      <Text textStyle={styles.label}>{t("theme.label")}</Text>
      <Spacer flexible />
      <Picker
        onValueChange={(value) => {
          if (!isThemePreference(value)) {
            return;
          }

          saveThemePreference(value);
        }}
        selectedValue={readThemePreference()}
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
