import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SymbolView } from "expo-symbols";

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
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => tabIcon(color),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => tabIcon(color),
        }}
      />
    </Tab.Navigator>
  );
}
