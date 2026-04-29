import { TouchableOpacity, Text, StyleSheet } from "react-native";

import type { JSX } from "react";
import type { ActionProps } from "@/types/props";

import { theme } from "@/styles/theme";

function Action({ onPress, children, accessibilityLabel, testID }: ActionProps): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      testID={testID}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.light.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  text: {
    color: theme.colors.light.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
});

export default Action;
