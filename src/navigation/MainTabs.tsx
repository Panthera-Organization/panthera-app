import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { useTranslation } from "react-i18next";

import HomeScreen from "@/screens/home";
import ProfileScreen from "@/screens/profile";

import type { MainTabParamList } from "./types";

const Tab = createNativeBottomTabNavigator<MainTabParamList>();

/* eslint-disable i18next/no-literal-string -- Icon identifiers, not user-facing copy. */
const homeTabIcon = {
  type: "sfSymbol",
  name: "house",
} as const;

const profileTabIcon = {
  type: "sfSymbol",
  name: "person",
} as const;
/* eslint-enable i18next/no-literal-string */

export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("tabs.home"),
          tabBarIcon: homeTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("tabs.profile"),
          tabBarIcon: profileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
