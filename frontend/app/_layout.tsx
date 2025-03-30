import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="commentsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Search" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="ShareScreen" options={{ headerShown: false }} />
        <Stack.Screen name="YourPost" options={{ headerShown: false }} />
        <Stack.Screen name="messages/index" options={{ headerShown: false }} />
        <Stack.Screen name="messages/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" options={{ headerShown: false }} />
        <Stack.Screen name="seePost" options={{ headerShown: false }} />

        {/* <Stack.Screen name="CommentScreen" options={{ headerShown: false }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
