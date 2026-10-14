import { Host as ExpoHost } from "@expo/ui";
import type { ComponentProps } from "react";
import { useUnistyles } from "react-native-unistyles";

import { THEME } from "@/theme/preference";

type HostProps = ComponentProps<typeof ExpoHost>;

export function Host(props: HostProps) {
  const { theme, rt } = useUnistyles();
  const scheme = rt.themeName === THEME.DARK ? THEME.DARK : THEME.LIGHT;

  return (
    <ExpoHost
      {...props}
      colorScheme={scheme}
      seedColor={theme.colors.button.primary}
    />
  );
}
