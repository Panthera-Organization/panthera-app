import type { NavigatorScreenParams } from "@react-navigation/native";

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type UnauthenticatedStackParamList = {
  SignedOut: undefined;
};

export type AuthorizedStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList> | undefined;
};
