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
} from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FilterAccordion from "@/components/ui/FilterAccordion";
import { X } from "react-native-feather";

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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        style={styles.container}
        colors={["#FFC480", "#FC5E1A"]}
        start={{ x: 0.5, y: 0.8 }}
        end={{ x: 0.5, y: 0 }}
      >
        <SafeAreaView>
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

const SearchHeader: React.FC = () => (
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
  // <View style={styles.searchInputContainer}>
  //   <Search width={20} height={20} color="#666" style={styles.searchIcon} />
  //   <TextInput
  //     style={styles.searchInput}
  //     placeholder="Search"
  //     value={searchQuery}
  //     onChangeText={setSearchQuery}
  //     placeholderTextColor="#666"
  //   />
  //   {searchQuery.length > 0 && (
  //     <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
  //       <X width={20} height={20} color="#666" />
  //     </TouchableOpacity>
  //   )}
  // </View>
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
