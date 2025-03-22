import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={["#FFC480", "#FC5E1A"]}
        start={{ x: 0.5, y: 0.8 }}
        end={{ x: 0.5, y: 0 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.viewContainer}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingRight: 10 }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-filled/70/ffffff/back.png",
                }}
                style={styles.icon}
              />
            </TouchableOpacity>
            <SearchHeader />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.searchWords}>
        <ScrollView style={{ flexGrow: 1 }}>
          <Text>Location</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const SearchHeader: React.FC = () => (
  //flex: 1 makes sure the bar takes the remaining space
  <SafeAreaView style={{ flex: 1 }}>
    <TextInput
      placeholder="Search"
      clearButtonMode="always"
      placeholderTextColor="#121212"
      style={styles.searchBox}
      autoCorrect={false}
      // value={searchQuery}
      // onChangeText={(query) => handleSearch(query)}
    />
  </SafeAreaView>
);

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: Platform.OS === "ios" ? 0 : 10,
    justifyContent: "center",
  },
  searchBox: {
    paddingHorizontal: 20,
    height: 45,
    paddingVertical: 10,
    borderColor: "#FFDCB5",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 300,
    borderRadius: 15,
    flexGrow: 1,
    backgroundColor: "#FFDCB5", // Background color
    // color: "#000000", // Text color
  },
  icon: {
    // flex: 1,
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginRight: 20,
  },
  searchWords: {
    flex: 6,
    backgroundColor: "white",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    marginTop: -20, // Creates an overlapping effect
    paddingTop: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    elevation: 5,
  },
});
