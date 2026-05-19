import { http, HttpResponse } from "msw";

import userService from "@/services/userService";

import ApiError from "@/core/ApiError";

import { MOCK_API_BASE_URL } from "@tests/__mocks__/mswHandlers.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    redirectIfRouteNotExists: false,
    templateApiUrl: "https://test.api.com",
  },
}));

describe("userService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return an array of users", async () => {
        const result = await userService.getAll();

        expect(result).toEqual(mockUsers);
      });
    });

    describe("when the server returns an error", () => {
      it("should throw ApiError with status 500", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 500 }))
        );

        await expect(userService.getAll()).rejects.toThrow(ApiError);
        await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw ApiError with status 404", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 404 }))
        );

        await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });

      it("should include the requested url on the thrown ApiError", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users`, () => new HttpResponse(null, { status: 500 }))
        );

        await expect(userService.getAll()).rejects.toMatchObject({
          status: 500,
          url: `${MOCK_API_BASE_URL}/users`,
        });
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(http.get(`${MOCK_API_BASE_URL}/users`, () => HttpResponse.error()));

        await expect(userService.getAll()).rejects.toThrow();
      });
    });
  });

  describe("getById", () => {
    describe("when fetch succeeds", () => {
      it("should return the user with the given id", async () => {
        const result = await userService.getById(1);

        expect(result).toEqual(mockUser);
      });

      it("should request the endpoint that includes the id", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users/:id`, ({ params }) =>
            HttpResponse.json({ requested: params.id })
          )
        );

        const result = (await userService.getById(42)) as unknown as { requested: string };

        expect(result.requested).toBe("42");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw ApiError with status 404", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users/:id`, () => new HttpResponse(null, { status: 404 }))
        );

        await expect(userService.getById(999)).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw ApiError with status 500", async () => {
        mockMswServer.use(
          http.get(`${MOCK_API_BASE_URL}/users/:id`, () => new HttpResponse(null, { status: 500 }))
        );

        await expect(userService.getById(1)).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(http.get(`${MOCK_API_BASE_URL}/users/:id`, () => HttpResponse.error()));

        await expect(userService.getById(1)).rejects.toThrow();
      });
    });
  });
});
