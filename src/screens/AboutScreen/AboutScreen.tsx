import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";

import Link from "@/components/Link/Link";

import { theme } from "@/styles/theme";

function AboutScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>

      <View style={styles.links}>
        <Link href="/product/12" accessibilityLabel="Go to Product Page 12">
          Go to Product Page: 12
        </Link>
        <Link href="/context" accessibilityLabel="Go to Context Page">
          Go to Context Page
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.light.background.screen,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.light.text.primary,
    marginBottom: theme.spacing.lg,
  },
  links: {
    gap: theme.spacing.sm,
  },
});

export default AboutScreen;
