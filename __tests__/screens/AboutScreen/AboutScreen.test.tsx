import { render, screen } from "@testing-library/react-native";
import { Text as MockText } from "react-native";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import { AboutScreen } from "@/screens/AboutScreen/AboutScreen";

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

const renderScreen = (): RenderAPI => render(<AboutScreen />);

describe("AboutScreen", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderScreen();
      expect(screen.getByText("About Page")).toBeTruthy();
    });

    it("should render the link to Product Page 12", () => {
      renderScreen();
      expect(screen.getByText("Go to Product Page: 12")).toBeTruthy();
    });

    it("should render the link to Context Page", () => {
      renderScreen();
      expect(screen.getByText("Go to Context Page")).toBeTruthy();
    });
  });
});
