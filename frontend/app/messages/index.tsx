import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Link, RelativePathString, router } from "expo-router";
import { UserMessage } from "@/components/ui/UserMessages";
import { useEffect, useState } from "react";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const apiUrl = process.env.EXPO_PUBLIC_API_URL

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
  // Navigate to the DM screen with the user's information
  const navigateToDM = (user: ChatPreview) => {
    console.log("test")
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

  const [chatList, setChatList] = useState<ChatPreview[]>([])
  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
    async function getCurrentUserId() {
      const userId = await AsyncStorage.getItem('userId')
      if (userId) setCurrentUserId(userId)
    }
    getCurrentUserId()
  }, [])

  useEffect(() => {
    async function getChats() {
      const res = await fetch(`${apiUrl}/users/${currentUserId}/chats`, {
        method: 'GET'
      })

      const data = await res.json()

      const chatIds = JSON.parse(data.body).map((obj: {user_id: string; chat_id: string; }) => obj.chat_id)

      console.log('chats of user:', chatIds)

      const chatList: ChatPreview[] = []
      
      for(const chatId of chatIds) {

        const res = await fetch(`${apiUrl}/chats/${chatId}`, {
          method: 'GET'
        })

        const data = await res.json()

        console.log(JSON.parse(data.body))

        const chatInfo = JSON.parse(data.body)

        const chatPreview = {
          chat_id: chatInfo.chat_id,
          user_ids: chatInfo.chat_members,
          name: chatInfo.chat_name,
          preview: chatInfo.last_message?.message || "blank",
          timestamp: chatInfo.last_message?.timestamp || "ts"
        }

        chatList.push(chatPreview)

      }

      console.log('chat list:', chatList)
      setChatList(chatList)

    }
    
    if(currentUserId) {
      console.log(currentUserId)
      getChats()
    }
  }, [currentUserId])


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
