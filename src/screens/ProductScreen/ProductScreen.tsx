import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import type { JSX } from "react";

import Action from "@/components/Action/Action";
import Link from "@/components/Link/Link";

import { theme } from "@/styles/theme";

function ProductScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();

  const showProductId = (): void => {
    if (!id) return;
    Alert.alert("Product ID", `Product ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Page: {id || "Unknown"}</Text>

      <View style={styles.links}>
        <Link href="/nonexistent" accessibilityLabel="Go to an unknown page">
          Go to Not Exists Page
        </Link>
      </View>

      <View style={styles.actions}>
        <Action
          onPress={showProductId}
          accessibilityLabel={`Show product ID ${id || "unknown"}`}
          testID="action-show-product-id"
        >
          Click Product Id
        </Action>
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
    marginBottom: theme.spacing.lg,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});

export default ProductScreen;
