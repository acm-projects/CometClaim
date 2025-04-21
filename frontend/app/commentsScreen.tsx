import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Link, useNavigation, router, useLocalSearchParams } from "expo-router";
import { Comment } from "@/components/Comment";
import { useEffect, useState } from "react";

export default function CommentsScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const { item_id } = useLocalSearchParams<{ item_id: string }>();
  console.log(item_id);
  const [comments, setComments] = useState([
    {
      id: "1",
      username: "Neeha",
      commentMessage:
        "I found this item at the ECSS around 7 PM coming into class",
      replies: [
        { id: "1-1", username: "Mohammad", commentMessage: "lol" },
        {
          id: "1-2",
          username: "Jason",
          commentMessage:
            "@Neeha I found this item at the ECSS around 7 PM coming into class",
        },
      ],
    },
    {
      id: "2",
      username: "Tien",
      commentMessage:
        "I found this item at the ECSS around 7 PM coming into class",
      replies: [],
    },
  ]);

  // useEffect(() => {
  //   async function getItemComments() {
  //     try {
  //       const res = await fetch(`${apiUrl}/items/${item_id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log(data);
  //         const itemData =
  //           typeof data.body === "string" ? JSON.parse(data.body) : data.body;
  //         console.log(itemData.comments);
  //         // setComments(itemData.comments);
  //       } else {
  //         console.error("Failed to fetch current user");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching current user:", error);
  //     }
  //   }
  //   getItemComments();
  // }, []);

  return (
    <KeyboardAvoidingView
      style={{ height: "100%", width: "100%", backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={40}
    >
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
                Comments
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
        {comments.map((commentItem) => (
          <Comment
            key={commentItem.id}
            username={commentItem.username}
            commentMessage={commentItem.commentMessage}
            replies={commentItem.replies}
          />
        ))}
      </ScrollView>

      <LinearGradient
        colors={["#B474DA1B", "#E61D7B", "#B474DA1B"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 1,
          width: "100%",
        }}
      >
        <View style={{ height: "100%" }}></View>
      </LinearGradient>

      <View style={{ height: "8.5%", paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Pressable>
            <Feather name="camera" size={32} color={"#4D4D4D"} />
          </Pressable>
          <TextInput
            placeholder="Add a comment..."
            style={{
              flex: 1,
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 10,
              fontFamily: Platform.select({
                android: "Poppins_400Regular",
                ios: "Poppins-Regular",
              }),
              marginHorizontal: 10,
              height: 40,
              padding: 10,
            }}
            placeholderTextColor={"#9A9A9A"}
          />
          <Pressable>
            <Ionicons name="paper-plane-outline" size={32} color={"#4D4D4D"} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  testBorder: {
    borderColor: "blue",
    borderWidth: 1,
  },
});
