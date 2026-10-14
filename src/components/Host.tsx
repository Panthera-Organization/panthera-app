import { Host as ExpoHost, type UniversalHostProps } from "@expo/ui";

import { buttonSeedColor } from "@/theme/unistyles";

export function Host(props: UniversalHostProps) {
  return <ExpoHost {...props} seedColor={buttonSeedColor} />;
}
