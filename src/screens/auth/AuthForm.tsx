import { Button, Column, Spacer, TextInput } from "@expo/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Host } from "@/components/Host";
import { Text } from "@/components/Text";
import type { AuthCredentials } from "@/state/AuthContext";
import { runAuthAction } from "@/state/runAuthAction";

const MIN_PASSWORD_LENGTH = 6;

type AuthFormProps = {
  submitLabel: string;
  alternateLabel: string;
  onSubmit: (credentials: AuthCredentials) => Promise<string | null>;
  onAlternate: () => void;
};

export default function AuthForm({
  submitLabel,
  alternateLabel,
  onSubmit,
  onAlternate,
}: AuthFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    email.trim().length > 0 &&
    password.length >= MIN_PASSWORD_LENGTH &&
    !isSubmitting;

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    await runAuthAction(
      () => onSubmit({ email: email.trim(), password }),
      setIsSubmitting,
      setErrorMessage,
    );
  }

  return (
    <Host
      ignoreSafeArea="keyboard"
      style={styles.host}
      useViewportSizeMeasurement
    >
      <Column spacing={8} style={styles.column}>
        <Spacer flexible />
        <Text textStyle={styles.label}>{t("screens.auth.email")}</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => {
            setEmail(value);
            setErrorMessage(null);
          }}
          style={styles.input}
          textStyle={styles.inputText}
        />
        <Text textStyle={styles.label}>{t("screens.auth.password")}</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={(value) => {
            setPassword(value);
            setErrorMessage(null);
          }}
          secureTextEntry
          style={styles.input}
          textStyle={styles.inputText}
        />
        {errorMessage ? (
          <Text textStyle={styles.error}>{errorMessage}</Text>
        ) : null}
        <Button
          disabled={!canSubmit}
          label={submitLabel}
          onPress={() => {
            void handleSubmit();
          }}
        />
        <Button
          disabled={isSubmitting}
          label={alternateLabel}
          onPress={onAlternate}
          variant="text"
        />
        <Spacer flexible />
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: {
    width: "100%",
  },
  error: {
    color: theme.colors.status.error,
    fontSize: 16,
  },
  host: {
    backgroundColor: theme.colors.background.primary,
    flex: 1,
    padding: 24,
  },
  input: {
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputText: {
    color: theme.colors.text.primary,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
}));
