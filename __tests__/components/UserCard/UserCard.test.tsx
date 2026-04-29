import { render, screen } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { UserCardProps } from "@/types/props";

import UserCard from "@/components/UserCard/UserCard";

const defaultCompany = { name: "Acme Corp", catchPhrase: "Making things", bs: "synergize" };

const renderComponent = (props: Partial<UserCardProps> = {}): RenderAPI => {
  const defaultProps: UserCardProps = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "555-1234",
    website: "johndoe.com",
    company: defaultCompany,
    ...props,
  };
  return render(<UserCard {...defaultProps} />);
};

describe("UserCard", () => {
  describe("rendering", () => {
    it("should render the user name", () => {
      renderComponent();
      expect(screen.getByText("John Doe")).toBeTruthy();
    });

    it("should render the username with @ prefix", () => {
      renderComponent();
      expect(screen.getByText("@johndoe")).toBeTruthy();
    });

    it("should render the email", () => {
      renderComponent();
      expect(screen.getByText("john@example.com")).toBeTruthy();
    });

    it("should render the phone number", () => {
      renderComponent();
      expect(screen.getByText("555-1234")).toBeTruthy();
    });

    it("should render the website", () => {
      renderComponent();
      expect(screen.getByText("johndoe.com")).toBeTruthy();
    });

    it("should render the company name", () => {
      renderComponent();
      expect(screen.getByText("Acme Corp")).toBeTruthy();
    });

    it("should render with custom name and username", () => {
      renderComponent({ name: "Jane Smith", username: "janesmith" });
      expect(screen.getByText("Jane Smith")).toBeTruthy();
      expect(screen.getByText("@janesmith")).toBeTruthy();
    });

    it("should render with a custom company name", () => {
      renderComponent({
        company: { name: "Beta Inc", catchPhrase: "Doing stuff", bs: "leverage" },
      });
      expect(screen.getByText("Beta Inc")).toBeTruthy();
    });
  });
});
