import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import YourPostHeader from "@/components/ui/YourPostHeader";
import { LinearGradient } from "expo-linear-gradient";
import { defaultUser, Item, Post, User } from "@/types";
import { Comment } from "@/components/Comment";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";
import Shimmer from "@/components/ui/Shimmer";
import { Image } from "expo-image";

type IconProps = {
  imgStyle: any;
  imgUrl: string;
};

type PostProps = {
  post: Item;
  author: User;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SkeletonPostImage = () => (
  <View style={styles.imagePost}>
    <Shimmer style={{ width: "100%", height: 370 }} />
  </View>
);

const YourPost: React.FC<Item> = (item) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [comments, setComments] = useState([]);
  //
  // useEffect(() => {
  //   async function fetchComments() {
  //     try {
  //       const res = await fetch(`${apiUrl}/items/${item.item_id}/comments`);
  //       const data = await res.json();
  //       setComments(JSON.parse(data.body));
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   }
  //   fetchComments();
  // }, [item.item_id]);

  const handleSubmitComment = () => {
    // const postComment = async () => {
    //   try {
    //     await fetch(`${apiUrl}/items/${item.item_id}/comments`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         text: comment,
    //         // Add user ID or other required fields
    //       }),
    //     });
    //     // Refresh comments
    //     fetchComments();
    //   } catch (error) {
    //     console.error("Error posting comment:", error);
    //   }
    // };
    // postComment();

    if (comment.trim() === "") return;
    setComment("");
  };
  // const [postAuthor, setPostAuthor] = useState<User>(defaultUser)

  // useEffect(() => {
  //   async function getPostAuthor() {
  //     const res = await fetch(`${apiUrl}/users/${post.user}`)
  //     const data = await res.json()
  //     setPostAuthor(JSON.parse(data.body))
  //   }
  //   getPostAuthor()
  // }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <YourPostHeader />
      <ScrollView>
        {isLoading ? (
          <>
            <SkeletonPostImage />
          </>
        ) : (
          <>
            <PostTop post={item} author={item.reporter} />
            <PostDateAndLocation {...item} />
            <PostImage {...item} />
            <PostFooter {...item} />
            <Divider width={1} orientation="vertical" />

            {/* Comments Section */}
            <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}
              >
                Comments
              </Text>

              {/* Sample comments - replace with real data when available */}
              <Comment
                username="Neeha"
                commentMessage="I found this item at the ECSS around 7 PM coming into class "
                replies={[
                  {
                    username: "Mohammad",
                    commentMessage: "Thank you for finding it!",
                  },
                  {
                    username: "Jason",
                    commentMessage:
                      "@Neeha Can you provide more details about where exactly?",
                  },
                ]}
              />
              <Comment
                username="Tien"
                commentMessage="I think I saw someone looking for this earlier today"
              />

              {/* Map real comments when you have them */}
              {/* {comments.map((comment) => (
            <Comment
              key={comment.id}
              username={comment.author.username}
              commentMessage={comment.text}
              replies={comment.replies}
            />
          ))} */}
            </View>
          </>
        )}
      </ScrollView>

      {/* Comment input section */}
      <View>
        <LinearGradient
          colors={["#B474DA1B", "#E61D7B", "#B474DA1B"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 1, width: "100%" }}
        >
          <View style={{ height: "100%" }}></View>
        </LinearGradient>

        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable>
              <Feather name="camera" size={28} color="#4D4D4D" />
            </Pressable>
            <TextInput
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
              style={{
                flex: 1,
                borderColor: "lightgray",
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 10,
                height: 40,
                padding: 10,
              }}
              placeholderTextColor="#9A9A9A"
            />
            <Pressable onPress={handleSubmitComment}>
              <Ionicons
                name="paper-plane-outline"
                size={28}
                color={comment.trim() ? "#FC5E1A" : "#4D4D4D"}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const PostTop: React.FC<PostProps> = ({ post, author }) => {
  function datetimeToHowLongAgo(datetime: string) {
    const timeDifferenceInMilliseconds = Date.now() - Date.parse(datetime);

    const timeDifferenceInSeconds = Math.floor(
      timeDifferenceInMilliseconds / 1000
    );
    if (timeDifferenceInSeconds < 60) return `${timeDifferenceInSeconds}s`;

    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    if (timeDifferenceInMinutes < 60) return `${timeDifferenceInMinutes}m`;

    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    if (timeDifferenceInHours < 24) return `${timeDifferenceInHours}h`;

    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    if (timeDifferenceInDays < 31) return `${timeDifferenceInDays}d`;

    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 31);
    if (timeDifferenceInMonths < 12) return `${timeDifferenceInMonths}mo`;

    const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);
    return `${timeDifferenceInYears}y`;
  }

  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{
            uri: author.profile_picture || defaultUser.profile_picture,
          }}
          style={styles.story}
        />
        <Text
          style={{
            color: "black",
            marginLeft: 5,
            fontWeight: "500",
          }}
        >
          {author.username}
        </Text>
        <Text
          style={{
            color: "black",
            marginLeft: 15,
            fontWeight: "400",
          }}
        >
          {datetimeToHowLongAgo(post.date_reported)}
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

const PostDateAndLocation: React.FC<Item> = (post) => (
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
        {new Date(post.date_reported).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
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
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {post.location || "Location not provided"}
      </Text>
    </View>
  </View>
);

const PostImage: React.FC<Item> = (post) => (
  <View style={styles.imagePost}>
    <Image
      source={{ uri: post.image_url }}
      style={{
        width: "100%",
        height: 370,
      }}
    />
  </View>
);

const Caption: React.FC<Item> = (post: Item) => (
  <View>
    <Text
      style={{ fontSize: 16, paddingBottom: 5, paddingLeft: 20, marginTop: 10 }}
    >
      {post.description}
    </Text>
  </View>
);

const PostFooter: React.FC<Item> = (post) => (
  <View>
    <Caption {...post} />
  </View>
);

export default YourPost;

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
});
