import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-start" }}
        onPress={() => router.back()}
      >
        <Text>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          margin: 10,
          justifyContent: "center",
        }}
      >
        Edit Profile
      </Text>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-end" }}
        onPress={() => router.push("/ProfilePage")}
      >
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    //  Space between helps the items spaced out
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3671E6",
    textAlign: "left",
    paddingLeft: 20,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FC5E1A",
    textAlign: "right",
    paddingRight: 5,
  },
});
