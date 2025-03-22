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
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import { useState } from "react";

import ProfileHeader from "@/components/ui/ProfileHeader"; // Adjust the import path as necessary

const EditProfile: React.FC = () => {
  return (
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
        <ProfileHeader />
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            <Divider width={1} orientation="vertical" />
            <ProfileImage />
            <Divider width={1} orientation="vertical" />
            <PersonalInfo />
            <Divider width={1} orientation="vertical" />
            <ContactInfo />
            <Divider width={1} orientation="vertical" />
            <OtherInfo />
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const ProfileImage: React.FC = () => {
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
          uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
      <TouchableOpacity
        style={{
          backgroundColor: "#FC5E1A",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Change Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const PersonalInfo: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          value={fullname}
          onChangeText={setFullname}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#888888"
          value={username}
          onChangeText={setUsername}
        />
      </View>
    </View>
  );
};

const ContactInfo: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888888"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
    </View>
  );
};

const OtherInfo: React.FC = () => {
  const [netID, setNetID] = useState("");
  const [location, setLocation] = useState("");
  return (
    <View style={{ flexDirection: "column", margin: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
        Contact Information
      </Text>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Net-ID/UTD-ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Net-ID/UTD-ID"
          placeholderTextColor="#888888"
          value={netID}
          onChangeText={setNetID}
        />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>Location (</Text>
          <Text style={{ fontSize: 15, color: "red" }}>optional</Text>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>)</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          placeholderTextColor="#888888"
          value={location}
          onChangeText={setLocation}
        />
      </View>
    </View>
  );
};

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
