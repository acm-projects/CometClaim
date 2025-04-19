import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  Dimensions,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { ShareRow } from "@/components/ShareRow";
import { Chat, Item, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ShareScreenProps {
  item: Item | null;
  onClose: () => void;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ShareScreenPage({ item, onClose }: ShareScreenProps) {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    async function getCurrentUserId() {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) setCurrentUserId(userId);
    }

    getCurrentUserId();
  }, []);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch(`${apiUrl}/users`, {
        method: "GET",
      });

      const data = await res.json();

      const users = JSON.parse(data.body).filter(
        (user: User) => user.user_id !== currentUserId
      );
      // console.log(users);

      setUsers(users);
    }

    if (currentUserId) getUsers();
  }, [currentUserId]);

  const getShareChats = async () => {
    if (!currentUserId) return;

    const selectedUserIds = selectedUsers.map((user) => user.user_id);
    const selectedUserIdsSet = new Set(
      selectedUsers.map((user) => user.user_id)
    );

    // console.log(`selected user ids ${selectedUserIds}`);
    // console.log(`selected user ids set  ${selectedUserIdsSet}`);

    const createChatRequests = selectedUserIds.map((userId) => async () => {
      const res = await fetch(`${apiUrl}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_name: users.find((user) => user.user_id === userId)?.username,
          chat_members: [currentUserId, userId],
        }),
      });

      // console.log("created new chat");
    });

    // console.log(createChatRequests);

    await Promise.all(createChatRequests.map((request) => request()));

    const res = await fetch(`${apiUrl}/users/${currentUserId}/chats`, {
      method: "GET",
    });

    const data = await res.json();

    const chats: Chat[] = JSON.parse(data.body);
    // console.log(`got ${chats.length} chats`);

    const chatIds: string[] = [];

    chats.forEach((chat) => {
      // console.log(
      //   "thingy",
      //   chat.chat_members.filter((member) => member !== currentUserId)[0]
      // );
      if (
        selectedUserIdsSet.has(
          chat.chat_members.filter((member) => member !== currentUserId)[0]
        )
      ) {
        chatIds.push(chat.chat_id);
      }
    });

    // console.log(`after filter, there are  ${chatIds.length} chats`);

    return chatIds;
  };

  const sendShare = async () => {
    // console.log("send share clicked");
    const chatIds = await getShareChats();

    if (chatIds) {
      chatIds.forEach(async (chatId) => {
        // console.log("ITEEMEMMEMEMEM id", item?.item_id);
        const res = await fetch(`${apiUrl}/chats/${chatId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_id: currentUserId,
            content: `cometclaim_post::${item?.item_id}`,
          }),
        });

        const res2 = await fetch(`${apiUrl}/chats/${chatId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_id: currentUserId,
            content: message,
          }),
        });
        // console.log("sent message");
      });
    }

    onClose();
  };

  return (
    <View style={[styles.centeredView, styles.backgroundView]}>
      {/* <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      > */}
      <View style={styles.modalView}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              flexBasis: "5%" /*, flex: 1*/,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                minHeight: 22,
                flexBasis: "10%",
                width: "100%",
              }}
            >
              <View style={{ flexBasis: "10%", minWidth: 30 }}></View>
              <Text
                style={{
                  flexGrow: 1,
                  fontWeight: "600",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Share
              </Text>
              <Pressable
                style={{
                  flexBasis: "10%",
                  minWidth: 30,
                  height:
                    "100%" /*, flex:1, justifyContent:'center', alignItems:'center'*/,
                }}
                onPress={onClose}
              >
                {/* <Text style={{color: 'red'}}>X</Text> */}
                <Ionicons name="close" size={18} color={"black"} />
              </Pressable>
            </View>
          </View>

          <LinearGradient
            colors={["#9683F21B", "#FF4000", "#9683F21B"]}
            locations={[0, 0.49, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={{ width: "100%", height: 1 }}></View>
          </LinearGradient>

          <ScrollView
            style={{}}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={true}
            indicatorStyle="black"
          >
            {users &&
              users.map((user) => (
                <ShareRow
                  key={user.user_id}
                  user={user}
                  setSelectedUsers={setSelectedUsers}
                />
              ))}
          </ScrollView>
          <LinearGradient
            colors={["#9683F21B", "#FF4000", "#9683F21B"]}
            locations={[0, 0.49, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={{ width: "100%", height: 1 }}></View>
          </LinearGradient>

          <TextInput
            style={{ color: "black", margin: 5 }}
            onChangeText={setMessage}
            value={message}
            placeholder="Write a Message..."
            placeholderTextColor="black"
          />

          <LinearGradient
            colors={["#9683F21B", "#FF4000", "#9683F21B"]}
            locations={[0, 0.49, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={{ width: "100%", height: 1 }}></View>
          </LinearGradient>

          <LinearGradient
            colors={["#FFC480", "#FC5E1A"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ ...styles.sendButton }}
          >
            <Pressable
              onPress={sendShare}
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                Send
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    color: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "50%",
    maxHeight: 466,
    maxWidth: 344,
  },
  backgroundView: {
    backgroundColor: "rgba(192, 133, 108, 0.8)",
  },
  sendButton: {
    height: 30,
    borderRadius: "2%",
    // alignItems: "center",
    // justifyContent: "center",
    marginInline: 10,
  },
  testBorder: {
    borderWidth: 1,
    borderColor: "black",
  },
});
