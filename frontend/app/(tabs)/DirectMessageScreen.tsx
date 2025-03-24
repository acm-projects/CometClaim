import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Keyboard, Image 
} from "react-native";

// Define the Message type
interface Message {
  id: string;
  text: string;
  sender: "sender" | "receiver";
}

const DMScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hey there!", sender: "receiver" },
    { id: '2', text: "Hello! How are you?", sender: "sender" },
    { id: '3', text: "I'm good, thanks for asking!", sender: "receiver" },
  ]);

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
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://www.example.com/profile.jpg" }} // Replace with actual image URL or local image
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>User's Name</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContentContainer}
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
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
    paddingBottom: 80, // Ensure space for the input field
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
  },
  senderBubble: {
    backgroundColor: "#FF5722", // Deep bright orange background for sender messages
    alignSelf: "flex-end",
    marginRight: 8,
  },
  receiverBubble: {
    backgroundColor: "#e0e0e0", // Gray background for receiver messages
    alignSelf: "flex-start",
    marginLeft: 8,
  },
  messageText: {
    fontSize: 16,
    color: "#fff", // White text for both sender and receiver messages
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DMScreen;

