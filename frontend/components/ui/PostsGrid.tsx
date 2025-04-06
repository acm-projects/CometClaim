"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import type { PostTypeUser } from "@/data/userPosts";

interface PostsGridProps {
  posts: PostTypeUser[];
  title?: string;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, title = "Posts" }) => {
  const [activeTab, setActiveTab] = useState<"all" | "found" | "lost">("all");

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.type === activeTab);

  const renderItem = ({
    item,
    index,
  }: {
    item: PostTypeUser;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() =>
        router.push({
          pathname: "/YourPost",
          params: { id: item.id },
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      {item.type === "found" && (
        <View style={[styles.postBadge, styles.foundBadge]}>
          <Text style={styles.badgeText}>Found</Text>
        </View>
      )}
      {item.type === "lost" && (
        <View style={[styles.postBadge, styles.lostBadge]}>
          <Text style={styles.badgeText}>Lost</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.activeTab]}
            onPress={() => setActiveTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "found" && styles.activeTab]}
            onPress={() => setActiveTab("found")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "found" && styles.activeTabText,
              ]}
            >
              Found
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "lost" && styles.activeTab]}
            onPress={() => setActiveTab("lost")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "lost" && styles.activeTabText,
              ]}
            >
              Lost
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredPosts.length > 0 ? (
        <FlatList
          data={filteredPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No {activeTab} posts yet</Text>
        </View>
      )}
    </View>
  );
};

// const { width } = Dimensions.get("window");
// // Adjust the item width calculation to ensure items fit properly
// // Add more padding and reduce the item width
// const itemWidth = (width - 64) / 2; // Increased horizontal padding

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#FC5E1A",
    fontWeight: "500",
  },
  gridContainer: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between", // Ensure even spacing between items
    marginBottom: 10, // Add vertical spacing between rows
  },
  postItem: {
    width: 170,
    height: 170,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  postOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
  },
  postTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  postBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  foundBadge: {
    backgroundColor: "#4CAF50",
  },
  lostBadge: {
    backgroundColor: "#F44336",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
});

export default PostsGrid;
