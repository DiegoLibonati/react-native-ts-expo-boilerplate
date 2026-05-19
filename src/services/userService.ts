import type { User } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

import envs from "@/constants/envs";

import ApiError from "@/core/ApiError";

const userService = {
  getAll: async (): Promise<ResponseDirect<User[]>> => {
    const url = `${envs.templateApiUrl}/users`;
    const response = await fetch(url);

    if (!response.ok) throw new ApiError(response.status, url);

    return (await response.json()) as ResponseDirect<User[]>;
  },

  getById: async (id: number): Promise<ResponseDirect<User>> => {
    const url = `${envs.templateApiUrl}/users/${id}`;
    const response = await fetch(url);

    if (!response.ok) throw new ApiError(response.status, url);

    return (await response.json()) as ResponseDirect<User>;
  },
};

export default userService;
