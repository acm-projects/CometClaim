// HomeScreen.tsx
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/ui/Header";
import { Post } from "@/components/ui/Post";
import ShareScreen from "@/components/ui/ShareScreen"; // <- extract this into its own component
import { useFocusEffect } from "expo-router";
import ChatbotButton from "@/components/ui/ChatbotButton";
import { User, defaultUser, Item } from "@/types"; // <- import the User type
import CategoryFilter from "@/components/ui/CategoryFilter"; // Import the new component

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "Lost" | "Found"
  >("all");

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
          // Parse the body if it's returned as a string
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

  // useFocusEffect(
  //   useCallback(() => {
  //     async function getItems() {
  //       const res = await fetch(`${apiUrl}/items`);
  //       const data = await res.json();
  //       setItems(JSON.parse(data.body));
  //     }
  //     getItems();
  //   }, [])
  // );
  useFocusEffect(
    useCallback(() => {
      async function getItems() {
        try {
          const res = await fetch(`${apiUrl}/items`);
          const data = await res.json();
          const fetchedItems = JSON.parse(data.body);

          // Sort the fetchedItems, not the old items array
          const sortedItems = [...fetchedItems].sort((a: Item, b: Item) => {
            return (
              new Date(b.date_reported).getTime() -
              new Date(a.date_reported).getTime()
            );
          });

          setItems(sortedItems);

          // Filter the sorted items based on activeCategory
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

  // Handle category change
  const handleCategoryChange = (category: "all" | "Lost" | "Found") => {
    setActiveCategory(category);
    filterItems(items, category);
  };

  return (
    // <LinearGradient
    //   style={styles.container}
    //   colors={["#FFDCB5", "#FC5E1A"]}
    //   start={{ x: 0.5, y: 0.5 }}
    //   end={{ x: 0.5, y: 0 }}
    // >
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#FFFAF8" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        {/* Added the CategoryFilter component */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {filteredItems.map((item: Item, index: number) => (
            <Post
              item={item}
              user={item.reporter || null}
              key={index}
              onShare={() => openShareModal(item)}
            />
          ))}
          {/* Show a message when no items are found */}
          {filteredItems.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No {activeCategory === "all" ? "" : activeCategory} items found
              </Text>
            </View>
          )}
        </ScrollView>
        <Modal transparent={true} visible={modalVisible}>
          <ShareScreen item={selectedItem} onClose={closeShareModal} />
        </Modal>
      </SafeAreaView>
      <ChatbotButton />
      {/* // </LinearGradient> */}
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
    // backgroundColor: "rgba(0,0,0,0.5)",
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
