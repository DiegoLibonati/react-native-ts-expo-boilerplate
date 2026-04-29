import { Alert } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Text as MockText } from "react-native";
import { useLocalSearchParams } from "expo-router";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import ProductScreen from "@/screens/ProductScreen/ProductScreen";

interface LinkMockProps {
  children: ReactNode;
  href: unknown;
  style?: unknown;
  accessibilityLabel?: string;
  testID?: string;
}

interface ExpoRouterMock {
  useLocalSearchParams: jest.Mock;
  Link: (props: LinkMockProps) => ReactNode;
}

jest.mock(
  "expo-router",
  (): ExpoRouterMock => ({
    useLocalSearchParams: jest.fn(),
    Link: ({ children }: LinkMockProps): ReactNode => <MockText>{children}</MockText>,
  })
);

const renderScreen = (): RenderAPI => render(<ProductScreen />);

describe("ProductScreen", () => {
  beforeEach((): void => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "42" });
  });

  describe("rendering", () => {
    it("should render the product page title with the id", () => {
      renderScreen();
      expect(screen.getByText("Product Page: 42")).toBeTruthy();
    });

    it("should render the link to Not Exists Page", () => {
      renderScreen();
      expect(screen.getByText("Go to Not Exists Page")).toBeTruthy();
    });

    it("should render the action button", () => {
      renderScreen();
      expect(screen.getByText("Click Product Id")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should show an alert with the product id when the button is pressed", () => {
      const mockAlertAlert = jest.spyOn(Alert, "alert");
      renderScreen();
      fireEvent.press(screen.getByTestId("action-show-product-id"));
      expect(mockAlertAlert).toHaveBeenCalledWith("Product ID", "Product ID: 42");
    });
  });

  describe("edge cases", () => {
    it("should render Unknown in the title when id is not provided", () => {
      (useLocalSearchParams as jest.Mock).mockReturnValue({ id: undefined });
      renderScreen();
      expect(screen.getByText("Product Page: Unknown")).toBeTruthy();
    });

    it("should not show an alert when the button is pressed with no id", () => {
      (useLocalSearchParams as jest.Mock).mockReturnValue({ id: undefined });
      const mockAlertAlert = jest.spyOn(Alert, "alert");
      renderScreen();
      fireEvent.press(screen.getByTestId("action-show-product-id"));
      expect(mockAlertAlert).not.toHaveBeenCalled();
    });
  });
});
