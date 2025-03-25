"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define the Message type
interface Message {
  id: string;
  text: string;
  sender: "sender" | "receiver";
}

// Mock conversation data - in a real app, you'd fetch this from a database
const conversationData: { [key: string]: Message[] } = {
  "1": [
    { id: "1", text: "Hey there!", sender: "receiver" },
    { id: "2", text: "Hello Jeremy! How are you?", sender: "sender" },
    { id: "3", text: "I'm good, thanks for asking!", sender: "receiver" },
    { id: "4", text: "Are you available next Wednesday?", sender: "receiver" },
  ],
  "2": [
    { id: "1", text: "Hi Jane!", sender: "sender" },
    { id: "2", text: "Hello! How's your project going?", sender: "receiver" },
    { id: "3", text: "It's going well, almost done!", sender: "sender" },
    {
      id: "4",
      text: "We can meet after my CS2336 class...",
      sender: "receiver",
    },
  ],
  "3": [
    {
      id: "1",
      text: "Hello, I'm the FAQ Chatbot. How can I help you?",
      sender: "receiver",
    },
    { id: "2", text: "I lost my water bottle on campus", sender: "sender" },
    {
      id: "3",
      text: "I'm sorry to hear that. Let me help you find it.",
      sender: "receiver",
    },
    { id: "4", text: "What date did you lose the item?", sender: "receiver" },
  ],
  "4": [
    {
      id: "1",
      text: "Hey Jordan, did you find my notebook?",
      sender: "sender",
    },
    { id: "2", text: "Yes! I have it with me", sender: "receiver" },
    { id: "3", text: "Great! When can I pick it up?", sender: "sender" },
    { id: "4", text: "No worries! I can stop by...", sender: "receiver" },
  ],
};

const DMScreen = () => {
  // Get the user ID and name from the URL params
  const { id, name, avatar } = useLocalSearchParams();
  const userId = typeof id === "string" ? id : "1";
  const userName = typeof name === "string" ? name : "User";
  const userAvatar = typeof avatar === "string" ? avatar : "";

  // Initialize with conversation data if it exists, otherwise empty array
  const [messages, setMessages] = useState<Message[]>(
    conversationData[userId] || []
  );
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: message,
        sender: "sender",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      // Close the keyboard after sending the message
      Keyboard.dismiss();
    }
  };

  // Update renderItem to use the Message type
  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "sender" ? styles.senderBubble : styles.receiverBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "sender" ? styles.senderText : styles.receiverText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FC5E1A" />
          </TouchableOpacity>

          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
            </View>
          )}

          <Text style={styles.headerText}>{userName}</Text>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContentContainer}
          inverted={false} // Set to true to show newest messages at the bottom
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            onSubmitEditing={sendMessage} // Allow sending by pressing "enter"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  backButton: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FC5E1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesList: {
    flex: 1, // Allow FlatList to take all the remaining space
  },
  messagesContentContainer: {
    paddingTop: 10, // Little padding on top
    paddingHorizontal: 10,
    paddingBottom: 10, // Ensure space for the input field
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  senderBubble: {
    backgroundColor: "#FC5E1A", // Orange background for sender messages
    alignSelf: "flex-end",
    marginRight: 8,
    borderBottomRightRadius: 4,
  },
  receiverBubble: {
    backgroundColor: "#e0e0e0", // Gray background for receiver messages
    alignSelf: "flex-start",
    marginLeft: 8,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: "#fff", // White text for sender messages
  },
  receiverText: {
    color: "#333", // Dark text for receiver messages
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 22,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FC5E1A",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DMScreen;
