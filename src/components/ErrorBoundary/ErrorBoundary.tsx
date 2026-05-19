import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";
import type { ErrorBoundaryProps } from "@/types/props";

import Action from "@/components/Action/Action";

import { theme } from "@/styles/theme";

function ErrorBoundary({ error, retry }: ErrorBoundaryProps): JSX.Element {
  console.error("ErrorBoundary caught:", error);

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Action onPress={retry} accessibilityLabel="Retry">
        Try again
      </Action>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  message: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.light.tertiary,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
});

export default ErrorBoundary;
