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
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FilterAccordion from "@/components/ui/FilterAccordion";
import { Entypo } from "@expo/vector-icons";

const locationOptions = [
  { id: "ecsn", label: "ECSN" },
  { id: "ecss", label: "ECSS" },
  { id: "ecsw", label: "ECSW" },
  { id: "atc", label: "ATC" },
  { id: "science", label: "Science" },
  { id: "bsb", label: "BSB" },
  { id: "su", label: "SU" },
  { id: "slc", label: "SLC" },
  { id: "library", label: "Library" },
  { id: "ac", label: "AC" },
];

const keywordOptions = [
  { id: "airpods", label: "AirPods" },
  { id: "water_bottle", label: "Water bottle" },
  { id: "laptop", label: "Laptop" },
  { id: "phone", label: "Phone" },
  { id: "keys", label: "Keys" },
  { id: "purse", label: "Purse" },
  { id: "wallet", label: "Wallet" },
  { id: "headphones", label: "Headphones" },
  { id: "umbrella", label: "Umbrella" },
  { id: "charger", label: "Charger" },
];

const colorOptions = [
  { id: "orange", label: "Orange" },
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "blue", label: "Blue" },
  { id: "red", label: "Red" },
  { id: "green", label: "Green" },
  { id: "yellow", label: "Yellow" },
  { id: "purple", label: "Purple" },
  { id: "pink", label: "Pink" },
  { id: "brown", label: "Brown" },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "ecsn",
    "ecss",
    "ecsw",
  ]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([
    "airpods",
    "keys",
  ]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["orange"]);

  const toggleLocationOption = (optionId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const toggleKeywordOption = (optionId: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const toggleColorOption = (optionId: string) => {
    setSelectedColors((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  const [messageInput, setMessageInput] = useState<string>("");
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#FFDCB5", "#FC5E1A"]}
        start={{ x: 0.5, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
        style={{ paddingTop: 20 }}
      >
        <View style={styles.inputContainer}>
          <Pressable
            style={{ marginLeft: "0.5%" }}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={32} color="white" />
          </Pressable>
          <TextInput
            style={styles.input}
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Search"
            placeholderTextColor="#DD8843"
            inlineImageLeft="search_icon"
          />
        </View>
      </LinearGradient>
      <View style={styles.searchWords}>
        <ScrollView style={{}}>
          <FilterAccordion
            title="Location"
            options={locationOptions}
            selectedOptions={selectedLocations}
            onToggleOption={toggleLocationOption}
          />
          <FilterAccordion
            title="Keywords"
            options={keywordOptions}
            selectedOptions={selectedKeywords}
            onToggleOption={toggleKeywordOption}
          />
          <FilterAccordion
            title="Color"
            options={colorOptions}
            selectedOptions={selectedColors}
            onToggleOption={toggleColorOption}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    flex: 1,
    backgroundColor: "#FFDCB5", // Background color
  },
  icon: {
    // flex: 1,
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginLeft: 10,
  },
  searchWords: {
    flex: 1,
    backgroundColor: "white",
    // marginTop: // Creates an overlapping effect
    // paddingTop: 10,
    elevation: 5,
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
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#FFDAA3",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFDAA3",
    marginRight: 10,
    fontSize: 15,
    color: "#333",
    marginLeft: 25,
    fontWeight: 500,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
});
