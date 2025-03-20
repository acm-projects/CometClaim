import {
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import Header from "@/components/ui/Header";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import SmallPost from "@/components/ui/SmallPost";
import { POSTS, PostType } from "@/data/posts";

interface PostProps {
  post: PostType;
}

const ProfilePage: React.FC = () => {
  const navigation = useNavigation();

  // const handleNavigation = () => {
  //   // navigation.navigate("EditProfile");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/external-edit-social-media-ui-tanah-basah-glyph-tanah-basah.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
            style={{
              height: 170,
              width: 170,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: "white",
              marginTop: 15,
            }}
          />
        </View>
        <Divider width={1} orientation="vertical" />
        <View style={{ flexDirection: "column", margin: 15 }}>
          <Text>Username</Text>
          <Text
            style={{ fontSize: 18, margin: 1, marginTop: 5, marginBottom: 5 }}
          >
            Full Name
          </Text>
        </View>
        <Divider width={1} orientation="vertical" />
        <View style={{ flexDirection: "column", margin: 15 }}>
          <Text style={styles.textInfo}>Phone: (434) 423-7563</Text>
          <Text style={styles.textInfo}>
            Email: phantienduc17072005@gmail.com
          </Text>
          <Text style={styles.textInfo}>
            Location: 989 Loop Rd, Richardson, TX 75080
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#F5F5F5", width: "100%", height: "100%" }}
        >
          <Text
            style={{
              fontSize: 22,
              margin: 1,
              marginBlock: 5,
              textAlign: "center",
            }}
          >
            Posts
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {POSTS.map((post: PostType, index: number) => (
              <SmallPost post={post} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "center",
    marginRight: 20,
  },
  gradientLine: {
    width: "90%",
    height: 1,
  },
  textInfo: {
    fontSize: 15,
    margin: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});
