import { Column, Spacer } from "@expo/ui";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Host } from "@/components/Host";
import { Text } from "@/components/Text";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Host style={styles.host} useViewportSizeMeasurement>
      <Column alignment="center" style={styles.column}>
        <Spacer flexible />
        <Text textStyle={styles.title}>{t("screens.home.title")}</Text>
        <Spacer flexible />
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create(() => ({
  column: {
    width: "100%",
  },
  host: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
}));
