import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
// import { Divider } from "react-native-elements";
// import { useState } from "react";
import { router } from "expo-router";

const YourPostHeader: React.FC = () => {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#FFDCB5", "#FC5E1A"]}
      start={{ x: 0.5, y: 1.5 }}
      end={{ x: 0.5, y: 0 }}
    >
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0 }}
          onPress={() => router.back()}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/60/ffffff/back.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Your Post
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default YourPostHeader;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // flexGrow: 1,
    // alignContent: "center",
    // justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "center",
  },
  headerContainer: {
    marginTop: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 40,
  },
});
