// CategoryFilter.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type CategoryFilterProps = {
  activeCategory: "all" | "Lost" | "Found";
  onCategoryChange: (category: "all" | "Lost" | "Found") => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeCategory === "all" && styles.activeTab]}
          onPress={() => onCategoryChange("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === "all" && styles.activeTabText,
            ]}
          >
            All
          </Text>
          {/* {activeCategory === "all" && (
            <LinearGradient
              colors={["#FFDCB5", "#FC5E1A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.activeIndicator}
            />
          )} */}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeCategory === "Lost" && styles.activeTab]}
          onPress={() => onCategoryChange("Lost")}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === "Lost" && styles.activeTabText,
            ]}
          >
            Lost
          </Text>
          {/* {activeCategory === "Lost" && (
            <LinearGradient
              colors={["#FFDCB5", "#FC5E1A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.activeIndicator}
            />
          )} */}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeCategory === "Found" && styles.activeTab]}
          onPress={() => onCategoryChange("Found")}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === "Found" && styles.activeTabText,
            ]}
          >
            Found
          </Text>
          {/* {activeCategory === "Found" && (
            <LinearGradient
              colors={["#FFDCB5", "#FC5E1A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.activeIndicator}
            />
          )} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FC5E1A",
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  activeTabText: {
    color: "#FC5E1A",
    fontWeight: "600",
  },
  activeIndicator: {
    height: 3,
    width: "50%",
    position: "absolute",
    bottom: 0,
    borderRadius: 3,
  },
});

export default CategoryFilter;
