// import { Tabs } from "expo-router";
// import React, { useEffect } from "react";
// import { Platform, StyleSheet, View, Image, Pressable } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { useRoute } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   withSequence,
// } from "react-native-reanimated";

// // const Tab = createBottomTabNavigator();

// const BOUNCE_DURATION = 150;
// interface TabBarIconProps {
//   focused: boolean;
//   color: string;
//   size: number;
//   onPress?: () => void;
// }

// export default function TabLayout() {
//   const route = useRoute();
//   const colorScheme = useColorScheme();
//   const scale = useSharedValue(1);

//   const hideTabBarScreens = ["loginScreen"]; // Screens to hide navbar on
//   const isTabBarHidden = hideTabBarScreens.includes(route.name);

//   const handlePress = (onPress?: () => void) => {
//     scale.value = withSequence(
//       withTiming(1.1, { duration: BOUNCE_DURATION }),
//       withTiming(1, { duration: BOUNCE_DURATION }),
//       withTiming(1, { duration: BOUNCE_DURATION }, () => {
//         if (onPress) {
//           requestAnimationFrame(onPress);
//         }
//       })
//     );
//   };

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: () => <View style={{ backgroundColor: "white" }} />,
//         tabBarStyle: isTabBarHidden
//           ? { display: "none" }
//           : Platform.select({
//               ios: {
//                 position: "absolute",
//                 left: 20,
//                 right: 20,
//                 backgroundColor: "#fff",
//                 ...styles.shadow,
//               },
//               default: {},
//             }),
//       }}
//     >
//       <Tabs.Screen
//         name="HomeScreen"
//         options={{
//           title: "",
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={{
//                 uri: focused
//                   ? "https://img.icons8.com/fluency-systems-filled/48/home.png"
//                   : "https://img.icons8.com/fluency-systems-regular/100/home--v1.png",
//               }}
//               resizeMode="contain"
//               style={{
//                 marginLeft: 30,
//                 width: 40,
//                 height: 40,
//                 tintColor: focused ? "#FC5E1A" : "#000", // 👈 change color when selected
//                 marginTop: 10,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="AddItemScreen"
//         options={{
//           title: "",
//           tabBarIcon: ({ focused, onPress }: TabBarIconProps) => (
//             <Animated.View
//               style={[
//                 {
//                   borderRadius: 100,
//                   shadowOffset: {
//                     width: 0,
//                     height: 4,
//                   },
//                   shadowOpacity: 0.5,
//                   shadowRadius: 2,
//                   shadowColor: "#A73B0D",
//                 },
//                 animatedStyle,
//               ]}
//             >
//               <Pressable onPress={() => handlePress(onPress)}>
//                 <LinearGradient
//                   colors={["#FC5E1A", "#FFE380"]}
//                   locations={[0, 1]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1.1 }}
//                   style={{
//                     borderRadius: 100,
//                   }}
//                 >
//                   <Image
//                     source={{
//                       uri: "https://img.icons8.com/fluency-systems-filled/48/ffffff/plus-math.png",
//                     }}
//                     style={{
//                       height: 22,
//                       width: 22,
//                       justifyContent: "center",
//                       alignContent: "center",
//                       margin: 12.5,
//                     }}
//                   />
//                 </LinearGradient>
//               </Pressable>
//             </Animated.View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="ProfilePage"
//         options={{
//           title: "",
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={{
//                 uri: focused
//                   ? "https://img.icons8.com/fluency-systems-filled/48/user-male-circle.png"
//                   : "https://img.icons8.com/fluency-systems-regular/100/user-male-circle--v1.png",
//               }}
//               resizeMode="contain"
//               style={{
//                 marginRight: 30,
//                 width: 41,
//                 height: 41,
//                 tintColor: focused ? "#FC5E1A" : "#000", // 👈 change color when selected
//                 marginTop: 10,
//               }}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "#FC5E1A",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });

import { Tabs, useRouter } from "expo-router";
import { Platform, Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRoute } from "@react-navigation/native";
import AddItemScreen from "./AddItemScreen";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  onPress?: () => void;
}

const BOUNCE_DURATION = 200;

export default function TabLayout() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  // Create the shared value at the component level
  const scale = useSharedValue(1);

  // Create the animated style at the component level
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? "https://img.icons8.com/fluency-systems-filled/48/home.png"
                  : "https://img.icons8.com/fluency-systems-regular/100/home--v1.png",
              }}
              resizeMode="contain"
              style={{
                marginLeft: 30,
                width: 39,
                height: 39,
                tintColor: focused ? "#FC5E1A" : "#000",
                marginTop: 10,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddItemScreen"
        options={{
          title: "",
          tabBarIcon: ({ onPress }: TabBarIconProps) => {
            const handleTabPress = () => {
              scale.value = withSequence(
                withTiming(1.2, { duration: BOUNCE_DURATION }),
                withTiming(0.9, { duration: BOUNCE_DURATION }),
                withTiming(1, { duration: BOUNCE_DURATION }, () => {
                  if (onPress) {
                    onPress();
                  }
                })
              );
              router.push("/(tabs)/AddItemScreen");
            };
            return (
              <Animated.View
                style={[
                  {
                    borderRadius: 100,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    shadowColor: "#A73B0D",
                  },
                  animatedStyle,
                ]}
              >
                <Pressable onPress={handleTabPress}>
                  <LinearGradient
                    colors={["#FC5E1A", "#FFE380"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1.1 }}
                    style={{
                      borderRadius: 100,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.icons8.com/fluency-systems-filled/48/ffffff/plus-math.png",
                      }}
                      style={{
                        height: 24,
                        width: 24,
                        justifyContent: "center",
                        alignContent: "center",
                        margin: 12.5,
                      }}
                    />
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: focused
                  ? "https://img.icons8.com/fluency-systems-filled/48/user-male-circle.png"
                  : "https://img.icons8.com/fluency-systems-regular/100/user-male-circle--v1.png",
              }}
              resizeMode="contain"
              style={{
                marginRight: 30,
                width: 41,
                height: 41,
                tintColor: focused ? "#FC5E1A" : "#000",
                marginTop: 10,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#FC5E1A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
