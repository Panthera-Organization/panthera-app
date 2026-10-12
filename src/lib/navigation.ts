import { createNavigationContainerRef } from "@react-navigation/native";

import type { AuthorizedStackParamList } from "@/navigation/types";

/**
 * Centralized navigation helpers.
 * Add helpers here as the app grows, e.g. goToSettings(), goToProfile(id).
 */
export const navigationRef =
  createNavigationContainerRef<AuthorizedStackParamList>();

export function goToHome() {
  if (navigationRef.isReady()) {
    navigationRef.navigate("Tabs", { screen: "Home" });
  }
}
