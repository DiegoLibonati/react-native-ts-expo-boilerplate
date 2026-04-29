import { Redirect } from "expo-router";

import type { JSX } from "react";

import NotFoundScreen from "@/screens/NotFoundScreen/NotFoundScreen";

import envs from "@/constants/envs";

export default function NotFoundRoute(): JSX.Element {
  if (envs.redirectIfRouteNotExists) {
    return <Redirect href="/" />;
  }

  return <NotFoundScreen />;
}
