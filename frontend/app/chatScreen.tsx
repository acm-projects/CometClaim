import { ChatMessage } from "@/components/ChatMessage";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>();
  const [messageInput, setMessageInput] = useState<string>("");
  const [username, setUsername] = useState<string>("user1");
  const scrollViewRef = useRef<ScrollView>(null);
  // const websocketApiUrl = Constants.expoConfig?.extra?.websocketApiUrl
  const websocketApiUrl = process.env.EXPO_PUBLIC_WS_API_URL;

  useEffect(() => {
    let socket: WebSocket;
    if (websocketApiUrl) {
      socket = new WebSocket(websocketApiUrl);

      setSocket(socket);
      socket.onopen = () => {
        console.log("Connected!");
        socket.send(
          JSON.stringify({
            action: "sendMessage",
            username: "mohammad",
            message: "Hello from the client!",
          })
        );
      };

      socket.onmessage = (event) => {
        const messageObj = JSON.parse(event.data);
        console.log("Message from server:", messageObj);
        setMessages((prevMessages) => [...prevMessages, messageObj]);
      };

      socket.onclose = () => {
        console.log("Disconnected");
      };

      return () => {
        console.log("Closing connetion...");
        socket.close();
      };
    } else {
      console.log("yeah the websocket url aint loading");
    }
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (socket) {
      console.log("message sent");
      // console.log('username:', username)
      // console.log('message:', message)
      socket.send(
        JSON.stringify({
          action: "sendMessage",
          username: username,
          message: messageInput,
        })
      );

      const newMessage = {
        username: username,
        message: messageInput,
      };

      setMessageInput("");

      console.log("messages", messages);
    } else {
      console.log("socket has not been created");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "red",
            height: "50%",
            width: "80%",
            minHeight: 100,
          }}
        >
          <ScrollView ref={scrollViewRef}>
            <View style={{ height: 100 }}></View>
            <Text style={{ color: "white" }}>lol</Text>
            <ChatMessage user="Mohammad" message="Hello!" />
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                user={msg.username || ""}
                message={msg.message}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "blue",
            width: "80%",
            minHeight: "5%",
            height: "5%",
            flexDirection: "row",
          }}
        >
          <TextInput
            onChangeText={setMessageInput}
            value={messageInput}
            style={{
              width: "80%",
              height: "100%",
              color: "white",
              borderWidth: 1,
              borderColor: "green",
            }}
          />
          <Pressable
            style={{
              width: "20%",
              height: "100%",
              borderWidth: 1,
              borderColor: "purple",
            }}
            onPress={sendMessage}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Send</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
