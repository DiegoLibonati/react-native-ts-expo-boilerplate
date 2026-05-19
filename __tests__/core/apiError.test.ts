import ApiError from "@/core/ApiError";

describe("ApiError", () => {
  describe("construction", () => {
    it("should be an instance of Error", () => {
      const error = new ApiError(500, "https://api.example.com/users");

      expect(error).toBeInstanceOf(Error);
    });

    it("should be an instance of ApiError", () => {
      const error = new ApiError(500, "https://api.example.com/users");

      expect(error).toBeInstanceOf(ApiError);
    });

    it("should set the name to ApiError", () => {
      const error = new ApiError(500, "https://api.example.com/users");

      expect(error.name).toBe("ApiError");
    });

    it("should expose the provided status", () => {
      const error = new ApiError(404, "https://api.example.com/users/1");

      expect(error.status).toBe(404);
    });

    it("should expose the provided url", () => {
      const error = new ApiError(500, "https://api.example.com/users");

      expect(error.url).toBe("https://api.example.com/users");
    });
  });

  describe("message", () => {
    it("should generate a default message using the status when none is provided", () => {
      const error = new ApiError(500, "https://api.example.com/users");

      expect(error.message).toBe("HTTP error! status: 500");
    });

    it("should generate a default message reflecting a 404 status", () => {
      const error = new ApiError(404, "https://api.example.com/users/1");

      expect(error.message).toBe("HTTP error! status: 404");
    });

    it("should use the provided custom message when given", () => {
      const error = new ApiError(500, "https://api.example.com/users", "Custom failure");

      expect(error.message).toBe("Custom failure");
    });
  });

  describe("throwing", () => {
    it("should be throwable and catchable as ApiError", () => {
      const throwable = (): never => {
        throw new ApiError(500, "https://api.example.com/users");
      };

      expect(throwable).toThrow(ApiError);
      expect(throwable).toThrow("HTTP error! status: 500");
    });
  });
});
