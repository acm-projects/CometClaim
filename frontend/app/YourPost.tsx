import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import YourPostHeader from "@/components/ui/YourPostHeader";
import { LinearGradient } from "expo-linear-gradient";
import { defaultUser, Item, Post, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IconProps = {
  imgStyle: any;
  imgUrl: string;
}

type PostProps = {
  post: Item;
  author: User;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const YourPost: React.FC<Item> = (item) => {

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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <YourPostHeader />
      <ScrollView>
        <PostTop post={item} author={item.reporter} />
        <PostDateAndLocation {...item} />
        <PostImage {...item} />
        <PostFooter {...item} />
      </ScrollView>
    </View>
  );
};
const PostTop: React.FC<PostProps> = ({post, author}) => {

  function datetimeToHowLongAgo(datetime: string) {
    const timeDifferenceInMilliseconds = Date.now() - Date.parse(datetime)
    
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000)
    if(timeDifferenceInSeconds < 60) return `${timeDifferenceInSeconds}s`
    
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60)
    if(timeDifferenceInMinutes < 60) return `${timeDifferenceInMinutes}m`

    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60)
    if(timeDifferenceInHours < 24) return `${timeDifferenceInHours}h`

    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24)
    if(timeDifferenceInDays < 31) return `${timeDifferenceInDays}d`

    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 31)
    if(timeDifferenceInMonths < 12) return `${timeDifferenceInMonths}mo`

    const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12)
    return `${timeDifferenceInYears}y`
  }

  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: author.profile_picture || defaultUser.profile_picture }} style={styles.story} />
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
        {(new Date(post.date_reported)).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
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
      >
        ECSS 2.410
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
