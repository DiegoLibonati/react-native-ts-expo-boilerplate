import { getInitials } from "@/helpers/getInitials";

describe("getInitials", () => {
  describe("when the input is empty or whitespace", () => {
    it("returns an empty string for an empty string", () => {
      expect(getInitials("")).toBe("");
    });

    it("returns an empty string for whitespace only", () => {
      expect(getInitials("   ")).toBe("");
    });
  });

  describe("when the input is a single word", () => {
    it("returns the uppercased first letter", () => {
      expect(getInitials("alice")).toBe("A");
    });

    it("trims surrounding whitespace", () => {
      expect(getInitials("  bob  ")).toBe("B");
    });
  });

  describe("when the input has multiple words", () => {
    it("returns the first letter of the first two words by default", () => {
      expect(getInitials("Ada Lovelace")).toBe("AL");
    });

    it("collapses multiple spaces between words", () => {
      expect(getInitials("Ada     Lovelace")).toBe("AL");
    });

    it("respects the maxLength parameter", () => {
      expect(getInitials("John Ronald Reuel Tolkien", 3)).toBe("JRR");
      expect(getInitials("John Ronald Reuel Tolkien", 4)).toBe("JRRT");
    });

    it("returns all initials when maxLength exceeds word count", () => {
      expect(getInitials("Ada Lovelace", 5)).toBe("AL");
    });
  });
});
