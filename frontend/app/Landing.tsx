/*
  TODO: This is in main branch (figure out about the HBranch2 stuff)
  TODO: Is the gradient right? I just put it directly in based on Figma, but it appears darker
  TODO: Also I moved the .png because I was confused abt the pathing -> need to put it back
  TODO: Need to add the demo question :)
        Something about airpods

*/

import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const LoadingScreen: React.FC = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  //Spinning logo animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    //Orange gradient background - update to use correct const?
    <LinearGradient
      colors={["#FFC480", "#FC801A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Animated.Image
        source={require("../assets/images/CometClaim-Logo.png")} //Is this in the right path?? I ended up just adding it to the same folder lol
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
});

export default LoadingScreen;
