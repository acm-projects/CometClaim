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
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="smiley.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="itemsList"
        options={{
          title: "Items",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tortoise.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shareScreen"
        options={{
          title: "Share",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="chevron.forward.circle.fill"
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell.fill" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="chatScreen"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bubble.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
