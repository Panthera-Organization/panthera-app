// Keep this import first. Unistyles reads the theme before any stylesheet is created.
import "@/theme/unistyles";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { initI18n } from "@/i18n";
import { AppNavigation } from "@/navigation/AppNavigation";
import { AuthProvider, useAuth } from "@/state/AuthContext";

SplashScreen.preventAutoHideAsync();

function AppShell() {
  const { isReady } = useAuth();
  const [i18nReady, setI18nReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    let active = true;

    initI18n()
      .then(() => {
        if (active) {
          setI18nReady(true);
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded && isReady && i18nReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady, i18nReady]);

  if (!fontsLoaded || !isReady || !i18nReady) {
    return null;
  }

  return <AppNavigation />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
