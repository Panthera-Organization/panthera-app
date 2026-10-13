import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { LanguageDropdown } from "@/components/LanguageDropdown";

export default function SignedOutScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("screens.signedOut.title")}</Text>
      <LanguageDropdown />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
