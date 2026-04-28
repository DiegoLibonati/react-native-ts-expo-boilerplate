import { getLocalStorage } from "@/helpers/getLocalStorage";

const mockGetItem = jest.fn();

beforeAll(() => {
  Object.defineProperty(global, "localStorage", {
    value: { getItem: mockGetItem },
    configurable: true,
    writable: true,
  });
});

describe("getLocalStorage", () => {
  describe("when the item does not exist", () => {
    it("should return null", () => {
      mockGetItem.mockReturnValue(null);
      const result = getLocalStorage("nonexistent-key");
      expect(result).toBeNull();
    });

    it("should call localStorage.getItem with the given key", () => {
      mockGetItem.mockReturnValue(null);
      getLocalStorage("my-key");
      expect(mockGetItem).toHaveBeenCalledWith("my-key");
    });
  });

  describe("when the item exists", () => {
    it("should return the parsed JSON value for a string", () => {
      mockGetItem.mockReturnValue(JSON.stringify("stored-string"));
      const result = getLocalStorage("string-key");
      expect(result).toBe("stored-string");
    });

    it("should return the parsed JSON value for an object", () => {
      const storedObject = { name: "Alice", age: 30 };
      mockGetItem.mockReturnValue(JSON.stringify(storedObject));
      const result = getLocalStorage("object-key");
      expect(result).toEqual(storedObject);
    });

    it("should return the parsed JSON value for an array", () => {
      const storedArray = [1, 2, 3];
      mockGetItem.mockReturnValue(JSON.stringify(storedArray));
      const result = getLocalStorage("array-key");
      expect(result).toEqual(storedArray);
    });

    it("should return the parsed JSON value for a number", () => {
      mockGetItem.mockReturnValue(JSON.stringify(42));
      const result = getLocalStorage("number-key");
      expect(result).toBe(42);
    });

    it("should return the parsed JSON value for a boolean", () => {
      mockGetItem.mockReturnValue(JSON.stringify(true));
      const result = getLocalStorage("bool-key");
      expect(result).toBe(true);
    });
  });
});
