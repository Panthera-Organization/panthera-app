import { createNavigationContainerRef } from "@react-navigation/native";

import type { RootStackParamList } from "@/navigation/types";

/**
 * Centralized navigation helpers.
 * Add helpers here as the app grows, e.g. goToSettings(), goToProfile(id).
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function goToHome() {
  if (navigationRef.isReady()) {
    navigationRef.navigate("Tabs", { screen: "Home" });
  }
}
