import { render, screen, fireEvent } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { ActionProps } from "@/types/props";

import Action from "@/components/Action/Action";

const mockOnPress = jest.fn();

const renderComponent = (props: Partial<ActionProps> = {}): RenderAPI => {
  const defaultProps: ActionProps = {
    onPress: mockOnPress,
    children: "Press me",
    ...props,
  };
  return render(<Action {...defaultProps} />);
};

describe("Action", () => {
  describe("rendering", () => {
    it("should render children text", () => {
      renderComponent();
      expect(screen.getByText("Press me")).toBeTruthy();
    });

    it("should render custom children", () => {
      renderComponent({ children: "Submit" });
      expect(screen.getByText("Submit")).toBeTruthy();
    });

    it("should render with the given testID", () => {
      renderComponent({ testID: "action-btn" });
      expect(screen.getByTestId("action-btn")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should call onPress when pressed", () => {
      renderComponent();
      fireEvent.press(screen.getByText("Press me"));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it("should call onPress each time it is pressed", () => {
      renderComponent();
      fireEvent.press(screen.getByText("Press me"));
      fireEvent.press(screen.getByText("Press me"));
      expect(mockOnPress).toHaveBeenCalledTimes(2);
    });
  });
});
