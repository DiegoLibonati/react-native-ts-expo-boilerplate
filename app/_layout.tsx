import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens, enableFreeze } from "react-native-screens";

import type { JSX } from "react";

import ErrorBoundaryComponent from "@/components/ErrorBoundary/ErrorBoundary";

enableScreens(true);
enableFreeze(true);

export default function RootLayout(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Slot />
    </SafeAreaProvider>
  );
}

export { ErrorBoundaryComponent as ErrorBoundary };
