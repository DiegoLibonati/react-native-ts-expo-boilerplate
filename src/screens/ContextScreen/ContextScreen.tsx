import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";

import Action from "@/components/Action/Action";
import Link from "@/components/Link/Link";

import { useCounterContext } from "@/hooks/useCounterContext";

import { theme } from "@/styles/theme";

function ContextScreen(): JSX.Element {
  const { counterState, addCounter, subtractCounter } = useCounterContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Context Page</Text>

      <View style={styles.counter} accessibilityLabel="Counter">
        <Action
          onPress={() => {
            subtractCounter(1);
          }}
          accessibilityLabel="Subtract 1 from counter"
          testID="counter-subtract"
        >
          -
        </Action>
        <Text
          style={styles.counterValue}
          accessibilityLabel={`Counter value: ${counterState.counter}`}
          accessibilityLiveRegion="polite"
        >
          {counterState.counter}
        </Text>
        <Action
          onPress={() => {
            addCounter(1);
          }}
          accessibilityLabel="Add 1 to counter"
          testID="counter-add"
        >
          +
        </Action>
      </View>

      <View style={styles.links}>
        <Link href="/nonexistent" accessibilityLabel="Go to unknown page">
          Go to Not Exists Page
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
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  counterValue: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.light.text.primary,
    minWidth: 60,
    textAlign: "center",
  },
  links: {
    gap: theme.spacing.sm,
  },
});

export default ContextScreen;
