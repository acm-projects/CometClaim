// ProfilePage.tsx

"use client";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileStats from "@/components/ui/ProfileStats";
import ProfileInfo from "@/components/ui/ProfileInfo";
import PostsGrid from "@/components/ui/PostsGrid";
// import { USERPOSTS } from "@/data/userPosts";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import SmallPost from "@/components/ui/SmallPost";
import { Link, RelativePathString, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUser, Item, Post, User } from "@/types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const ProfilePage: React.FC = () => {
  const scrollY = useSharedValue(0);
  const [activeSection, setActiveSection] = useState<
    "posts" | "Found" | "Lost"
  >("posts");

  const [userData, setUserData] = useState<User>(defaultUser);
  const [userPosts, setUserPosts] = useState<Item[]>([]);

  useFocusEffect(
    useCallback(() => {
      const updateUserInfo = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const res = await fetch(`${apiUrl}/users/${userId}`);
        const data = await res.json();
        // console.log("thing", JSON.parse(data.body))
        // console.log("BLAHHH", data.body);
        setUserData(JSON.parse(data.body));

        const postsRes = await fetch(`${apiUrl}/items?userId=${userId}`);
        const postsData = await postsRes.json();
        const posts = JSON.parse(postsData.body);
        // const userPosts = posts.filter(
        //   (post: Item) => post.reporter_id === userId
        // );

        setUserPosts(posts);
      };

      updateUserInfo();
    }, [])
  );

  // User data - in a real app, this would come from a user context or API
  // const userData = {
  //   username: "johndoe",
  //   fullName: "John Doe",
  //   phone: "(434) 423-7563",
  //   email: "johndoe@example.com",
  //   location: "989 Loop Rd, Richardson, TX 75080",
  //   avatar:
  //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  // };

  // Stats - in a real app, these would be calculated from actual data

  const avatarStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.9],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  const handleStatsPress = (type: "posts" | "Found" | "Lost") => {
    setActiveSection(type);
  };

  // Create the profile header component to be passed to PostsGrid
  const ProfileHeader = () => (
    <View>
      <LinearGradient
        colors={[
          "#FC5E1A", // More opaque at top
          "rgba(252, 94, 26, 0.7)",
          "rgba(252, 94, 26, 0.3)",
          "rgba(252, 94, 26, 0.0)",
          "transparent", // Fade to transparent at the bottom
        ]}
      >
        {/* Edit button */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/EditProfile")}
          >
            <MaterialIcons name="edit" size={20} color="#FC5E1A" />
          </TouchableOpacity>
        </View>
        {/* Profile avatar and name */}
        <View style={styles.profileContainer}>
          <Animated.View style={[styles.avatarContainer, avatarStyle]}>
            <Image
              source={{ uri: userData.profile_picture }}
              style={styles.avatar}
            />
          </Animated.View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={styles.username}>@{userData.username}</Text>
            <Text style={styles.fullName}>{userData.full_name}</Text>
          </View>
        </View>
      </LinearGradient>
      {/* Profile stats */}
      <ProfileStats
        postsCount={stats.posts}
        foundCount={stats.found}
        lostCount={stats.lost}
        onPressStats={handleStatsPress}
      />

      {/* Profile info */}
      <ProfileInfo phone={userData.phone_number} email={userData.email} />
    </View>
  );

  const stats = {
    posts: userData.posts.length,
    found: userData.posts.filter((post: Item) => post.status === "Found")
      .length,
    lost: userData.posts.filter((post: Item) => post.status === "Lost").length,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <PostsGrid
        posts={
          activeSection === "posts"
            ? userPosts.map((item) => ({ item, user: userData } as Post))
            : userPosts
                .filter((post: Item) => post.status === activeSection)
                .map((item) => ({ item, user: userData } as Post))
        }
        title={
          activeSection === "posts"
            ? "All Posts"
            : activeSection === "Found"
            ? "Found Items"
            : "Lost Items"
        }
        ListHeaderComponent={ProfileHeader()}
      />
      <View style={{ height: 60 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  editButtonContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    // marginTop: 20,
  },
  avatarContainer: {
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginTop: 4,
  },
});

export default ProfilePage;
