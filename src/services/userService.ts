import type { User } from "@/types/app";

import envs from "@/constants/envs";

const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${envs.templateApiUrl}/users`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const users: User[] = (await response.json()) as User[];

    return users;
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${envs.templateApiUrl}/users/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const user: User = (await response.json()) as User;

    return user;
  },
};

export default userService;
