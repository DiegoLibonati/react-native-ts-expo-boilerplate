import type { JSX } from "react";

import ContextScreen from "@/screens/ContextScreen/ContextScreen";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";

export default function ContextRoute(): JSX.Element {
  return (
    <CounterProvider>
      <ContextScreen />
    </CounterProvider>
  );
}
