"use client";

// HomeScreen.tsx
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Animated,
} from "react-native";
import type React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import Header from "@/components/ui/Header";
import { Post } from "@/components/ui/Post";
import ShareScreen from "@/components/ui/ShareScreen";
import { useFocusEffect } from "expo-router";
import ChatbotButton from "@/components/ui/ChatbotButton";
import { type User, defaultUser, type Item } from "@/types";
import CategoryFilter from "@/components/ui/CategoryFilter";

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "Lost" | "Found"
  >("all");

  const scrollY = useRef(new Animated.Value(0)).current;
  const filterHeight = 70; // Adjust based on actual height of your CategoryFilter

  // This will make the filter completely disappear when scrolled
  const filterTranslateY = scrollY.interpolate({
    inputRange: [0, filterHeight],
    outputRange: [0, -filterHeight * 2], // Increased to ensure it's completely gone
    extrapolate: "clamp",
  });

  // Add opacity animation to make it fade out completely
  const filterOpacity = scrollY.interpolate({
    inputRange: [0, filterHeight * 0.7],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const openShareModal = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeShareModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    filterItems(items, activeCategory);
  }, [items, activeCategory]);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch(`${apiUrl}/users/me`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          const userData =
            typeof data.body === "string" ? JSON.parse(data.body) : data.body;
          setCurrentUser(userData);
        } else {
          console.error("Failed to fetch current user");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    getCurrentUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getItems() {
        try {
          const res = await fetch(`${apiUrl}/items`);
          const data = await res.json();
          const fetchedItems = JSON.parse(data.body);

          const sortedItems = [...fetchedItems].sort((a: Item, b: Item) => {
            return (
              new Date(b.date_reported).getTime() -
              new Date(a.date_reported).getTime()
            );
          });

          setItems(sortedItems);
          filterItems(sortedItems, activeCategory);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      }
      getItems();
    }, [activeCategory])
  );

  const filterItems = (
    allItems: Item[],
    category: "all" | "Lost" | "Found"
  ) => {
    if (category === "all") {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(allItems.filter((item) => item.status === category));
    }
  };

  const handleCategoryChange = (category: "all" | "Lost" | "Found") => {
    setActiveCategory(category);
    filterItems(items, category);
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#FFFAF8" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        {/* Main content container with absolute positioning for filter */}
        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {/* Add a spacer for the filter height */}
            <View style={{ height: filterHeight }} />

            {filteredItems.map((item: Item, index: number) => (
              <Post
                item={item}
                user={item.reporter || null}
                key={index}
                onShare={() => openShareModal(item)}
              />
            ))}
            {filteredItems.length === 0 && (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  No {activeCategory === "all" ? "" : activeCategory} items
                  found
                </Text>
              </View>
            )}
          </Animated.ScrollView>

          {/* Absolutely positioned filter that will animate out */}
          <Animated.View
            style={{
              transform: [{ translateY: filterTranslateY }],
              opacity: filterOpacity,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2,
              backgroundColor: "#FFFAF8",
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 0.1,
              // shadowRadius: 3,
              // elevation: 3,
            }}
          >
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </Animated.View>
        </View>

        <Modal transparent={true} visible={modalVisible}>
          <ShareScreen item={selectedItem} onClose={closeShareModal} />
        </Modal>
      </SafeAreaView>
      <ChatbotButton />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    marginBottom: 120,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});
