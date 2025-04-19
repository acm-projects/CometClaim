// UsersProfile.tsx

"use client";

import type React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileStats from "@/components/ui/ProfileStats";
import ProfileInfo from "@/components/ui/ProfileInfo";
import PostsGrid from "@/components/ui/PostsGrid";
// import { USERPOSTS } from "@/data/userPosts";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { defaultUser, Item, Post, User } from "@/types";

type ItemProps = {
  item: Item;
};

// interface User {
//   user_id: string;
//   username: string;
//   full_name?: string;
//   email: string;
//   profile_picture?: string;
//   phone_number?: string;
//   posts?: any[];
//   comments?: any[];
//   location?: string;
// }

const API_URL = process.env.EXPO_PUBLIC_API_URL; // Replace with your actual API URL

const ProfilePage: React.FC = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const navigateToDM = (user: {
    id: string;
    name: string;
    avatar?: string;
  }) => {
    router.push({
      pathname: "/messages/[chat_id]",
      params: {
        chat_id: user.id,
        ids: [user.id],
        name: user.name,
        avatar: user.avatar || "",
      },
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fullData, setFullData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollY = useSharedValue(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User>(defaultUser);

  const [activeSection, setActiveSection] = useState<
    "posts" | "Found" | "Lost"
  >("posts");

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

  // Handler for the back button
  const handleBack = () => {
    router.back();
  };

  // Static header with back button
  const StaticHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <MaterialIcons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>User Profile</Text>
      <View style={styles.headerRightPlaceholder} />
    </View>
  );

  useEffect(() => {
    setIsLoading(true);
    const getUserData = async () => {
      try {
        if (userId) {
          // If userId is provided, fetch specific user
          const res = await fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = await res.json();
          const userData = JSON.parse(responseData.body);
          setCurrentUser(userData);
        } else {
          // If no userId, fetch all users and use the first one
          const res = await fetch(`${API_URL}/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = await res.json();
          const parsedUsers: User[] = JSON.parse(responseData.body);
          setData(parsedUsers);
          setFullData(parsedUsers);

          // Set the first user as the current user
          if (parsedUsers.length > 0) {
            setCurrentUser(parsedUsers[0]);
          }
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };
    getUserData();
  }, []);

  // Create the profile header component to be passed to PostsGrid
  const ProfileHeader = () => {
    if (!currentUser && isLoading) {
      return (
        <View style={{ marginTop: "15%", alignItems: "center" }}>
          <Text>Loading user profile...</Text>
        </View>
      );
    }

    // Stats - in a real app, these would be calculated from actual data
    const stats = {
      posts: currentUser?.posts?.length || 0,
      found:
        currentUser?.posts?.filter((post: Item) => post.status === "Found")
          .length || 0,
      lost:
        currentUser?.posts?.filter((post: Item) => post.status === "Lost")
          .length || 0,
    };
    return (
      <View style={{ marginTop: "15%" }}>
        {/* Profile avatar and name */}
        <View style={styles.profileContainer}>
          <Animated.View style={[styles.avatarContainer, avatarStyle]}>
            <Image
              source={{ uri: currentUser?.profile_picture }}
              style={styles.avatar}
            />
          </Animated.View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={styles.username}>
              @{currentUser?.username || "User"}
            </Text>
            <Text style={styles.fullName}>
              {currentUser?.full_name || currentUser?.username || "User"}
            </Text>
          </View>
        </View>

        {/* Profile stats */}
        <ProfileStats
          postsCount={stats.posts}
          foundCount={stats.found}
          lostCount={stats.lost}
          onPressStats={handleStatsPress}
        />

        {/* Profile message */}
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={() => {
            if (currentUser) {
              navigateToDM({
                id: currentUser.user_id,
                name: currentUser.username,
                avatar: currentUser.profile_picture || "",
              });
            }
          }}
        >
          <Text style={styles.sectionTitle}>Message</Text>
        </TouchableOpacity>

        {/* Profile info */}
        <ProfileInfo
          phone={currentUser?.phone_number || userData.phone_number}
          email={currentUser?.email || userData.email}
          // location={currentUser?.location || userData.location}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <StaticHeader />

      <PostsGrid
        posts={
          activeSection === "posts"
            ? currentUser?.posts?.map(
                (item) => ({ item, user: currentUser } as Post)
              ) || []
            : currentUser?.posts
                .filter((post: Item) => post.status === activeSection)
                .map((item) => ({ item, user: currentUser } as Post)) || []
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
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "11%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    marginTop: "8%",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  backButton: {
    marginTop: "8%",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightPlaceholder: {
    marginTop: "8%",
    width: 40, // Same width as backButton for balance
  },
  messageContainer: {
    backgroundColor: "#E4F5DE",
    borderWidth: 1.5,
    borderColor: "#A4D65E",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#102C09",
  },
});

export default ProfilePage;
