import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { PostType } from "@/data/posts";
import { POSTS } from "@/data/posts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

interface PostProps {
  post: PostType;
}
interface IconProps {
  imgStyle: any;
  imgUrl: string;
}

const seePost: React.FC<PostProps> = ({ post }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <LinearGradient
        colors={["#FFDCB5", "#FC5E1A"]}
        start={{ x: 0.5, y: 1.5 }}
        end={{ x: 0.5, y: 0 }}
      >
        <SafeAreaView style={styles.headerContainer}>
          <Pressable
            style={{ position: "absolute", left: 0 }}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={32} color="white" />
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Post
          </Text>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView>
        <PostTop post={POSTS[0]} />
        <PostDateAndLocation />
        <PostImage post={POSTS[0]} />
        <PostFooter post={POSTS[0]} />
      </ScrollView>
    </View>
  );
};
const PostTop: React.FC<PostProps> = ({ post }) => {
  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text
          style={{
            color: "black",
            marginLeft: 5,
            fontWeight: "500",
          }}
        >
          {post.user}
        </Text>
        <Text
          style={{
            color: "black",
            marginLeft: 15,
            fontWeight: "400",
          }}
        >
          {post.time}
        </Text>
      </View>
      <Text
        style={{
          color: "black",
          fontWeight: "900",
          marginRight: 20,
          marginBottom: 5,
        }}
      >
        ...
      </Text>
    </View>
  );
};

const Icon: React.FC<IconProps> = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const PostDateLocationIcon = [
  {
    name: "Calendar",
    imageUrl: "https://img.icons8.com/ios/50/calendar--v1.png",
  },
  {
    name: "Location",
    imageUrl: "https://img.icons8.com/ios/50/place-marker--v1.png",
  },
];

const PostDateAndLocation: React.FC = () => (
  <View style={styles.dateLocation}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <Icon
        imgStyle={styles.dateLocationIcon}
        imgUrl={PostDateLocationIcon[0].imageUrl}
      />
      <Text
        style={{
          fontSize: 13,
          color: "#666",
          fontWeight: "500",
          marginLeft: 20,
        }}
      >
        Friday, Oct 25 2025
      </Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
      <Icon
        imgStyle={styles.dateLocationIcon}
        imgUrl={PostDateLocationIcon[1].imageUrl}
      />
      <Text
        style={{
          fontSize: 13,
          color: "#666",
          fontWeight: "500",
          marginLeft: 20,
        }}
      >
        ECSS 2.410
      </Text>
    </View>
  </View>
);

const PostImage: React.FC<PostProps> = ({ post }) => (
  <View style={styles.imagePost}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{
        width: "100%",
        height: 370,
      }}
    />
  </View>
);

const Caption: React.FC<PostProps> = ({ post }) => (
  <View>
    <Text
      style={{ fontSize: 16, paddingBottom: 5, paddingLeft: 20, marginTop: 10 }}
    >
      {post.caption}
    </Text>
  </View>
);

const PostFooter: React.FC<PostProps> = ({ post }) => (
  <View>
    <Caption post={post} />
  </View>
);

export default seePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  headerView: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  dateLocation: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateLocationIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
  imagePost: {
    width: "100%",
    height: 375,
    resizeMode: "cover",
    alignSelf: "center",
  },
  headerContainer: {
    marginTop: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 40,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "center",
  },
});
