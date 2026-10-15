import { NavigationContainer } from "@react-navigation/native";
import { type ReactNode } from "react";
import { useUnistyles } from "react-native-unistyles";

import { navigationRef } from "@/lib/navigation";

import RootNavigator from "./RootNavigator";

function ThemedNavigationContainer({ children }: { children: ReactNode }) {
  const { theme } = useUnistyles();

  return (
    <NavigationContainer ref={navigationRef} theme={theme.navigation}>
      {children}
    </NavigationContainer>
  );
}

export function AppNavigation() {
  return (
    <ThemedNavigationContainer>
      <RootNavigator />
    </ThemedNavigationContainer>
  );
}
