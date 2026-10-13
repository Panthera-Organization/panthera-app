import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateAccountScreen from "@/screens/create-account";
import SignInScreen from "@/screens/sign-in";

import type { UnauthenticatedStackParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: "Create account" }}
      />
    </Stack.Navigator>
  );
}
