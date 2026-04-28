import { render, screen, waitFor } from "@testing-library/react-native";
import { Text as MockText } from "react-native";

import type { ReactNode } from "react";
import type { RenderAPI } from "@testing-library/react-native";

import { UsersScreen } from "@/screens/UsersScreen/UsersScreen";

import { mockUsers } from "@tests/__mocks__/users.mock";

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

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: (): Promise<unknown> => Promise.resolve(data),
  });
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  });
};

const mockFetchPending = (): void => {
  global.fetch = jest.fn(
    (): Promise<Response> =>
      new Promise<Response>((_resolve): void => {
        return;
      })
  );
};

const renderScreen = (): RenderAPI => render(<UsersScreen />);

describe("UsersScreen", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      mockFetchPending();
      renderScreen();
      expect(screen.getByText("Users Page")).toBeTruthy();
    });

    it("should show the loading state while fetching", () => {
      mockFetchPending();
      renderScreen();
      expect(screen.getByText("Loading users...")).toBeTruthy();
    });

    it("should hide the loading state after a successful fetch", async () => {
      mockFetchSuccess(mockUsers);
      renderScreen();
      await screen.findByText("Alice Smith");
      expect(screen.queryByText("Loading users...")).toBeNull();
    });

    it("should render user cards after a successful fetch", async () => {
      mockFetchSuccess(mockUsers);
      renderScreen();
      expect(await screen.findByText("Alice Smith")).toBeTruthy();
      expect(screen.getByText("Bob Jones")).toBeTruthy();
    });

    it("should render the link to Home Page after a successful fetch", async () => {
      mockFetchSuccess(mockUsers);
      renderScreen();
      await screen.findByText("Alice Smith");
      expect(screen.getByText("Go to Home Page")).toBeTruthy();
    });
  });

  describe("error handling", () => {
    it("should show an error message when the fetch fails", async () => {
      mockFetchError(500);
      renderScreen();
      expect(await screen.findByText("Error loading users. Please try again.")).toBeTruthy();
    });

    it("should hide the loading state after a failed fetch", async () => {
      mockFetchError(500);
      renderScreen();
      await screen.findByText("Error loading users. Please try again.");
      expect(screen.queryByText("Loading users...")).toBeNull();
    });

    it("should not render user cards when the fetch fails", async () => {
      mockFetchError(500);
      renderScreen();
      await screen.findByText("Error loading users. Please try again.");
      expect(screen.queryByText("Alice Smith")).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should render the footer link when the user list is empty", async () => {
      mockFetchSuccess([]);
      renderScreen();
      await waitFor((): void => {
        expect(screen.queryByText("Loading users...")).toBeNull();
      });
      expect(screen.getByText("Go to Home Page")).toBeTruthy();
    });

    it("should not render user cards when the list is empty", async () => {
      mockFetchSuccess([]);
      renderScreen();
      await waitFor((): void => {
        expect(screen.queryByText("Loading users...")).toBeNull();
      });
      expect(screen.queryByText("Alice Smith")).toBeNull();
    });
  });
});
