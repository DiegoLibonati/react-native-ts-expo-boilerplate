import "@testing-library/react-native/extend-expect";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

beforeAll((): void => {
  mockMswServer.listen({ onUnhandledRequest: "error" });
});

afterEach((): void => {
  mockMswServer.resetHandlers();
});

afterAll((): void => {
  mockMswServer.close();
});
