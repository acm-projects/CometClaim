"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchAnswerFromOpenAI from "./openaiAPI";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
// List of FAQs
const predefinedQuestions = [
  { question: "What is my name?", answer: "Your name is Hannah, silly!" },
  // Add more predefined questions here
];
type Message = {
  type: "user" | "bot";
  text: string;
};
const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);
  // Check if user message matches predefined questions
  const getPredefinedAnswer = (question: string): string | null => {
    const match = predefinedQuestions.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );
    return match ? match.answer : null;
  };
  const handleSendMessage = async () => {
    // Check if there is a predefined answer
    const predefinedAnswer = getPredefinedAnswer(message);
    if (predefinedAnswer) {
      // Use if available
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: predefinedAnswer },
      ]);
    } else {
      // Call openAI to make something up
      const answer = await fetchAnswerFromOpenAI(message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: answer },
      ]);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <LinearGradient
        colors={["#FC5E1A", "#FFC480"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          minHeight: 95,
          height: "11.3%",
          width: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              marginTop: "10%",
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{ marginLeft: "2%" }}
              onPress={() => router.back()}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </Pressable>
            <View
              style={{
                position: "absolute",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                ChatBot
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient> */}

      <View style={styles.header}>
        <TouchableOpacity style={{ margin: 15 }} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FC5E1A" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            ChatBot
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#f7f7f7", marginBottom: 30 }}
      >
        <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
          {chatHistory.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.type === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.type === "user" ? styles.userMessage : styles.botMessage,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  chatContainer: {
    padding: 10,
    height: 400,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#fff",
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    width: "100%",
    marginTop: "5%",
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FC5E1A",
  },
  botMessage: {
    alignSelf: "flex-start",
    color: "#000",
    backgroundColor: "#E4E6EB",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#FC5E1A",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ChatScreen;
