import { render, screen, fireEvent } from "@testing-library/react-native";
import { Text as MockText } from "react-native";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import ContextScreen from "@/screens/ContextScreen/ContextScreen";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";

interface LinkMockProps {
  children: ReactNode;
  href: unknown;
  style?: unknown;
  accessibilityLabel?: string;
  testID?: string;
}

jest.mock("expo-router", (): { Link: (props: LinkMockProps) => ReactNode } => ({
  Link: ({ children }: LinkMockProps): ReactNode => <MockText>{children}</MockText>,
}));

const renderScreen = (): RenderAPI =>
  render(
    <CounterProvider>
      <ContextScreen />
    </CounterProvider>
  );

describe("ContextScreen", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderScreen();
      expect(screen.getByText("Context Page")).toBeTruthy();
    });

    it("should render the initial counter value as 0", () => {
      renderScreen();
      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should render the add button", () => {
      renderScreen();
      expect(screen.getByTestId("counter-add")).toBeTruthy();
    });

    it("should render the subtract button", () => {
      renderScreen();
      expect(screen.getByTestId("counter-subtract")).toBeTruthy();
    });

    it("should render the link to Not Exists Page", () => {
      renderScreen();
      expect(screen.getByText("Go to Not Exists Page")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should increment the counter when the add button is pressed", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("counter-add"));
      expect(screen.getByText("1")).toBeTruthy();
    });

    it("should decrement the counter when the subtract button is pressed", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("counter-subtract"));
      expect(screen.getByText("-1")).toBeTruthy();
    });

    it("should increment the counter multiple times", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("counter-add"));
      fireEvent.press(screen.getByTestId("counter-add"));
      fireEvent.press(screen.getByTestId("counter-add"));
      expect(screen.getByText("3")).toBeTruthy();
    });

    it("should reflect combined add and subtract operations", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("counter-add"));
      fireEvent.press(screen.getByTestId("counter-add"));
      fireEvent.press(screen.getByTestId("counter-subtract"));
      expect(screen.getByText("1")).toBeTruthy();
    });
  });
});
