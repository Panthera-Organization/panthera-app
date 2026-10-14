import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import CreateAccountScreen from "@/screens/create-account";
import SignInScreen from "@/screens/sign-in";

import type { UnauthenticatedStackParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export default function UnauthenticatedStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: t("screens.signIn.title") }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: t("screens.createAccount.title") }}
      />
    </Stack.Navigator>
  );
}
