import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";

import { theme } from "@/styles/theme";

function NotFoundScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.description}>
        The page you're looking for doesn't exist or has been moved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.background.screen,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.light.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  description: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.light.text.secondary,
    textAlign: "center",
  },
});

export default NotFoundScreen;
