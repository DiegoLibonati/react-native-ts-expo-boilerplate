import { render, screen } from "@testing-library/react-native";
import { Text as MockText } from "react-native";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import HomeScreen from "@/screens/HomeScreen/HomeScreen";

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

const renderScreen = (): RenderAPI => render(<HomeScreen />);

describe("HomeScreen", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderScreen();
      expect(screen.getByText("Home Page")).toBeTruthy();
    });

    it("should render the link to About Page", () => {
      renderScreen();
      expect(screen.getByText("Go to About Page")).toBeTruthy();
    });

    it("should render the link to Users Page", () => {
      renderScreen();
      expect(screen.getByText("Go to Users Page")).toBeTruthy();
    });

    it("should render the link to Context Page", () => {
      renderScreen();
      expect(screen.getByText("Go to Context Page")).toBeTruthy();
    });

    it("should render the link to Product Page 12", () => {
      renderScreen();
      expect(screen.getByText("Go to Product Page: 12")).toBeTruthy();
    });
  });
});
