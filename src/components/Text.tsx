import { Text as ExpoText } from "@expo/ui";
import type { ComponentProps } from "react";
import { useUnistyles } from "react-native-unistyles";

type TextProps = ComponentProps<typeof ExpoText>;

export function Text({ textStyle, ...props }: TextProps) {
  const { theme } = useUnistyles();

  return (
    <ExpoText
      {...props}
      textStyle={{ color: theme.colors.text.primary, ...textStyle }}
    />
  );
}
