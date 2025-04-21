import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

interface CommentProps {
  username: string;
  commentMessage: string;
  replies?: CommentProps[];
}

export function Comment(props: CommentProps) {
  const [repliesVisibility, setRepliesVisibility] = useState(false);

  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <View style={{ marginVertical: 5, marginRight: 15 }}>
        <FontAwesome name="user-circle" size={39} color={"gray"} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 2, fontWeight: 500 }}>{props.username}</Text>
        <Text style={{ marginVertical: 5 }}>{props.commentMessage}</Text>
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
