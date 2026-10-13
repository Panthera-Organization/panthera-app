import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";
import { useUnistyles } from "react-native-unistyles";

import HomeScreen from "@/screens/home";
import ProfileScreen from "@/screens/profile";

import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcon = (color: string) => (
  <SymbolView
    name={{
      ios: "chevron.left.forwardslash.chevron.right",
      android: "code",
      web: "code",
    }}
    tintColor={color}
    size={28}
  />
);

export default function MainTabs() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.icon.selected,
        tabBarInactiveTintColor: theme.colors.icon.default,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color }) => tabIcon(color),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color }) => tabIcon(color),
        }}
      />
    </Tab.Navigator>
  );
}
