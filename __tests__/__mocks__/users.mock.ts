import type { User } from "@/types/app";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Smith",
    username: "asmith",
    email: "alice@example.com",
    phone: "555-0001",
    website: "alice.com",
    company: { name: "Alice Corp", catchPhrase: "Making things", bs: "synergize" },
  },
  {
    id: 2,
    name: "Bob Jones",
    username: "bjones",
    email: "bob@example.com",
    phone: "555-0002",
    website: "bob.com",
    company: { name: "Bob Inc", catchPhrase: "Doing stuff", bs: "leverage" },
  },
];

export const mockUser = mockUsers[0];
