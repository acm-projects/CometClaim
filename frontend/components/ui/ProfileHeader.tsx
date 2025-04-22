import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { RelativePathString, router } from "expo-router";
import { UserProfileInfo } from "@/app/EditProfile";
import * as ExpoFileSystem from "expo-file-system";
import * as base64 from "base64-js";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

import {
  S3Client,
  S3ClientConfig,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "@/types";

const bucketName = "cometclaim-images-utd";
const bucketRegion = "us-east-1";
const accessKeyId = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
} as S3ClientConfig);

const ProfileHeader = (userInfo: UserProfileInfo) => {
  const manipulateImage = async (uri: string) => {
    const context = ImageManipulator.manipulate(uri);

    context.resize({
      width: 400,
    });

    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.WEBP,
      compress: 0.7,
      base64: true,
    });

    return result.uri;
  };

  const uploadImage = async () => {
    try {
      const fileURI = await manipulateImage(userInfo.profile_picture);
      const fileName = fileURI.split("/").pop();
      const fileType = "image/webp";
      const fileData = await ExpoFileSystem.readAsStringAsync(fileURI, {
        encoding: ExpoFileSystem.EncodingType.Base64,
      });

      const binaryData = base64.toByteArray(fileData);

      const params = {
        Bucket: bucketName,
        Key: `uploads/${fileName}`,
        Body: binaryData,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params as PutObjectCommandInput);
      const data = await s3Client.send(command);

      // setForm({...form, image_url: `https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`})
      // setImage(`https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`)
      // console.log("FORMFORMFORM: \n" + form)
      // console.log("THIS IS THE IMAGE AT THIS VERY MOMENT: " + image)
      console.log("image uploaded successfully", data);

      return `https://${bucketName}.s3.amazonaws.com/uploads/${fileName}`;
    } catch (err) {
      console.error("Error uploading image", err);
      return "";
    }
  };

  async function saveProfileChanges() {
    console.log("user info", userInfo);
    try {
      const s3URL = await uploadImage();

      if (!s3URL) {
        throw "Image failed to upload to S3";
      }

      const userId = await AsyncStorage.getItem("userId");

      console.log("user id is", userId);

      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: userInfo.full_name,
          profile_picture: s3URL,
          username: userInfo.username,
          email: userInfo.email,
          phone_number: userInfo.phone_number,
        }),
      });

      const data = await response.json();

      const getItemsOfUser = async () => {
        const res = await fetch(`${apiUrl}/items/`);
        const data = await res.json();
        const items: Item[] = JSON.parse(data.body);
        const itemsOfUser: Item[] = items.filter(
          (item) => item.reporter_id === userId
        );
        return itemsOfUser;
      };

      const itemsOfUser = await getItemsOfUser();

      const updateItemRequests = itemsOfUser.map((item) => async () => {
        const res = await fetch(`${apiUrl}/items/${item.item_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reporter: { ...item.reporter, profile_picture: s3URL },
          }),
        });
      });

      await Promise.all(updateItemRequests.map((req) => req()));

      console.log("User updated:", data);
      router.push("/ProfilePage" as RelativePathString);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-start" }}
        onPress={() => router.back()}
      >
        <Text>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          margin: 10,
          justifyContent: "center",
        }}
      >
        Edit Profile
      </Text>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-end" }}
        onPress={saveProfileChanges}
      >
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    //  Space between helps the items spaced out
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3671E6",
    textAlign: "left",
    paddingLeft: 20,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FC5E1A",
    textAlign: "right",
    paddingRight: 5,
  },
});
