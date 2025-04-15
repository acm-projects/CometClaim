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
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FilterAccordion from "@/components/ui/FilterAccordion";
import { Entypo } from "@expo/vector-icons";
// import { SearchableFlatList } from "react-native-searchable-list";
import { sampleItems, type Item } from "@/data/sampleData";
import ItemCard from "@/components/ui/ItemCard";

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
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // State for filtered items
  const [items, setItems] = useState<Item[]>([]);

  // Apply filters when dependencies change
  useEffect(() => {
    async function getItems() {
      const res = await fetch(`${apiUrl}/items`);
      const data = await res.json();
      setItems(JSON.parse(data.body));
    }
    getItems();
  }, []);

  const [filteredItems, setFilteredItems] = useState<Item[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter items based on search query and selected filters
  const filterItems = useCallback(() => {
    setIsLoading(true);

    // Start with all items
    let results = [...items];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (item) =>
          item.description.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    }

    // Filter by selected locations
    if (selectedLocations.length > 0) {
      results = results.filter((item) =>
        selectedLocations.includes(item.location)
      );
    }

    // Filter by selected keywords
    if (selectedKeywords.length > 0) {
      results = results.filter((item) =>
        item.keywords.some((keyword) => selectedKeywords.includes(keyword))
      );
    }

    // Filter by selected colors
    if (selectedColors.length > 0) {
      results = results.filter((item) => selectedColors.includes(item.color));
    }

    // Update filtered items
    setFilteredItems(results);
    setIsLoading(false);
  }, [searchQuery, selectedLocations, selectedKeywords, selectedColors]);

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

  // Clear search and filters
  const clearSearch = () => {
    setSearchQuery("");
    setSelectedLocations([]);
    setSelectedKeywords([]);
    setSelectedColors([]);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    filterItems();
  }, [filterItems]);

  // Render item for FlatList
  const renderItem = ({ item }: { item: Item }) => <ItemCard item={item} />;
  const [messageInput, setMessageInput] = useState<string>("");
  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={{ uri: "https://img.icons8.com/ios-filled/100/search--v1.png" }}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No items found</Text>
      <Text style={styles.emptyStateText}>
        Try adjusting your search or filters to find what you're looking for.
      </Text>
      <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
        <Text style={styles.clearButtonText}>Clear All Filters</Text>
      </TouchableOpacity>
    </View>
  );

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
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search"
            placeholderTextColor="#DD8843"
          />

          <TouchableOpacity onPress={toggleFilters} style={styles.filterButton}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/DD8843/filter--v1.png",
              }}
              style={styles.filterIcon}
            />
            {(selectedLocations.length > 0 ||
              selectedKeywords.length > 0 ||
              selectedColors.length > 0) && <View style={styles.filterBadge} />}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.searchWords}>
        {showFilters ? (
          <ScrollView style={styles.filtersContainer}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity onPress={clearSearch}>
                <Text style={styles.clearFiltersText}>Clear All</Text>
              </TouchableOpacity>
            </View>
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

            <TouchableOpacity
              style={styles.applyFiltersButton}
              onPress={toggleFilters}
            >
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FC5E1A" />
              </View>
            ) : (
              <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.item_id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
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
  filterButton: {
    marginRight: 10,
    position: "relative",
  },
  filterIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  filterBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FC5E1A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FC5E1A",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "500",
  },
  filtersContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  clearFiltersText: {
    fontSize: 14,
    color: "#FC5E1A",
    fontWeight: "500",
  },
  applyFiltersButton: {
    backgroundColor: "#FC5E1A",
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyFiltersText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingVertical: 8,
    minHeight: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
