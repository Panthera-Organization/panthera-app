import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import SignedOutScreen from "@/screens/signed-out";

import type { UnauthenticatedStackParamList } from "./types";

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export default function UnauthenticatedStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignedOut"
        component={SignedOutScreen}
        options={{ title: t("screens.signedOut.title") }}
      />
    </Stack.Navigator>
  );
}
