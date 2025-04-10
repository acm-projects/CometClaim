// [chat_id].tsx
("use client");

import { useState, useEffect, useRef } from "react";
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
  type ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUser, User, Message } from "@/types";

// Define the Message type
interface ChatMessage {
  id?: string;
  text?: string;
  message?: string; // For compatibility with WebSocket messages
  sender?: "sender" | "receiver";
  username?: string; // For WebSocket messages
  timestamp?: string;
}

type DMInfo = {
  chat_id: string;
  recipient_ids: string[];
  chat_name: string;
  chat_profile_picture: string;
  recipient_ids_to_names?: object;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const DMScreen = () => {
  const [dmInfo, setDmInfo] = useState<DMInfo>();

  const searchParams = useLocalSearchParams();

  // console.log(id, name, avatar)

  // State for messages and input
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>("user1"); // Your username

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  // WebSocket URL from environment variables
  const websocketApiUrl = process.env.EXPO_PUBLIC_WS_API_URL;

  useEffect(() => {
    const { chat_id, ids, name, avatar } = searchParams;
    console.log(chat_id, ids, name, avatar);
    if (
      typeof chat_id === "string" &&
      (typeof ids === "object" || typeof ids === "string") &&
      typeof name === "string" &&
      typeof avatar === "string"
    ) {
      const dm_info: DMInfo = {
        chat_id: chat_id,
        recipient_ids: typeof ids === "object" ? ids : ids.split(","),
        chat_name: name,
        chat_profile_picture: avatar,
      };

      setDmInfo(dm_info);

      console.log("dm info", dm_info);
    }
  }, []);

  useEffect(() => {
    async function getUserId() {
      const userId = await AsyncStorage.getItem("userId");
      const username = await AsyncStorage.getItem("username");
      setCurrentUserId(userId);
      if (username) setCurrentUsername(username);
    }
    getUserId();
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!websocketApiUrl) {
      console.log("WebSocket URL not configured");
      return;
    }

    if (!currentUserId) {
      console.log("current user id hasnt loaded yet");
      return;
    } else {
      console.log(currentUserId);
    }

    const newSocket = new WebSocket(
      `${websocketApiUrl}?user_id=${currentUserId}`
    );
    setSocket(newSocket);

    newSocket.onopen = (event) => {
      console.log("WebSocket Connected!");
      console.log("event", event);
      // Join the conversation with the specific user
      // newSocket.send(
      //   JSON.stringify({
      //     action: "joinConversation",
      //     conversationId: userId,
      //     username: currentUsername,
      //   })
      // );
    };

    newSocket.onmessage = (event) => {
      const messageObj = JSON.parse(event.data);
      console.log("Message from server:", messageObj);

      // Add the new message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          message: messageObj.message,
          username: messageObj.username,
          sender:
            messageObj.username === currentUsername ? "sender" : "receiver",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    // Load initial messages (could be from API or local storage)
    loadInitialMessages();

    // Clean up WebSocket connection when component unmounts
    return () => {
      console.log("Closing WebSocket connection...");
      newSocket.close();
    };
  }, [dmInfo, currentUserId]); // Reconnect when userId changes

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const loadInitialMessages = async () => {
    const res = await fetch(`${apiUrl}/chats/${dmInfo?.chat_id}/messages`, {
      method: "GET",
    });

    const data = await res.json();

    const initialMessages = JSON.parse(data.body);

    // This could be an API call to get message history
    // For now, we'll use some sample messages
    // const initialMessages: Message[] = [
    //   {
    //     id: "1",
    //     message: `Hello ${currentUsername}!`,
    //     username: recipient.username,
    //     sender: "receiver",
    //     timestamp: new Date(Date.now() - 3600000).toISOString(),
    //   },
    //   {
    //     id: "2",
    //     message: `Hi ${recipient.username}, how are you?`,
    //     username: currentUsername,
    //     sender: "sender",
    //     timestamp: new Date(Date.now() - 3000000).toISOString(),
    //   },
    // ];

    // const initialMessages = []

    const reformattedInitialMessages = initialMessages.map(
      (message: Message) =>
        ({
          id: message.message_id,
          message: message.message,
          username: message.username,
          sender: message.sender_id === currentUserId ? "sender" : "receiver",
          timestamp: new Date(
            parseInt(message.timestamp) - 3000000
          ).toISOString(),
        } as ChatMessage)
    ) as ChatMessage[];

    reformattedInitialMessages.reverse();

    console.log(reformattedInitialMessages);

    setMessages(reformattedInitialMessages);
  };

  // Send a message via WebSocket
  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      // Create message object
      const messageObj = {
        action: "sendMessage",
        senderId: currentUserId,
        recipientIds: dmInfo?.recipient_ids || [],
        username: currentUsername,
        message: messageInput,
      };

      const res = await fetch(`${apiUrl}/chats/${dmInfo?.chat_id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: currentUserId,
          message: messageInput,
          username: currentUsername,
        }),
      });

      const data = await res.json();

      console.log(data);

      console.log(messageObj);

      // Send to WebSocket server
      socket.send(JSON.stringify(messageObj));

      // Add to local messages (optimistic update)
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: messageInput,
        username: currentUsername,
        sender: "sender",
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");
      Keyboard.dismiss();
    } else {
      console.log("WebSocket not connected");
      // Fallback for when WebSocket is not available
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: messageInput,
        username: currentUsername,
        sender: "sender",
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");
      Keyboard.dismiss();
    }
  };

  // Render a message bubble
  const renderMessage = ({ item }: { item: ChatMessage }) => (
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
        {item.message || item.text}
      </Text>
      {item.timestamp && (
        <Text
          style={[
            styles.timestampText,
            item.sender === "sender"
              ? styles.senderTimestamp
              : styles.receiverTimestamp,
          ]}
        >
          {formatTimestamp(item.timestamp)}
        </Text>
      )}
    </View>
  );

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FC5E1A" />
          </TouchableOpacity>

          {dmInfo?.chat_profile_picture ? (
            <Image
              source={{ uri: dmInfo?.chat_profile_picture }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>
                {dmInfo?.chat_name.charAt(0)}
              </Text>
            </View>
          )}

          <Text style={styles.headerText}>{dmInfo?.chat_name}</Text>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id || Math.random().toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContentContainer}
          ref={scrollViewRef as any}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            onSubmitEditing={sendMessage}
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
    borderColor: "#eee",
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
    flex: 1,
  },
  messagesContentContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  senderBubble: {
    backgroundColor: "#FC5E1A",
    alignSelf: "flex-end",
    marginRight: 8,
    borderBottomRightRadius: 4,
  },
  receiverBubble: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    marginLeft: 8,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: "#fff",
  },
  receiverText: {
    color: "#333",
  },
  timestampText: {
    fontSize: 11,
    marginTop: 4,
  },
  senderTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-end",
  },
  receiverTimestamp: {
    color: "#888",
    alignSelf: "flex-start",
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
    color: "#333",
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
