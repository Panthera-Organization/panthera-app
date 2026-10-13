import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { LanguageDropdown } from "@/components/LanguageDropdown";
import { ThemeDropdown } from "@/components/ThemeDropdown";
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
    <View style={styles.container}>
      <Text style={styles.title}>{t("screens.profile.title")}</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isSubmitting }}
        disabled={isSubmitting}
        onPress={() => {
          void handleSignOut();
        }}
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
      <LanguageDropdown />
      <ThemeDropdown />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: theme.colors.background.primary,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  error: {
    color: theme.colors.status.error,
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.button.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: "600",
  },
}));
