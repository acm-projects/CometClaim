// Post.tsx
import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";

type PostProps = {
  item: Item;
  onShare: () => void;
};

type PostHeaderProps = {
  user: User;
  item: Item;
  datetime: string;
};

type PostDateAndLocationProps = {
  status: string;
  datetime: string;
  location: string;
};

type PostImageProps = {
  image_url?: string;
};

type PostFooterProps = {
  description: string;
  onShare: () => void;
};

type IconProps = {
  imgStyle: any;
  imgUrl: string;
};

type CaptionProps = {
  caption: string;
};

export type Item = {
  item_id: string;
  category: string;
  date_reported: string;
  description: string;
  location: string;
  reporter_id: string;
  status: string;
  image_url?: string;
};

export type User = {
  user_id: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  user_profile_picture: string;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const defaultUser: User = {
  user_id: "123",
  user_email: "default@example.com",
  user_name: "default",
  user_phone: "000-000-0000",
  user_profile_picture:
    "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
};

export function Post(props: PostProps) {
  const [user, setUser] = useState<any>(defaultUser);

  useEffect(() => {
    async function getUserData() {
      const res = await fetch(`${apiUrl}/users/${props.item.reporter_id}`);
      const data = await res.json();
      if (data.body) {
        setUser(JSON.parse(data.body));
      }
    }
    getUserData();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <Pressable
        style={styles.backPost}
        onPress={() => router.push("/seePost")}
      >
        <PostHeader
          datetime={props.item.date_reported}
          user={user}
          item={props.item}
        />
        <PostDateAndLocation
          status={props.item.status}
          datetime={props.item.date_reported}
          location={props.item.location}
        />
        {/* <PostImage post={post} /> */}
        <PostImage image_url={props.item.image_url} />
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <PostFooter
            description={props.item.description}
            onShare={props.onShare}
          />
        </View>
      </Pressable>
    </View>
  );
}

function PostHeader(props: PostHeaderProps) {
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
      await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/items/${props.item.item_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "found",
          }),
        }
      );
    };
    sendFoundRequest();
  };

  const handleDropdownTriggerPress = (key: string) => {
    console.log("dd trigger pressed: ", key);
  };

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
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            router.push({
              pathname: "/UsersProfile",
              params: { userId: props.user.user_id },
            })
          }
        >
          <Image
            source={{ uri: props.user.user_profile_picture }}
            style={styles.story}
          />
          <Text
            style={{
              color: "black",
              marginLeft: 5,
              fontWeight: "500",
            }}
          >
            {props.user.user_name}
          </Text>
        </Pressable>
        <Text
          style={{
            color: "black",
            marginLeft: 15,
            fontWeight: "400",
          }}
        >
          {datetimeToHowLongAgo(props.datetime)}
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
            <View style={{ height: 100, width: 100 }}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  markItemAsFound();
                }}
              >
                <AntDesign name="checkcircle" size={90} color={"#f27c1b"} />
              </Pressable>
            </View>
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
}

function PostDateAndLocation(props: PostDateAndLocationProps) {
  const getDateString = (datetime: string) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const postDate = new Date(props.datetime);

    return postDate.toLocaleDateString("en-US", dateOptions);
  };

  return (
    <View style={styles.dateLocation}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <View
          style={{
            backgroundColor: props.status === "lost" ? "#CB3131" : "#419D44",
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginLeft: 10,
            marginRight: 15,
            borderRadius: 20,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
            {props.status === "lost" ? "Lost" : "Found"}
          </Text>
        </View>
        <Icon
          imgStyle={styles.dateLocationIcon}
          imgUrl={"https://img.icons8.com/ios/50/calendar--v1.png"}
        />
        <Text
          style={{
            fontSize: 13,
            color: "#666",
            fontWeight: "500",
            marginLeft: 20,
          }}
        >
          {getDateString(props.datetime)}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Icon
          imgStyle={styles.dateLocationIcon}
          imgUrl={"https://img.icons8.com/ios/50/place-marker--v1.png"}
        />
        <Text
          style={{
            fontSize: 13,
            color: "#666",
            fontWeight: "500",
            marginLeft: 20,
          }}
        >
          {props.location}
        </Text>
      </View>
    </View>
  );
}

function PostImage(props: PostImageProps) {
  return (
    <View style={styles.imagePost}>
      <Image
        source={{
          uri: props.image_url
            ? props.image_url
            : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
        }}
        style={{
          width: 370,
          height: 370,
          borderRadius: 15,
        }}
        alt="TESTING"
      />
    </View>
  );
}

function PostFooter(props: PostFooterProps) {
  return (
    <View>
      <Caption caption={props.description} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <LinearGradient
          colors={["#FFDCB5", "#FC5E1A", "#FFDCB5"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientLine]}
        />
      </View>
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.leftFooterIconsContainer}
          onPress={() => router.push("/commentsScreen")}
        >
          <FontAwesome name="comment-o" size={20} color="#666" />
          <Text> </Text>
          <Text style={styles.actionText}>Comment</Text>
        </Pressable>

        <Pressable
          style={styles.rightFooterIconsContainer}
          onPress={props.onShare}
        >
          <FontAwesome name="share" size={20} color="#666" />
          <Text> </Text>
          <Text style={styles.actionText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Icon(props: IconProps) {
  return (
    <TouchableOpacity>
      <Image style={props.imgStyle} source={{ uri: props.imgUrl }} />
    </TouchableOpacity>
  );
}

function Caption(props: CaptionProps) {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingBottom: 5, paddingLeft: 20 }}>
        {props.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  backPost: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 10,
    flexGrow: 1, // Allows the container to expand
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  imagePost: {
    width: 370,
    height: 375,
    resizeMode: "cover",
    alignSelf: "center",
  },
  footerIcon: {
    width: 32,
    height: 33,
    marginLeft: 10,
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#eee",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  leftFooterIconsContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  rightFooterIconsContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  gradientLine: {
    width: "90%",
    height: 1,
  },
});
