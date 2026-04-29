import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import type { JSX } from "react";
import type { User } from "@/types/app";

import Link from "@/components/Link/Link";
import UserCard from "@/components/UserCard/UserCard";

import userService from "@/services/userService";

import { theme } from "@/styles/theme";

function UsersScreen(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Page</Text>

      {loading && (
        <Text style={styles.loading} accessibilityLiveRegion="polite">
          Loading users...
        </Text>
      )}

      {error && (
        <Text style={styles.error} accessibilityLiveRegion="assertive">
          Error loading users. Please try again.
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={(user) => String(user.id)}
          renderItem={({ item }) => (
            <UserCard
              name={item.name}
              username={item.username}
              email={item.email}
              phone={item.phone}
              website={item.website}
              company={item.company}
            />
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Link href="/" accessibilityLabel="Go to Home Page">
                Go to Home Page
              </Link>
            </View>
          }
          accessibilityLabel="User list"
        />
      )}
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
  loading: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.light.quaternary,
    textAlign: "center",
    marginTop: theme.spacing.lg,
  },
  error: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.error,
    textAlign: "center",
    marginTop: theme.spacing.lg,
  },
  footer: {
    marginTop: theme.spacing.md,
  },
});

export default UsersScreen;
