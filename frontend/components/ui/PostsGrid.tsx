//PostsGrid.tsx

"use client";

import type React from "react";
import { useState, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { router, RelativePathString } from "expo-router";
import { Item, Post } from "@/types";

interface PostsGridProps {
  posts: Post[];
  title?: string;
  ListHeaderComponent?: ReactNode;
}

const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  title = "Posts",
  ListHeaderComponent,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "found" | "lost">("all");

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.item.status.toLowerCase() === activeTab);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() =>
        router.push({
          // pathname: "/YourPost",
          // params: { id: item.item_id },
          pathname: `/posts/${item.item_id}` as RelativePathString,
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
      {item.status.toLowerCase() === "found" && (
        <View style={[styles.postBadge, styles.foundBadge]}>
          <Text style={styles.badgeText}>Found</Text>
        </View>
      )}
      {item.status.toLowerCase() === "lost" && (
        <View style={[styles.postBadge, styles.lostBadge]}>
          <Text style={styles.badgeText}>Lost</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Create a custom header that combines the provided ListHeaderComponent with our tabs
  const HeaderComponent = () => (
    <>
      {/* Include the provided ListHeaderComponent (avatar, stats, etc.) */}
      {ListHeaderComponent}

      {/* Our custom container with title and tabs */}
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
      </View>
    </>
  );

  // Combine our content container with EmptyComponent
  const EmptyComponent = () => (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No {activeTab} posts yet</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredPosts.map((post) => post.item)}
      renderItem={renderItem}
      keyExtractor={(item) => item.item_id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={HeaderComponent}
      ListEmptyComponent={EmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listContainer: {
    paddingBottom: 30,
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
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
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
});

export default PostsGrid;
