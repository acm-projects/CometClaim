import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { RelativePathString, router } from "expo-router";
const searchIcon = require("@/assets/images/search--v1.png");
//  uri: "https://img.icons8.com/ios-filled/90/FC5E1A/search--v1.png",
const notificationIcon = require("@/assets/images/appointment-reminders--v1.png");
//  uri: "https://img.icons8.com/fluency-systems-regular/100/FC5E1A/appointment-reminders--v1.png",
const messageIcon = require("@/assets/images/speech-bubble-with-dots--v1.png");
//  uri: "https://img.icons8.com/fluency-systems-regular/90/FC5E1A/speech-bubble-with-dots--v1.png",

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>
          <Text style={styles.title}>CometClaim</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <View style={styles.iconBorder}>
          <TouchableOpacity
            onPress={() => router.push("/Search" as RelativePathString)}
          >
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconBorder}>
          <TouchableOpacity
            onPress={() =>
              router.push(
                "/notifications/communityNotifications" as RelativePathString
              )
            }
          >
            <Image source={notificationIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconBorder}>
          <TouchableOpacity
            onPress={() => router.push("/messages" as RelativePathString)}
          >
            {/* <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>1</Text>
            </View> */}
            <Image source={messageIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
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
    marginTop: 10,
    paddingBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: -10,
  },
  title: {
    color: "#FC5E1A",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    // backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 120,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "center",
  },
  unreadBadge: {
    backgroundColor: "#FC5E1A",
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
  iconBorder: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
