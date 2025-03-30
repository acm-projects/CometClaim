import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const something = () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          shadowColor: "#A73B0D",
        }}
      >
        <LinearGradient
          colors={["#FC5E1A", "#FFE380"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.5 }}
          style={{
            margin: 200,
            height: 50,
            width: 50,
            borderRadius: 100,
          }}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-filled/48/ffffff/plus-math.png",
            }}
            style={{
              height: 25,
              width: 25,
              justifyContent: "center",
              alignContent: "center",
              margin: 12.5,
            }}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default something;

const styles = StyleSheet.create({});
