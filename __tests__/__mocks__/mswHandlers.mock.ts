import { http, HttpResponse } from "msw";

import { mockUsers } from "@tests/__mocks__/users.mock";

export const MOCK_API_BASE_URL = "https://test.api.com";

export const mockMswHandlers = [
  http.get(`${MOCK_API_BASE_URL}/users`, () => HttpResponse.json(mockUsers)),
  http.get(`${MOCK_API_BASE_URL}/users/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),
];
