import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const MIN_PASSWORD_LENGTH = 6;

type AuthFormProps = {
  submitLabel: string;
  alternateLabel: string;
  onSubmit: (email: string, password: string) => Promise<string | null>;
  onAlternate: () => void;
};

export default function AuthForm({
  submitLabel,
  alternateLabel,
  onSubmit,
  onAlternate,
}: AuthFormProps) {
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

    setIsSubmitting(true);
    setErrorMessage(null);
    const message = await onSubmit(email.trim(), password);
    if (message) {
      setErrorMessage(message);
    }
    setIsSubmitting(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.label}>Email</Text>
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
        textContentType="emailAddress"
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="password"
        onChangeText={(value) => {
          setPassword(value);
          setErrorMessage(null);
        }}
        secureTextEntry
        style={styles.input}
        textContentType="password"
        value={password}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canSubmit }}
        disabled={!canSubmit}
        onPress={() => {
          void handleSubmit();
        }}
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        disabled={isSubmitting}
        onPress={onAlternate}
        style={styles.alternate}
      >
        <Text style={styles.alternateText}>{alternateLabel}</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  error: {
    color: "#b00020",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2f95dc",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  alternate: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  alternateText: {
    color: "#2f95dc",
    fontSize: 16,
  },
});
