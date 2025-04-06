import {
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
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
  const navigation = useNavigation();
  
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

  // const handleNavigation = () => {
  //   // navigation.navigate("EditProfile");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Link href={"/EditProfile" as RelativePathString} asChild>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/external-edit-social-media-ui-tanah-basah-glyph-tanah-basah.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Image
            source={{
              uri: userInfo.profile_picture ? userInfo.profile_picture : defaultUser.profile_picture,
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
          <Text>{userInfo.username}</Text>
          <Text
            style={{ fontSize: 18, margin: 1, marginTop: 5, marginBottom: 5 }}
          >
            {userInfo.full_name}
          </Text>
        </View>
        <Divider width={1} orientation="vertical" />
        <View style={{ flexDirection: "column", margin: 15 }}>
          <Text style={styles.textInfo}>Phone: {userInfo.phone_number}</Text>
          <Text style={styles.textInfo}>
            Email: {userInfo.email}
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
          <ScrollView
            horizontal
            style={{
              flexDirection: "row",
            }}
          >
            {userInfo.posts && userInfo.posts.map((post: Post, index: number) => (
              <SmallPost {...post} key={index} />
            ))}
          </ScrollView>
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
