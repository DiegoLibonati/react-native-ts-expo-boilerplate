import { render, screen } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";

import NotFoundScreen from "@/screens/NotFoundScreen/NotFoundScreen";

const renderScreen = (): RenderAPI => render(<NotFoundScreen />);

describe("NotFoundScreen", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderScreen();
      expect(screen.getByText("Page Not Found")).toBeTruthy();
    });

    it("should render the description message", () => {
      renderScreen();
      expect(
        screen.getByText("The page you're looking for doesn't exist or has been moved.")
      ).toBeTruthy();
    });
  });
});
