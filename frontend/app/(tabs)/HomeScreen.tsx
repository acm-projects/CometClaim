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
import { Post, Item } from "@/components/ui/Post";
import ShareScreen from "@/components/ui/ShareScreen"; // <- extract this into its own component
import { useFocusEffect } from "expo-router";
import ChatbotButton from "@/components/ui/ChatbotButton";

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  useFocusEffect(
    useCallback(() => {
      async function getItems() {
        const res = await fetch(`${apiUrl}/items`);
        const data = await res.json();
        setItems(JSON.parse(data.body));
      }
      getItems();
    }, [])
  );

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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          {items.map((item: Item, index: number) => (
            <Post
              item={item}
              key={index}
              onShare={() => openShareModal(item)}
            />
          ))}
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
});
