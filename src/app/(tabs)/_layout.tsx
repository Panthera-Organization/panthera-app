import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomeTab"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "chevron.left.forwardslash.chevron.right",
                android: "code",
                web: "code",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "chevron.left.forwardslash.chevron.right",
                android: "code",
                web: "code",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
