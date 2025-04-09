import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { RelativePathString, router } from "expo-router";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>
          <Text style={styles.title}>CometClaim</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => router.push("/Search" as RelativePathString)}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/80/ffffff/search--v1.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/notifications/communityNotifications" as RelativePathString)}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/90/ffffff/appointment-reminders--v1.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/messages" as RelativePathString)}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>1</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/80/ffffff/speech-bubble-with-dots--v1.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    //  Space between helps the items spaced out
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
  },
  iconContainer: {
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    // backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 120,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "center",
  },
  unreadBadge: {
    backgroundColor: "#63F636",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: 600,
  },
});
