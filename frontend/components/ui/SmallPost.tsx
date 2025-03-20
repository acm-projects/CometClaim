import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { PostType } from "@/data/posts"; // Import the PostType

interface PostProps {
  post: PostType;
}
// interface IconProps {
//   imgStyle: any;
//   imgUrl: string;
// }

const SmallPost: React.FC<PostProps> = ({ post }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity style={styles.backPost}>
        <PostHeader post={post} />
        <PostImage post={post} />
        <PostFooter post={post} />
      </TouchableOpacity>
    </View>
  );
};

const PostHeader: React.FC<PostProps> = ({ post }) => {
  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text
          style={{
            color: "black",
            marginLeft: 5,
            fontWeight: "400",
          }}
        >
          {post.user}
        </Text>
      </View>
    </View>
  );
};

const PostImage: React.FC<PostProps> = ({ post }) => (
  <View style={styles.imagePost}>
    <Image
      source={{ uri: post.imageUrl }}
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
    <Caption post={post} />
  </View>
);

const Caption: React.FC<PostProps> = ({ post }) => (
  <View>
    <Text style={{ fontSize: 13, margin: 10 }}>{post.caption}</Text>
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
    flexGrow: 1, // Allows the container to expand
  },
});
