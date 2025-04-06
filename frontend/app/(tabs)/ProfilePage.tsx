"use client";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileStats from "@/components/ui/ProfileStats";
import ProfileInfo from "@/components/ui/ProfileInfo";
import PostsGrid from "@/components/ui/PostsGrid";
import { USERPOSTS } from "@/data/userPosts";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import SmallPost from "@/components/ui/SmallPost";
import { Link, RelativePathString, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUser, Post, User } from "@/types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const ProfilePage: React.FC = () => {
  const scrollY = useSharedValue(0);
  const [activeSection, setActiveSection] = useState<
    "posts" | "found" | "lost"
  >("posts");
  
  const [userInfo, setUserInfo] = useState<User>(defaultUser)

  useFocusEffect(useCallback(() => {
    const updateUserInfo = async () => {
      const userId = await AsyncStorage.getItem('userId')
      const res = await fetch(`${apiUrl}/users/${userId}`)
      const data = await res.json()
      // console.log("thing", JSON.parse(data.body))
      setUserInfo(JSON.parse(data.body))  
    }
    updateUserInfo()
  }, []))

  // User data - in a real app, this would come from a user context or API
  const userData = {
    username: "johndoe",
    fullName: "John Doe",
    phone: "(434) 423-7563",
    email: "johndoe@example.com",
    location: "989 Loop Rd, Richardson, TX 75080",
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };

  // Stats - in a real app, these would be calculated from actual data
  const stats = {
    posts: USERPOSTS.length,
    found: USERPOSTS.filter((post) => post.type === "found").length,
    lost: USERPOSTS.filter((post) => post.type === "lost").length,
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

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

  const handleStatsPress = (type: "posts" | "found" | "lost") => {
    setActiveSection(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Edit button */}
      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/EditProfile")}
        >
          <MaterialIcons name="edit" size={20} color="#FC5E1A" />
        </TouchableOpacity>
      </View>

      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Profile avatar and name */}
        <View style={styles.profileContainer}>
          <Animated.View style={[styles.avatarContainer, avatarStyle]}>
            <Image source={{ uri: userInfo.profile_picture ? userInfo.profile_picture : defaultUser.profile_picture }} style={styles.avatar} />
          </Animated.View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={styles.username}>@{userInfo.username}</Text>
            <Text style={styles.fullName}>{userInfo.full_name}</Text>
          </View>
        </View>

        {/* Profile stats */}
        <ProfileStats
          postsCount={stats.posts}
          foundCount={stats.found}
          lostCount={stats.lost}
          onPressStats={handleStatsPress}
        />

        {/* Profile info */}
        <ProfileInfo
          phone={userData.phone}
          email={userData.email}
          location={userData.location}
        />

        {/* Posts grid */}
        <PostsGrid
          posts={
            activeSection === "posts"
              ? USERPOSTS
              : USERPOSTS.filter((post) => post.type === activeSection)
          }
          title={
            activeSection === "posts"
              ? "All Posts"
              : activeSection === "found"
              ? "Found Items"
              : "Lost Items"
          }
        />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 10,
  },
  editButtonContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
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
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
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
