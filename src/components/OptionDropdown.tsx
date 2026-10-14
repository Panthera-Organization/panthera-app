import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Option<Value extends string> = {
  value: Value;
  label: string;
};

type OptionDropdownProps<Value extends string> = {
  label: string;
  marginTop: number;
  options: Option<Value>[];
  selected: Value;
  testID: string;
  optionTestID: (value: Value) => string;
  onSelect: (value: Value) => void;
};

export function OptionDropdown<Value extends string>({
  label,
  marginTop,
  options,
  selected,
  testID,
  optionTestID,
  onSelect,
}: OptionDropdownProps<Value>) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === selected);

  return (
    <View style={[styles.wrap, { marginTop }]}>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        style={styles.control}
        testID={testID}
      >
        <Text style={styles.controlText}>{selectedOption?.label}</Text>
      </Pressable>
      {open ? (
        <View style={styles.menu} testID={`${testID}-menu`}>
          {options.map((option) => {
            const isSelected = option.value === selected;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                style={styles.option}
                testID={optionTestID(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    minWidth: 180,
  },
  control: {
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  controlText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
  menu: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
    borderTopWidth: 0,
    borderWidth: 1,
    marginTop: -1,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
  optionSelected: {
    fontWeight: "bold",
  },
}));
