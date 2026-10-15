import { useQuery } from "@apollo/client/react";
import { Button, Column, Spacer } from "@expo/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Host } from "@/components/Host";
import { Text } from "@/components/Text";
import { useAuth } from "@/state/AuthContext";
import { runAuthAction } from "@/state/runAuthAction";

import { HomeViewerDocument } from "./Home.generated";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const { data, error, loading, refetch } = useQuery(HomeViewerDocument);

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    await runAuthAction(signOut, setIsSigningOut, setSignOutError);
  }

  function renderViewerState() {
    if (loading && !data) {
      return (
        <ActivityIndicator
          accessibilityLabel={t("screens.home.loading")}
          testID="home-viewer-loading"
        />
      );
    }

    if (error && !data) {
      return (
        <Column alignment="center" spacing={8}>
          <Text testID="home-viewer-error" textStyle={styles.body}>
            {error.message}
          </Text>
          <Button
            label={t("screens.home.retry")}
            onPress={() => {
              refetch().catch(() => {});
            }}
            testID="home-retry"
          />
        </Column>
      );
    }

    if (!data?.viewer) {
      return (
        <Column alignment="center" spacing={8}>
          <Text testID="home-viewer-session-expired" textStyle={styles.body}>
            {t("screens.home.sessionExpired")}
          </Text>
          {signOutError ? (
            <Text textStyle={styles.error}>{signOutError}</Text>
          ) : null}
          <Button
            disabled={isSigningOut}
            label={t("screens.auth.signOut")}
            onPress={() => {
              void handleSignOut();
            }}
            testID="home-sign-out"
          />
        </Column>
      );
    }

    const trimmedName = data.viewer.fullName.trim();
    if (trimmedName === "") {
      return (
        <Text testID="home-viewer-name" textStyle={styles.body}>
          {t("screens.home.noNameYet")}
        </Text>
      );
    }

    return (
      <Text testID="home-viewer-name" textStyle={styles.body}>
        {trimmedName}
      </Text>
    );
  }

  return (
    <Host ignoreSafeArea="all" style={styles.host} useViewportSizeMeasurement>
      <Column alignment="center" spacing={16} style={styles.column}>
        <Spacer flexible />
        <Text textStyle={styles.title}>{t("screens.home.title")}</Text>
        <Column alignment="center" style={styles.viewerSlot}>
          {renderViewerState()}
        </Column>
        <Spacer flexible />
      </Column>
    </Host>
  );
}

const styles = StyleSheet.create((theme) => ({
  body: {
    fontSize: 16,
    textAlign: "center",
  },
  column: {
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
  viewerSlot: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
  },
}));
