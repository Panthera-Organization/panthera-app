import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabs from "./MainTabs";
import type { AuthorizedStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthorizedStackParamList>();

export default function AuthorizedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
