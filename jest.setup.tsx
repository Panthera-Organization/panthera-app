jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

import "react-native-unistyles/mocks";

import "@/theme/unistyles";

jest.mock("@expo/ui", () => {
  const React = require("react");
  const { Pressable, Text: RNText, View } = require("react-native");

  function Button({
    disabled,
    label,
    onPress,
    testID,
  }: {
    disabled?: boolean;
    label: string;
    onPress?: () => void;
    testID?: string;
  }) {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        testID={testID}
      >
        <RNText>{label}</RNText>
      </Pressable>
    );
  }

  function Column({
    children,
    style,
  }: {
    children?: React.ReactNode;
    style?: object;
  }) {
    return <View style={style}>{children}</View>;
  }

  function Spacer() {
    return <View />;
  }

  function Text({
    children,
    testID,
  }: {
    children?: React.ReactNode;
    testID?: string;
  }) {
    return <RNText testID={testID}>{children}</RNText>;
  }

  return { Button, Column, Spacer, Text };
});
