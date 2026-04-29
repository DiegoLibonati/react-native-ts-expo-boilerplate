import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";

import Link from "@/components/Link/Link";

import { theme } from "@/styles/theme";

function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>

      <View style={styles.links}>
        <Link href="/about" accessibilityLabel="Go to About Page">
          Go to About Page
        </Link>
        <Link href="/users" accessibilityLabel="Go to Users Page">
          Go to Users Page
        </Link>
        <Link href="/context" accessibilityLabel="Go to Context Page">
          Go to Context Page
        </Link>
        <Link href="/product/12" accessibilityLabel="Go to Product Page 12">
          Go to Product Page: 12
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.primary,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.light.tertiary,
    marginBottom: theme.spacing.lg,
  },
  links: {
    gap: theme.spacing.sm,
  },
});

export default HomeScreen;
