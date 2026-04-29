import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { Link as ExpoLinkMock } from "expo-router";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";
import type { LinkProps } from "@/types/props";

import Link from "@/components/Link/Link";

interface LinkMockProps {
  children: ReactNode;
  href: unknown;
  style?: unknown;
  accessibilityLabel?: string;
  testID?: string;
}

jest.mock("expo-router", (): { Link: jest.Mock } => ({
  Link: jest.fn(),
}));

const renderComponent = (props: Partial<LinkProps> = {}): RenderAPI => {
  const defaultProps: LinkProps = {
    href: "/",
    children: "Go to Home",
    ...props,
  };
  return render(<Link {...defaultProps} />);
};

describe("Link", () => {
  beforeEach((): void => {
    (ExpoLinkMock as unknown as jest.Mock).mockImplementation(
      ({ children, testID, accessibilityLabel }: LinkMockProps): ReactNode => (
        <Text testID={testID} accessibilityLabel={accessibilityLabel}>
          {children}
        </Text>
      )
    );
  });

  describe("rendering", () => {
    it("should render children text", () => {
      renderComponent();
      expect(screen.getByText("Go to Home")).toBeTruthy();
    });

    it("should render custom children", () => {
      renderComponent({ children: "Go to About" });
      expect(screen.getByText("Go to About")).toBeTruthy();
    });

    it("should render with the given testID", () => {
      renderComponent({ testID: "link-home" });
      expect(screen.getByTestId("link-home")).toBeTruthy();
    });

    it("should render with the given accessibilityLabel", () => {
      renderComponent({ accessibilityLabel: "Navigate to Home" });
      expect(screen.getByLabelText("Navigate to Home")).toBeTruthy();
    });

    it("should pass href to the underlying link component", () => {
      renderComponent({ href: "/about" });
      expect(ExpoLinkMock).toHaveBeenCalledWith(
        expect.objectContaining({ href: "/about" }),
        undefined
      );
    });
  });
});
