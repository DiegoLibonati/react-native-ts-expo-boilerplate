import type { JSX } from "react";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";
import { ContextScreen } from "@/screens/ContextScreen/ContextScreen";

export default function ContextRoute(): JSX.Element {
  return (
    <CounterProvider>
      <ContextScreen />
    </CounterProvider>
  );
}
