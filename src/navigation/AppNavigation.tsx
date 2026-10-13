import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useUnistyles } from "react-native-unistyles";

import { navigationRef } from "@/lib/navigation";
import { syncRootViewBackground, THEME } from "@/theme/preference";

import RootNavigator from "./RootNavigator";

function navigationTheme(
  themeName: THEME.LIGHT | THEME.DARK,
  colors: {
    background: { primary: string };
    border: { primary: string };
    icon: { selected: string };
    status: { error: string };
    text: { primary: string };
  },
): Theme {
  const base = themeName === THEME.DARK ? DarkTheme : DefaultTheme;

  return {
    ...base,
    dark: themeName === THEME.DARK,
    colors: {
      ...base.colors,
      primary: colors.icon.selected,
      background: colors.background.primary,
      card: colors.background.primary,
      text: colors.text.primary,
      border: colors.border.primary,
      notification: colors.status.error,
    },
  };
}

export function AppNavigation() {
  const { theme, rt } = useUnistyles();
  const themeName = rt.themeName === THEME.DARK ? THEME.DARK : THEME.LIGHT;

  useEffect(() => {
    syncRootViewBackground();
  }, [theme.colors.background.primary]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme(themeName, theme.colors)}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
