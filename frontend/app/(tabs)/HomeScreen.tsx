import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/ui/Header";
import Post from "@/components/ui/Post";
import { POSTS, PostType } from "@/data/posts";
import ShareScreen from "@/components/ui/ShareScreen"; // <- extract this into its own component

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const openShareModal = (post: PostType) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeShareModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#FFDCB5", "#FC5E1A"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 0 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
          {POSTS.map((post: PostType, index: number) => (
            <Post
              post={post}
              key={index}
              onShare={() => openShareModal(post)}
            />
          ))}
        </ScrollView>
        <Modal transparent={true} visible={modalVisible}>
          <ShareScreen post={selectedPost} onClose={closeShareModal} />
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    // backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 120,
  },
  // link: {
  //   color: "white",
  //   fontSize: 42,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   textDecorationLine: "underline",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   padding: 4,
  // },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
});
