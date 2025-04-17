"use client";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { type RelativePathString, router } from "expo-router";
import { UserMessage } from "@/components/ui/UserMessages";
import type { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

// Define the message type
type ChatPreview = {
  chat_id: string;
  user_ids: string[];
  name: string;
  preview: string;
  timestamp?: string;
  unread?: boolean;
  avatar?: string;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function MessagesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fullData, setFullData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Navigate to the DM screen with the user's information
  const navigateToDM = (user: ChatPreview) => {
    router.push({
      pathname: "/messages/[chat_id]" as RelativePathString,
      params: {
        chat_id: user.chat_id,
        ids: user.user_ids.join(","), // Convert array to comma-separated string
        name: user.name,
        avatar: user.avatar || "",
      },
    });
  };

  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    async function getCurrentUserId() {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) setCurrentUserId(userId);
    }
    getCurrentUserId();
  }, []);

  useEffect(() => {
    async function getChats() {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/users/${currentUserId}/chats`, {
          method: "GET",
        });

        const data = await res.json();

        const chatIds = JSON.parse(data.body).map(
          (obj: { user_id: string; chat_id: string }) => obj.chat_id
        );

        console.log("chats of user:", chatIds);

        const chatList: ChatPreview[] = [];

        for (const chatId of chatIds) {
          const res = await fetch(`${apiUrl}/chats/${chatId}`, {
            method: "GET",
          });

          const data = await res.json();
          const chatInfo = JSON.parse(data.body);

          // Get profile picture for the chat (if it's a direct message)
          let avatar = "";
          if (chatInfo.chat_members && chatInfo.chat_members.length === 2) {
            // Find the other user's ID (not current user)
            const otherUserId = chatInfo.chat_members.find(
              (id: string) => id !== currentUserId
            );
            if (otherUserId) {
              try {
                const userRes = await fetch(`${apiUrl}/users/${otherUserId}`, {
                  method: "GET",
                });
                const userData = await userRes.json();
                const userInfo = JSON.parse(userData.body);
                avatar = userInfo.profile_picture || "";
              } catch (err) {
                console.error("Error fetching user info:", err);
              }
            }
          }

          const chatPreview = {
            chat_id: chatInfo.chat_id,
            user_ids: chatInfo.chat_members || [],
            name: chatInfo.chat_name,
            preview: chatInfo.last_message?.message || "No messages yet",
            timestamp:
              chatInfo.last_message?.timestamp || Date.now().toString(),
            avatar: avatar,
          };

          chatList.push(chatPreview);
        }

        console.log("chat list:", chatList);
        setChatList(chatList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setIsLoading(false);
      }
    }

    if (currentUserId) {
      console.log("Current user ID:", currentUserId);
      getChats();
    }
  }, [currentUserId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter chat list based on search query
    if (query === "") {
      return;
    }
    // Implement chat search if needed
  };

  // Loading state
  if (isLoading && currentUserId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FC5E1A" />
        <Text style={{ marginTop: 10 }}>Loading chats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FC5E1A", "#FFC480"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ minHeight: 95, height: "11.3%", width: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingTop: "10%",
            paddingHorizontal: "2%",
          }}
        >
          {/* Left section - Back button */}
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Pressable style={{ padding: 5 }} onPress={() => router.back()}>
              <Entypo name="chevron-left" size={32} color="white" />
            </Pressable>
          </View>

          {/* Middle section - Title */}
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
              Messages
            </Text>
          </View>

          {/* Right section - Edit icon */}
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}>
            <Pressable
              onPress={() => router.push("/newMess" as RelativePathString)}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/external-anggara-glyph-anggara-putra/120/ffffff/external-edit-user-interface-anggara-glyph-anggara-putra.png",
                }}
                style={{ width: 30, height: 30, resizeMode: "center" }}
              />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          placeholder="Search for chats"
          placeholderTextColor="#A6A6A6"
        />
      </View>

      {chatList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No conversations yet</Text>
          <Pressable
            style={styles.newChatButton}
            onPress={() => router.push("/newMess" as RelativePathString)}
          >
            <Text style={styles.newChatButtonText}>
              Start a new conversation
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.chat_id}
          renderItem={({ item }) => (
            <UserMessage
              name={item.name}
              preview={item.preview}
              timestamp={item.timestamp}
              unread={item.unread}
              avatar={item.avatar}
              onPress={() => navigateToDM(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  listContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#F5F5F5",
    borderColor: "#F5F5F5",
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  newChatButton: {
    backgroundColor: "#FC5E1A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  newChatButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
