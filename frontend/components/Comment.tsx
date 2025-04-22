import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image } from "expo-image";

interface CommentProps {
  username: string;
  commentMessage: string;
  replies?: CommentProps[];
}

export function Comment(props: CommentProps) {
  const [repliesVisibility, setRepliesVisibility] = useState(false);

  function getProfilePicture(username: string) {
    if (username === "Neeha") {
      return "https://upload.wikimedia.org/wikipedia/commons/1/11/Flower.webp";
    } else if (username === "Mohammad") {
      return "https://cometclaim-images-utd.s3.amazonaws.com/uploads/501B562A-6536-4505-A4BE-8DD3D692120F.webp";
    } else if (username === "Tien") {
      return "https://tiffycooks.com/wp-content/uploads/2025/02/Soy-Sauce-Pan-fried-Noodles-Chopsticks.webp";
    }
  }

  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <View style={{ marginVertical: 5, marginRight: 15 }}>
        {/* <FontAwesome name="user-circle" size={39} color={"gray"} /> */}
        <Image
          source={getProfilePicture(props.username)}
          style={{ height: 45, width: 45, borderRadius: "50%" }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{props.username}</Text>
        <Text style={{ marginVertical: 10, marginRight: 0 }}>
          {props.commentMessage}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Pressable style={{}}>
            <Text style={{ color: "gray" }}>Reply</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          {props.replies && props.replies.length > 0 && (
            <Pressable
              style={{ marginTop: 10, marginBottom: 5, marginLeft: 20 }}
              onPress={() => {
                setRepliesVisibility(
                  (previousRepliesVisibility) => !previousRepliesVisibility
                );
              }}
            >
              <Text style={{ color: "gray" }}>
                {repliesVisibility ? "Hide all replies" : "View all replies"}
              </Text>
            </Pressable>
          )}
        </View>
        <View>
          {props.replies &&
            props.replies.length > 0 &&
            repliesVisibility &&
            props.replies.map((reply, index) => (
              <Comment
                key={index}
                username={reply.username}
                commentMessage={reply.commentMessage}
                replies={reply.replies}
              />
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  testBorder: {
    borderColor: "blue",
    borderWidth: 1,
  },
});
