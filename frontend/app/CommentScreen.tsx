import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { CommentType } from "@/data/comments"; // Import the PostType

interface CommentProps {
  item: CommentType;
}

const CommentScreen = () => {
  const renderItem: React.FC<CommentProps> = ({ item }) => {
    return <Text>{item.text}</Text>;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comments</Text>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    fontSize: 15,
  },
});
