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
  Animated,
  Dimensions,
  Modal,
  PanResponder,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import YourPostHeader from "@/components/ui/YourPostHeader";
import { LinearGradient } from "expo-linear-gradient";
import { defaultUser, Item, Post, User } from "@/types";
import { Comment } from "@/components/Comment";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import Shimmer from "@/components/ui/Shimmer";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import LoadingScreen from "./Landing";

type IconProps = {
  imgStyle: any;
  imgUrl: string;
};

type PostProps = {
  post: Item;
  author: User;
};

type PostDateAndLocationProps = {
  post: Item;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SkeletonPostImage = () => (
  <View style={styles.imagePost}>
    <Shimmer style={{ width: "100%", height: 370 }} />
  </View>
);

const YourPost: React.FC<Item> = (item) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  const [post, setPost] = useState<Item>(item);

  // Get params from the URL
  const params = useLocalSearchParams();
  const { id, currentUserId } = params;

  // Fetch current user and check if they're the author
  useEffect(() => {
    async function getCurrentUser() {
      const currentUserId = await AsyncStorage.getItem("userId");
      const isCurrentUserAuthor = currentUserId === item.reporter_id;
      setIsCurrentUserAuthor(isCurrentUserAuthor);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 2 second delay
    }
    getCurrentUser();
  }, [item]);

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
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={30}
    >
      <YourPostHeader isCurrentUserAuthor={isCurrentUserAuthor} />
      <ScrollView>
        <PostTop
          post={post}
          author={item.reporter}
          isCurrentUserAuthor={isCurrentUserAuthor}
          setPost={setPost}
        />
        <PostDateAndLocation post={post} />
        <PostImage {...post} />
        <PostFooter {...post} />
        <Divider width={5} orientation="horizontal" color="#D7C9C2" />

        {/* Comments Section */}
        <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
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
const PostTop: React.FC<
  PostProps & {
    isCurrentUserAuthor: boolean;
    setPost: React.Dispatch<React.SetStateAction<Item>>;
  }
> = ({ post, author, isCurrentUserAuthor, setPost }) => {
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
  const screenHeight = Dimensions.get("window").height;

  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const slideUp = () => {
    setModalVisible(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      // easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 200,
      // easing: Easing.in(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const openModal = () => {
    setModalVisible(true);
    slideUp();
    fadeIn();
  };

  const closeModal = () => {
    slideDown();
    fadeOut();
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        } else if (gestureState.dy < 0 && gestureState.dy > -10) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease(e, gestureState) {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const markItemAsFound = () => {
    const sendFoundRequest = async () => {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/${post.item_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Claimed",
        }),
      });
    };
    setPost((old) => ({ ...old, status: "Claimed" }));
    sendFoundRequest();
  };

  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            router.push({
              pathname: "/UsersProfile",
              params: {
                userId: JSON.parse(JSON.stringify(author.user_id)),
              },
            })
          }
        >
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
        </Pressable>
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
      <Pressable onPress={() => openModal()}>
        <Text style={{ color: "black", fontWeight: "900", marginRight: 20 }}>
          ...
        </Text>
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            opacity: fadeAnim,
            backgroundColor: "#000000AA",
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={closeModal}></Pressable>
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              borderRadius: 20,
              height: "80%",
              transform: [{ translateY: slideAnim }],
              marginTop: "auto",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
            }}
          >
            {isCurrentUserAuthor ? (
              // Content for post owner
              <View style={{ height: 100, width: 100 }}>
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    closeModal();
                    markItemAsFound();
                  }}
                >
                  <AntDesign name="checkcircle" size={90} color={"#f27c1b"} />
                </Pressable>
              </View>
            ) : (
              // Empty or different content for non-owners
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Options not available for this post
                </Text>
              </View>
            )}
            <View
              style={{
                height: 30,
                backgroundColor: "#f27c1b",
                borderRadius: 10,
                width: 80,
              }}
            >
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => closeModal()}
              >
                <Text>Close</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
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

const PostDateAndLocation: React.FC<PostDateAndLocationProps> = ({ post }) => (
  <View style={styles.dateLocation}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <View
        key={`status-${post.status}`}
        style={{
          backgroundColor:
            post.status === "Lost"
              ? "#CB3131"
              : post.status === "Found"
              ? "#419D44"
              : "#914CFF",
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginLeft: 10,
          marginRight: 15,
          borderRadius: 20,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
          {post.status}
        </Text>
      </View>
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
// const PostImageSkeleton = () => (
//   <View style={styles.imagePost}>
//     <Shimmer style={{ width: "100%", height: 370 }} />
//   </View>
// );

const PostImage = (item: Item) => {
  return item.image_url ? (
    <View style={styles.imagePost}>
      <Image
        source={{ uri: item.image_url }}
        style={{
          width: "100%",
          height: 370,
        }}
      />
    </View>
  ) : (
    <View></View>
  );
};

const Caption: React.FC<Item> = (post: Item) => (
  <View>
    <Text
      style={{
        fontSize: 15,
        paddingVertical: 10,
        paddingLeft: 20,
        color: "#444",
        marginBottom: 5,
      }}
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
