import type { Envs } from "@/types/envs";

const envs: Envs = {
  redirectIfRouteNotExists: process.env.EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS === "true",
  templateApiUrl: process.env.EXPO_PUBLIC_TEMPLATE_API_URL ?? "",
};

export default envs;
