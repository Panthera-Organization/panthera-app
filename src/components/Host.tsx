import { Host as ExpoHost, type UniversalHostProps } from "@expo/ui";

import { hostSeedColor } from "@/theme/unistyles";

export function Host(props: UniversalHostProps) {
  return <ExpoHost {...props} seedColor={hostSeedColor} />;
}
