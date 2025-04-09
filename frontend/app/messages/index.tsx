import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Link, RelativePathString, router } from "expo-router";
import NewMessage from "@/components/ui/UserMessages";
import { UserMessage } from "@/components/ui/UserMessages";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import filter from "lodash.filter";

// Define the message type
interface ChatPreview {
  chat_id: string;
  user_ids: string[];
  name: string;
  preview: string;
  timestamp?: string;
  unread?: boolean;
  avatar?: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Define messages data
// const messages: ChatPreview[] = [
//   {
//     chat_id: '1',
//     user_ids: ["1"],
//     name: "Jeremy Dough",
//     preview: "Are you available next Wednesday?",
//     timestamp: "10:30 AM",
//     unread: true,
//   },
//   {
//     chat_id: '1',
//     user_ids: ["2"],
//     name: "Jane Steward",
//     preview: "We can meet after my CS2336 class...",
//     timestamp: "Yesterday",
//   },
//   {
//     chat_id: '1',
//     user_ids: ["3"],
//     name: "FAQ Chatbot",
//     preview: "What date did you lose the item?",
//     timestamp: "Mon",
//     avatar: "https://img.icons8.com/color/96/000000/chatbot.png",
//   },
//   {
//     chat_id: '1',
//     user_ids: ["4"],
//     name: "Jordan Rodriguez",
//     preview: "No worries! I can stop by...",
//     timestamp: "Sun",
//   },
//   {
//     chat_id: '1',
//     user_ids: ["5"],
//     name: "Mohammad Mehrab",
//     preview: "Hello from the client",
//     timestamp: "Today",
//   },
// ];

export default function MessagesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fullData, setFullData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Navigate to the DM screen with the user's information
  const navigateToDM = (user: ChatPreview) => {
    console.log("test");
    router.push({
      pathname: "/messages/[chat_id]" as RelativePathString,
      params: {
        chat_id: user.chat_id,
        ids: user.user_ids,
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

        console.log(JSON.parse(data.body));

        const chatInfo = JSON.parse(data.body);

        const chatPreview = {
          chat_id: chatInfo.chat_id,
          user_ids: chatInfo.chat_members,
          name: chatInfo.chat_name,
          preview: chatInfo.last_message?.message || "blank",
          timestamp: chatInfo.last_message?.timestamp || "ts",
        };

        chatList.push(chatPreview);
      }

      console.log("chat list:", chatList);
      setChatList(chatList);
    }

    if (currentUserId) {
      console.log(currentUserId);
      getChats();
    }
  }, [currentUserId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      // If query is empty, show all users
      setData(fullData);
      return;
    }
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = (user: User, query: string): boolean => {
    if (user.username.toLowerCase().includes(query)) {
      return true;
    }
    if (user.full_name && user.full_name.toLowerCase().includes(query)) {
      return true;
    }
    if (user.email.toLowerCase().includes(query)) {
      return true;
    }
    // Check if phone number contains the query (if available)
    if (user.phone_number && user.phone_number.includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        const parsedUsers: User[] = JSON.parse(responseData.body);
        setData(parsedUsers);
        setFullData(parsedUsers);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, []);

  // Loading handling state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Error fetching data ... Please check your internet connection!
        </Text>
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
            <Pressable onPress={() => router.push("/newMess")}>
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
          placeholder="Search for users"
          placeholderTextColor="#A6A6A6"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <NewMessage
            name={item.username}
            avatar={item.profile_picture}
            onPress={() =>
              navigateToDM({
                id: item.user_id,
                name: item.username,
                avatar: item.profile_picture || "",
              })
            }
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
    fontWeight: 500,
  },
});
