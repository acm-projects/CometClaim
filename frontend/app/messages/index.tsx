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
import { type RelativePathString, router, useFocusEffect } from "expo-router";
import { UserMessage } from "@/components/ui/UserMessages";
import type { Chat, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";

// Define the message type
type ChatPreview = {
  chat: Chat;
  avatar: string;
  username: string;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function MessagesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Navigate to the DM screen with the user's information
  const navigateToDM = (chatPreview: ChatPreview) => {
    router.push({
      pathname: "/messages/[chat_id]" as RelativePathString,
      params: {
        chat_id: chatPreview.chat.chat_id,
        recipient_ids: chatPreview.chat.chat_members
          .filter((member) => member !== currentUserId)
          .join(","), // Convert array to comma-separated string
        name: chatPreview.username,
        avatar: chatPreview.avatar || "",
      },
    });
  };

  const [chatPreviewList, setChatPreviewList] = useState<ChatPreview[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function getChats() {
        try {
          setIsLoading(true);

          const userId = await AsyncStorage.getItem("userId");
          if (userId) setCurrentUserId(userId);

          const res = await fetch(`${apiUrl}/users/${userId}/chats`, {
            method: "GET",
          });

          const data = await res.json();

          const chats: Chat[] = JSON.parse(data.body);

          const chatPreviewList: ChatPreview[] = [];

          for (const chat of chats) {
            // Get profile picture for the chat (if it's a direct message)
            const otherMembersList = chat.chat_members.filter(
              (member) => member !== userId
            );

            console.log("CURRENT USER ID", userId);

            console.log("OTHER MEMBERS LIST", otherMembersList);

            const otherMemberId = otherMembersList[0];

            const res = await fetch(`${apiUrl}/users/${otherMemberId}`);
            const data = await res.json();

            const otherMember: User = JSON.parse(data.body);

            const chatPreview: ChatPreview = {
              chat: chat,
              avatar: otherMember.profile_picture,
              username: otherMember.username,
            };

            chatPreviewList.push(chatPreview);
          }

          console.log("chat list:", chatPreviewList);
          setChatPreviewList(chatPreviewList);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching chats:", error);
          setIsLoading(false);
        }
      }

      getChats();
    }, [])
  );

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

      {chatPreviewList.length === 0 ? (
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
          data={chatPreviewList}
          keyExtractor={(item) => item.chat.chat_id}
          renderItem={({ item }) => (
            <UserMessage
              name={item.username}
              preview={item.chat.last_message}
              timestamp={new Date(
                parseInt(item.chat.last_updated)
              ).toDateString()}
              unread={false}
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
