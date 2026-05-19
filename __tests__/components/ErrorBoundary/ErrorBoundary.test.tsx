import { render, screen, fireEvent } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { ErrorBoundaryProps } from "@/types/props";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const mockRetry = jest.fn();
let mockConsoleError: jest.SpyInstance;

const renderComponent = (props: Partial<ErrorBoundaryProps> = {}): RenderAPI => {
  const defaultProps: ErrorBoundaryProps = {
    error: new Error("Boom"),
    retry: mockRetry,
    ...props,
  };
  return render(<ErrorBoundary {...defaultProps} />);
};

describe("ErrorBoundary", () => {
  beforeEach((): void => {
    mockConsoleError = jest.spyOn(console, "error").mockImplementation((): void => undefined);
  });

  describe("rendering", () => {
    it("should render the error title", () => {
      renderComponent();

      expect(screen.getByText("Something went wrong")).toBeTruthy();
    });

    it("should render the error message", () => {
      renderComponent({ error: new Error("Database is down") });

      expect(screen.getByText("Database is down")).toBeTruthy();
    });

    it("should render the retry button", () => {
      renderComponent();

      expect(screen.getByText("Try again")).toBeTruthy();
    });

    it("should expose the retry button with accessibilityLabel Retry", () => {
      renderComponent();

      expect(screen.getByLabelText("Retry")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should call retry when the retry button is pressed", () => {
      renderComponent();

      fireEvent.press(screen.getByText("Try again"));

      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it("should log the captured error to the console", () => {
      const error = new Error("Captured");

      renderComponent({ error });

      expect(mockConsoleError).toHaveBeenCalledWith("ErrorBoundary caught:", error);
    });
  });

  describe("edge cases", () => {
    it("should render an empty message when the error message is empty", () => {
      renderComponent({ error: new Error("") });

      expect(screen.getByText("Something went wrong")).toBeTruthy();
    });
  });
});
