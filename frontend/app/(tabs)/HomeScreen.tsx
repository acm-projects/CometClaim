"use client";

// HomeScreen.tsx
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Animated,
  Button,
} from "react-native";
import type React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import Header from "@/components/ui/Header";
import { Post } from "@/components/ui/Post";
import { User, defaultUser, Item } from "@/types";
import ShareScreen from "@/components/ui/ShareScreen"; // <- extract this into its own component
import { useFocusEffect } from "expo-router";
import ChatbotButton from "@/components/ui/ChatbotButton";
import CategoryFilter from "@/components/ui/CategoryFilter";
import LoadingScreen from "../Landing";
import {
  requestNotificationPermission,
  sendLocalNotification,
} from "../utils/NotificationUtils";
import ItemCategoryFilter from "@/components/ui/ItemCategories";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "Lost" | "Found"
  >("all");
  const [activeItemCategory, setActiveItemCategory] = useState<string | null>(
    null
  );

  const itemCategories = [
    {
      id: "tech",
      name: "Tech",
      icon: "https://i.imgur.com/Achigdr.png",
    },
    {
      id: "shirts",
      name: "Shirts",
      icon: "https://www.mrporter.com/variants/images/1647597307228448/in/w2000_q60.jpg",
    },
    {
      id: "books",
      name: "Books",
      icon: "https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=1200",
    },
    {
      id: "keys",
      name: "Keys",
      icon: "https://cdn.shopify.com/s/files/1/2245/3557/files/CSE-AS-ExtraKeys.png?v=1713479233",
    },
    {
      id: "wallets",
      name: "Wallets",
      icon: "https://i.ebayimg.com/00/s/MTU1OFgxNjAw/z/z8AAAOSwsFdfvAg7/$_57.JPG?set_id=8800005007",
    },
    {
      id: "bags",
      name: "Bags",
      icon: "https://prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764",
    },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const filterHeight = 70;

  // This is a trigger to refresh the items when the filter changes
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refreshItems = () => {
    console.log("Refresh triggered!");
    setRefreshTrigger((prev) => prev + 1);
  };

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
  const [loading, setLoading] = useState(true);

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
      const currentUserId = await AsyncStorage.getItem("userId");
      if (currentUserId) setCurrentUserId(currentUserId);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    // Force a refresh when changing categories
    refreshItems();
  }, [activeCategory]);

  useFocusEffect(
    useCallback(() => {
      async function getItems() {
        try {
          const res = await fetch(`${apiUrl}/items`);
          const data = await res.json();
          // console.log(typeof data, data);
          const fetchedItems = JSON.parse(data.body);
          console.log(fetchedItems);

          const sortedItems = [...fetchedItems]
            .filter((item: Item) => item.status !== "Claimed")
            .sort((a: Item, b: Item) => {
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
        setTimeout(() => {
          setLoading(false);
        }, 1500); // 2 second delay
      }
      getItems();
    }, [activeCategory, refreshTrigger])
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
    refreshItems();
    // filterItems(items, category);
  };

  //TODO:
  //useEffect and sendLocalNotification
  //To put into any button

  useEffect(() => {
    // Request notification permission when component mounts
    requestNotificationPermission();
  }, []);
  const handleItemCategoryChange = (categoryId: string) => {
    // Toggle category if already selected
    setActiveItemCategory(
      activeItemCategory === categoryId ? null : categoryId
    );
    refreshItems();
  };

  if (loading) {
    return <LoadingScreen />;
  }
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

            <ItemCategoryFilter
              categories={itemCategories}
              activeCategory={activeItemCategory}
              onCategoryChange={handleItemCategoryChange}
            />
            {filteredItems.map((item: Item, index: number) => (
              <Post
                item={item}
                user={item.reporter || null}
                key={index}
                onShare={() => openShareModal(item)}
                onStatusChange={refreshItems}
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
