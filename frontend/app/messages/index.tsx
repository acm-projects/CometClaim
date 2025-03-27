import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { UserMessage } from "@/components/ui/UserMessages";

// Define the message type
interface Message {
  id: string;
  name: string;
  preview: string;
  timestamp?: string;
  unread?: boolean;
  avatar?: string;
}

// Define messages data
const messages: Message[] = [
  {
    id: "1",
    name: "Jeremy Dough",
    preview: "Are you available next Wednesday?",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    name: "Jane Steward",
    preview: "We can meet after my CS2336 class...",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    name: "FAQ Chatbot",
    preview: "What date did you lose the item?",
    timestamp: "Mon",
    avatar: "https://img.icons8.com/color/96/000000/chatbot.png",
  },
  {
    id: "4",
    name: "Jordan Rodriguez",
    preview: "No worries! I can stop by...",
    timestamp: "Sun",
  },
  {
    id: "5",
    name: "Mohammad Mehrab",
    preview: "Hello from the client",
    timestamp: "Today",
  },
];

export default function MessagesScreen() {
  // Navigate to the DM screen with the user's information
  const navigateToDM = (user: Message) => {
    router.push({
      pathname: "/messages/[id]",
      params: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
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
                Messages
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
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
});
