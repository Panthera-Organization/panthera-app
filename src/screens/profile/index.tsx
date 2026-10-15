import { Button, Column, Spacer } from "@expo/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Host } from "@/components/Host";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Text } from "@/components/Text";
import { ThemePicker } from "@/components/ThemePicker";
import { useAuth } from "@/state/AuthContext";
import { runAuthAction } from "@/state/runAuthAction";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    if (isSubmitting) {
      return;
    }

    await runAuthAction(signOut, setIsSubmitting, setErrorMessage);
  }

  return (
    <Host style={styles.host} useViewportSizeMeasurement>
      <Column alignment="center" spacing={16} style={styles.column}>
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
        <LanguagePicker />
        <ThemePicker />
        <Spacer flexible />
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: {
    paddingHorizontal: 24,
    width: "100%",
  },
  error: {
    color: theme.colors.status.error,
    fontSize: 16,
    textAlign: "center",
  },
  host: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
}));
