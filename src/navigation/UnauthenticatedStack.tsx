import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignedOutScreen from "@/screens/signed-out";

import type { UnauthenticatedStackParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignedOut"
        component={SignedOutScreen}
        options={{ title: "Signed out" }}
      />
    </Stack.Navigator>
  );
}
