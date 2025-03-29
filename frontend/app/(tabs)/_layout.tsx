import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRoute } from "@react-navigation/native";
import LoginScreen from "@/app/loginScreen";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  const route = useRoute();

  const colorScheme = useColorScheme();

  const hideTabBarScreens = ["loginScreen"]; // Screens to hide navbar on

  const isTabBarHidden = hideTabBarScreens.includes(route.name);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: isTabBarHidden
          ? { display: "none" }
          : Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddItemScreen"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="pluscircleo" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
