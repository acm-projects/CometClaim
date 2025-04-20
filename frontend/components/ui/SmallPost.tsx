import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { RelativePathString, router } from "expo-router";
import { Image } from "expo-image";
import { defaultUser, Post, User } from "@/types";

interface PostProps {
  post: Post;
  author: User;
}
// interface IconProps {
//   imgStyle: any;
//   imgUrl: string;
// }

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SmallPost: React.FC<Post> = (post) => {
  // const [postAuthor, setPostAuthor] = useState<User>(defaultUser)

  // useEffect(() => {
  //   async function getPostAuthor() {
  //     const res = await fetch(`${apiUrl}/users/${post.reporter_id}`)
  //     const data = await res.json()
  //     setPostAuthor(data)
  //   }
  //   getPostAuthor()
  // }, [])

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={styles.backPost}
        onPress={() =>
          router.push(`/posts/${post.item.item_id}` as RelativePathString)
        }
      >
        <PostHeader post={post} author={post.user} />
        <PostImage post={post} author={post.user} />
        <PostFooter post={post} author={post.user} />
      </TouchableOpacity>
    </View>
  );
};

const PostHeader: React.FC<PostProps> = ({ post, author }) => {
  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: author.profile_picture }} style={styles.story} />
        <Text
          style={{
            color: "black",
            marginLeft: 5,
            fontWeight: "400",
          }}
        >
          {author.username}
        </Text>
      </View>
    </View>
  );
};

const PostImage: React.FC<PostProps> = ({ post }) => (
  <View style={styles.imagePost}>
    <Image
      source={{ uri: post.item.image_url }}
      style={{
        width: 170,
        aspectRatio: 1,
        borderRadius: 10,
      }}
    />
  </View>
);

const PostFooter: React.FC<PostProps> = ({ post }) => (
  <View>
    <Caption {...post} />
  </View>
);

const Caption: React.FC<Post> = (post) => (
  <View>
    <Text style={{ fontSize: 13, margin: 10 }}>{post.item.description}</Text>
  </View>
);

export default SmallPost;
const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  story: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  imagePost: {
    // width: "100%",
    // // aspectRatio: 1,
    alignItems: "center",
  },
  backPost: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 10,
    width: 190,
    // flexGrow: 1, // Allows the container to expand
  },
});
