import { StyleSheet, Text, View } from "react-native";
import { USERS } from "./users";

export type PostType = {
  imageUrl: string;
  user: string;
  caption: string;
  profile_picture: string;
  time: string;
  comments: string[];
};

export const POSTS: PostType[] = [
  {
    imageUrl: "https://i.imgur.com/CI4Z9vc.jpeg",
    user: USERS[0].user,
    caption: "Apple - AirPods Max (USB-C) - Midnight",
    profile_picture: USERS[0].image,
    time: "1h",
    comments: [],
  },
  {
    imageUrl: "https://i.imgur.com/CI4Z9vc.jpeg",
    user: USERS[1].user,
    caption: "Apple - AirPods Max (USB-C) - Midnight",
    profile_picture: USERS[1].image,
    time: "3m",
    comments: [],
  },
];

const styles = StyleSheet.create({});
