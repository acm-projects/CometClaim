import { Tabs } from "expo-router";
import { Platform, Text, View, SafeAreaView } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function NotificationsLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ height: "8.6%" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Add back button */}
          <TouchableOpacity
            style={{ position: "absolute", left: 15 }}
            onPress={() => router.back()}
          >
            <Text style={{ fontSize: 16, color: "#FC5E1A" }}>Back</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Notifications
          </Text>
        </View>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarItemStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingTop: 0,
            marginTop: 0,
          },
          headerTitleContainerStyle: {
            height: 0,
          },
          tabBarButton: HapticTab,
          tabBarBackground: () => {
            return (
              <LinearGradient
                colors={["#EE831E", "#FC5E1A"]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.tabBarHeight}></View>
              </LinearGradient>
            );
          },
          tabBarPosition: "top",
          tabBarStyle: Platform.select({
            ios: {
              paddingTop: 0,
              justifyContent: "center",
              alignItems: "center",
              ...styles.tabBarHeight,
            },
            default: {},
          }),
          tabBarLabelStyle: {
            color: "white",
            fontSize: 15,
            textAlign: "center",
            marginVertical: "auto",
          },
          tabBarIcon: () => null,
          tabBarIconStyle: {
            height: 0,
          },
        }}
      >
        <Tabs.Screen
          name="communityNotifications"
          options={{
            title: "Community",
            tabBarLabel: ({ focused }) => (
              <View style={[styles.tabContainer, focused && styles.activeTab]}>
                <Text style={styles.tabText}>Community</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="forYouNotifications"
          options={{
            title: "For You",
            tabBarLabel: ({ focused }) => (
              <View style={[styles.tabContainer, focused && styles.activeTab]}>
                <Text style={styles.tabText}>For You</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="indexNoti"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarHeight: {
    height: 40,
  },
  tabContainer: {
    color: "white",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderColor: "white",
    borderBottomWidth: 2,
  },
  tabText: {
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    width: 120,
    textAlign: "center",
    marginVertical: 5,
  },
});
