import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the message type
interface Message {
  id: string;
  name: string;
  preview: string;
}

// Define messages data
const messages: Message[] = [
  { id: "1", name: "Jeremy Dough", preview: "Are you available next Wednesday?" },
  { id: "2", name: "Jane Steward", preview: "We can meet after my CS2336 class..." },
  { id: "3", name: "FAQ Chatbot", preview: "What date did you lose the item?" },
  { id: "4", name: "Jordan Rodriguez", preview: "No worries! I can stop by..." },
];

// Define the RootStackParamList for your navigation types
type RootStackParamList = {
  DirectMessage: { name: string };
};

// Use navigation hook with correct type
export default function MessagesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.messageItem, { width: screenWidth * 0.9 }]} // Adjust width based on screen size
            onPress={() => navigation.navigate("DirectMessage", { name: item.name })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.preview}>{item.preview}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  messageItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd", marginBottom: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  preview: { color: "gray" },
});
