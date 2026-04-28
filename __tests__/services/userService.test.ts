import userService from "@/services/userService";

import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    redirectIfRouteNotExists: false,
    templateApiUrl: "https://test.api.com",
  },
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

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("userService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return an array of users", async () => {
        mockFetchSuccess(mockUsers);
        const result = await userService.getAll();
        expect(result).toEqual(mockUsers);
      });

      it("should call fetch with the correct endpoint", async () => {
        mockFetchSuccess(mockUsers);
        await userService.getAll();
        expect(global.fetch).toHaveBeenCalledWith("https://test.api.com/users");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(500);
        await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with 404 status", async () => {
        mockFetchError(404);
        await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError("Failed to fetch");
        await expect(userService.getAll()).rejects.toThrow("Failed to fetch");
      });
    });
  });

  describe("getById", () => {
    describe("when fetch succeeds", () => {
      it("should return the user with the given id", async () => {
        mockFetchSuccess(mockUser);
        const result = await userService.getById(1);
        expect(result).toEqual(mockUser);
      });

      it("should call fetch with the correct endpoint including the id", async () => {
        mockFetchSuccess(mockUser);
        await userService.getById(42);
        expect(global.fetch).toHaveBeenCalledWith("https://test.api.com/users/42");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(404);
        await expect(userService.getById(999)).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with 500 status", async () => {
        mockFetchError(500);
        await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError();
        await expect(userService.getById(1)).rejects.toThrow("Network error");
      });
    });
  });
});
