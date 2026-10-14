import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import HomeScreen from "@/screens/home";
import ProfileScreen from "@/screens/profile";

import type { MainTabParamList } from "./types";

const WebTab = createBottomTabNavigator<MainTabParamList>();
const NativeTab =
  Platform.OS === "web"
    ? null
    : createNativeBottomTabNavigator<MainTabParamList>();

const webTabIcon = (color: string) => (
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
  if (Platform.OS === "web") {
    return <WebTabs />;
  }

  return <NativeTabs />;
}

function WebTabs() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <WebTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.icon.selected,
        tabBarInactiveTintColor: theme.colors.icon.default,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.primary,
        },
      }}
    >
      <WebTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color }) => webTabIcon(color),
        }}
      />
      <WebTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color }) => webTabIcon(color),
        }}
      />
    </WebTab.Navigator>
  );
}

function NativeTabs() {
  const { t } = useTranslation();
  const Tab = NativeTab;

  if (!Tab) {
    return null;
  }

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
