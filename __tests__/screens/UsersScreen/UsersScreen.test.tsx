import { render, screen, waitFor } from "@testing-library/react-native";
import { Text as MockText } from "react-native";
import { http, HttpResponse } from "msw";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import UsersScreen from "@/screens/UsersScreen/UsersScreen";

import { MOCK_API_BASE_URL } from "@tests/__mocks__/mswHandlers.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

interface LinkMockProps {
  children: ReactNode;
  href: unknown;
  style?: unknown;
  accessibilityLabel?: string;
  testID?: string;
}

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    redirectIfRouteNotExists: false,
    templateApiUrl: "https://test.api.com",
  },
}));

jest.mock("expo-router", (): { Link: (props: LinkMockProps) => ReactNode } => ({
  Link: ({ children }: LinkMockProps): ReactNode => <MockText>{children}</MockText>,
}));

const renderScreen = (): RenderAPI => render(<UsersScreen />);

describe("UsersScreen", () => {
  describe("rendering", () => {
    it("should render the page title", async () => {
      renderScreen();

      expect(screen.getByText("Users Page")).toBeTruthy();
      await screen.findByText("Alice Smith");
    });

    it("should show the loading state while fetching", () => {
      mockMswServer.use(
        http.get(`${MOCK_API_BASE_URL}/users`, () => new Promise<never>(() => undefined))
      );

      renderScreen();

      expect(screen.getByText("Loading users...")).toBeTruthy();
    });

    it("should hide the loading state after a successful fetch", async () => {
      renderScreen();

      await screen.findByText("Alice Smith");

      expect(screen.queryByText("Loading users...")).toBeNull();
    });

    it("should render user cards after a successful fetch", async () => {
      renderScreen();

      expect(await screen.findByText("Alice Smith")).toBeTruthy();
      expect(screen.getByText("Bob Jones")).toBeTruthy();
    });

    it("should render the link to Home Page after a successful fetch", async () => {
      renderScreen();

      await screen.findByText("Alice Smith");

      expect(screen.getByText("Go to Home Page")).toBeTruthy();
    });
  });

  describe("error handling", () => {
    it("should show an error message when the fetch fails", async () => {
      mockMswServer.use(
        http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 500 }))
      );

      renderScreen();

      expect(
        await screen.findByText("Error loading users (status 500). Please try again.")
      ).toBeTruthy();
    });

    it("should hide the loading state after a failed fetch", async () => {
      mockMswServer.use(
        http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 500 }))
      );

      renderScreen();

      await screen.findByText("Error loading users (status 500). Please try again.");

      expect(screen.queryByText("Loading users...")).toBeNull();
    });

    it("should not render user cards when the fetch fails", async () => {
      mockMswServer.use(
        http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 500 }))
      );

      renderScreen();

      await screen.findByText("Error loading users (status 500). Please try again.");

      expect(screen.queryByText("Alice Smith")).toBeNull();
    });

    it("should show a generic error message when a network error occurs", async () => {
      mockMswServer.use(http.get(`${MOCK_API_BASE_URL}/users`, () => HttpResponse.error()));

      renderScreen();

      expect(await screen.findByText("Error loading users. Please try again.")).toBeTruthy();
    });
  });

  describe("edge cases", () => {
    it("should render the footer link when the user list is empty", async () => {
      mockMswServer.use(http.get(`${MOCK_API_BASE_URL}/users`, () => HttpResponse.json([])));

      renderScreen();

      await waitFor((): void => {
        expect(screen.queryByText("Loading users...")).toBeNull();
      });

      expect(screen.getByText("Go to Home Page")).toBeTruthy();
    });

    it("should not render user cards when the list is empty", async () => {
      mockMswServer.use(http.get(`${MOCK_API_BASE_URL}/users`, () => HttpResponse.json([])));

      renderScreen();

      await waitFor((): void => {
        expect(screen.queryByText("Loading users...")).toBeNull();
      });

      expect(screen.queryByText("Alice Smith")).toBeNull();
    });
  });
});
