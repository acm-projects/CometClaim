import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
// import { Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { PostType } from "@/data/posts"; // Import the PostType
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

interface PostProps {
  post: PostType;
  onShare?: () => void;
}
interface IconProps {
  imgStyle: any;
  imgUrl: string;
}

interface Item {
  item_id: string;
  category: string;
  date_reported: string;
  description: string;
  location: string;
  reporter_id: string;
  status: string;
  image_url?: string;
}

const Post: React.FC<PostProps> = ({ post, onShare }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`${apiUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setItems(JSON.parse(data.body));
      console.log(data);
    };
    getItems();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <View style={styles.backPost}>
        <PostHeader post={post} />
        <PostDateAndLocation />
        {/* <PostImage post={post} /> */}
        {items.length > 0 && <PostImage post={post} item={items[0]} />}
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <PostFooter post={post} onShare={onShare} />
        </View>
      </View>
    </View>
  );
};

const PostHeader: React.FC<PostProps> = ({ post }) => {
  const handleDropdownTriggerPress = (key: string) => {
    console.log("dd trigger pressed: ", key);
  };
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
      <Pressable>
        <Text style={{ color: "black", fontWeight: "900", marginRight: 20 }}>
          ...
        </Text>
      </Pressable>
      {/* <DropdownComponent /> */}
    </View>
  );
};

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

const PostImage: React.FC<{ post: PostType; item: Item }> = ({
  post,
  item,
}) => (
  <View style={styles.imagePost}>
    {/* <Image
      source={{ uri: post.imageUrl }}
      style={{
        width: 370,
        height: 370,
        borderRadius: 15,
      }}
    /> */}
    {item.image_url && (
      <Image
        source={{ uri: item.image_url }}
        style={{
          width: 370,
          height: 370,
          borderRadius: 15,
        }}
        alt="TESTING"
      />
    )}
  </View>
);

const PostFooter: React.FC<PostProps> = ({ post, onShare }) => (
  <View>
    <Caption post={post} />
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
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
        onPress={() => router.push("/CommentScreen")}
      >
        <FontAwesome name="comment-o" size={20} color="#666" />
        <Text> </Text>
        <Text style={styles.actionText}>Comment</Text>
      </Pressable>

      <Pressable style={styles.rightFooterIconsContainer} onPress={onShare}>
        <FontAwesome name="share" size={20} color="#666" />
        <Text> </Text>
        <Text style={styles.actionText}>Share</Text>
      </Pressable>
    </View>
  </View>
);

const Icon: React.FC<IconProps> = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Caption: React.FC<PostProps> = ({ post }) => (
  <View>
    <Text style={{ fontSize: 16, paddingBottom: 5, paddingLeft: 20 }}>
      {post.caption}
    </Text>
  </View>
);

export default Post;

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
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 10,
    flexGrow: 1, // Allows the container to expand
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
