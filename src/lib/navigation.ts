import { router } from "expo-router";

/**
 * Centralized navigation helpers using typed routes.
 * Add helpers here as the app grows, e.g. goToSettings(), goToProfile(id).
 */

export function goToHome() {
  router.push("/");
}
