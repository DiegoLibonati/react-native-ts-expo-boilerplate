import { View, Text, StyleSheet } from "react-native";

import type { JSX } from "react";
import type { UserCardProps } from "@/types/props";

import { theme } from "@/styles/theme";

function UserCard({ name, username, email, phone, website, company }: UserCardProps): JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.info}>{email}</Text>
      <Text style={styles.info}>{phone}</Text>
      <Text style={styles.info}>{website}</Text>
      <Text style={styles.company}>{company.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.light.background.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm + 4,
    shadowColor: theme.colors.light.text.primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.radius.sm,
    elevation: 2,
  },
  name: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.xs,
    color: theme.colors.light.text.primary,
  },
  username: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.light.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  info: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.light.text.primary,
    marginBottom: 2,
  },
  company: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.light.primary,
    marginTop: theme.spacing.sm,
    fontWeight: theme.typography.weights.medium,
  },
});

export default UserCard;
