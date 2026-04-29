import { Link as ExpoLink } from "expo-router";
import { StyleSheet } from "react-native";

import type { JSX } from "react";
import type { LinkProps } from "@/types/props";

import { theme } from "@/styles/theme";

function Link({ href, children, accessibilityLabel, testID }: LinkProps): JSX.Element {
  return (
    <ExpoLink
      href={href}
      style={styles.link}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </ExpoLink>
  );
}

const styles = StyleSheet.create({
  link: {
    color: theme.colors.light.secondary,
    fontSize: theme.typography.sizes.md,
    paddingVertical: theme.spacing.sm,
  },
});

export default Link;
