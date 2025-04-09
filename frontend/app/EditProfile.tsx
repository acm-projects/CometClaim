import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import { useState } from "react";
import AWS from 'aws-sdk'

import * as ExpoImagePicker from 'expo-image-picker'
import ProfileHeader from "@/components/ui/ProfileHeader"; // Adjust the import path as necessary
import { defaultUser } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

AWS.config.update({
  region: 'us-east-1'
})

const cognitoIdp = new AWS.CognitoIdentityServiceProvider()

export type UserProfileInfo = {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_picture: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL


const EditProfile: React.FC = () => {

  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo>({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    profile_picture: ""
  })

  useEffect(() => {
    async function getUserInfo() {
      const userId = await AsyncStorage.getItem('userId')
      const res = await fetch(`${apiUrl}/users/${userId}`)
      const data = await res.json()
      setUserProfileInfo(JSON.parse(data.body) as UserProfileInfo)
      console.log("test")
    }
    getUserInfo()
  }, [])
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <LinearGradient
        style={styles.container}
        colors={["#FFDCB5", "#FC5E1A"]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 0 }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
          >
            <ProfileHeader {...userProfileInfo}/>
            <View style={{ flex: 1, width: "100%" }}>
              <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                <Divider width={1} orientation="vertical" />
                <ProfileImage 
                  userProfileInfo={userProfileInfo}
                  setUserProfileInfo={setUserProfileInfo} 
                />
                <Divider width={1} orientation="vertical" />
                <PersonalInfo 
                  userProfileInfo={userProfileInfo}
                  setUserProfileInfo={setUserProfileInfo} 
                />
                <Divider width={1} orientation="vertical" />
                <ContactInfo 
                  userProfileInfo={userProfileInfo}
                  setUserProfileInfo={setUserProfileInfo} 
                />
                {/* <Divider width={1} orientation="vertical" />
                <OtherInfo 
                  userProfileInfo={userProfileInfo}
                  setUserProfileInfo={setUserProfileInfo} 
                /> */}
              </ScrollView>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const ProfileImage = ({userProfileInfo, setUserProfileInfo}: EditProfileSubcomponentProps) => {

  const selectImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserProfileInfo({...userProfileInfo, profile_picture: result.assets[0].uri});
    }
  };

  const takePhoto = async () => {
    let cameraPermissions = await ExpoImagePicker.getCameraPermissionsAsync();
    console.log(cameraPermissions);
    if (!cameraPermissions.granted) {
      cameraPermissions = await ExpoImagePicker.requestCameraPermissionsAsync();
    }

    console.log(cameraPermissions);

    if (cameraPermissions.granted) {
      let result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        cameraType: ExpoImagePicker.CameraType.back,
      });

      console.log(result);

      if (!result.canceled) {
        console.log("BLASH: " + result.assets[0].uri);
        setUserProfileInfo({...userProfileInfo, profile_picture: result.assets[0].uri});
      }
      // console.log("imageeeeee: " + image)
    } else {
      console.log("camera permissions were denied");
    }
  };

  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Image
        source={{
          uri: userProfileInfo.profile_picture || defaultUser.profile_picture,
        }}
        style={{
          height: 140,
          width: 140,
          borderRadius: 85,
          borderWidth: 2,
          borderColor: "white",
          marginTop: 15,
          marginBottom: 15,
          alignItems: "center",
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#FC5E1A",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            margin: 8,
          }}
          onPress={selectImage}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Select Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#FC5E1A",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            margin: 8,
          }}
          onPress={takePhoto}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PersonalInfo = ({userProfileInfo, setUserProfileInfo}: EditProfileSubcomponentProps) => {
  
  return (
    <View style={{ flexDirection: "column", margin: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
        Personal Information
      </Text>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full Name"
          placeholderTextColor="#888888"
          value={userProfileInfo.full_name}
          onChangeText={(text) => setUserProfileInfo(profile => ({...profile, full_name: text}))}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#888888"
          value={userProfileInfo.username}
          onChangeText={(text) => setUserProfileInfo(profile => ({...profile, username: text}))}
        />
      </View>
    </View>
  );
};

const ContactInfo = ({userProfileInfo, setUserProfileInfo}: EditProfileSubcomponentProps) => {
  
  return (
    <View style={{ flexDirection: "column", margin: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
        Contact Information
      </Text>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#888888"
          value={userProfileInfo.email}
          onChangeText={(text) => setUserProfileInfo(profile => ({...profile, email: text}))}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888888"
          value={userProfileInfo.phone_number}
          onChangeText={(text) => setUserProfileInfo(profile => ({...profile, phone_number: text}))}
        />
      </View>
    </View>
  );
};

// const OtherInfo = ({userProfileInfo, setUserProfileInfo}: EditProfileSubcomponentProps) => {
  
//   return (
//     <View style={{ flexDirection: "column", margin: 15 }}>
//       <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
//         Contact Information
//       </Text>
//       <View style={{ marginLeft: 15 }}>
//         <Text style={{ fontSize: 15, marginBottom: 5 }}>Net-ID/UTD-ID</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your Net-ID/UTD-ID"
//           placeholderTextColor="#888888"
//           value={userProfileInfo.netID}
//           onChangeText={(text) => setUserProfileInfo(profile => ({...profile, netID: text}))}
//         />
//       </View>
//       <View style={{ marginLeft: 15 }}>
//         <Text style={{ flexDirection: "row" }}>
//           <Text style={{ fontSize: 15, marginBottom: 5 }}>Location (</Text>
//           <Text style={{ fontSize: 15, color: "red" }}>optional</Text>
//           <Text style={{ fontSize: 15, marginBottom: 5 }}>)</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your location"
//           placeholderTextColor="#888888"
//           value={userProfileInfo.location}
//           onChangeText={(text) => setUserProfileInfo(profile => ({...profile, location: text}))}
//         />
//       </View>
//     </View>
//   );
// };

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    paddingBottom: 20, // Ensure content has enough space
  },
  input: {
    height: 45,
    borderRadius: 12,
    borderColor: "#ABADB1",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginRight: 15,
  },
});

type EditProfileSubcomponentProps = {
  userProfileInfo: UserProfileInfo;
  setUserProfileInfo: React.Dispatch<React.SetStateAction<UserProfileInfo>>;
}