import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  Platform,
} from "react-native";
import * as ExpoFileSystem from "expo-file-system";
import * as ExpoImagePicker from "expo-image-picker";
import * as base64 from "base64-js";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  S3Client,
  S3ClientConfig,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const bucketName = "cometclaim-image-bucket";
const bucketRegion = "us-east-1";
const accessKeyId = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.EXPO_PUBLIC_SECRET_ACCESS_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
} as S3ClientConfig);

interface FormData {
  item: string;
  date_reported: string;
  location: string;
  description: string;
  reporter_id: string;
  status: string;
  image_url?: string;
  keywords: string[];
  color: string;
}

const AddItemScreen = () => {
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("02/21/2025");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [form, setForm] = useState<FormData>({
    item: "",
    date_reported: "",
    location: "",
    description: "",
    reporter_id: "",
    status: "",
    keywords: [""],
    color: "",
  });

  const [image, setImage] = useState("");
  // const [cameraPermission, requestPermission] = ExpoImagePicker.useCameraPermissions()

  const selectImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        setImage(result.assets[0].uri);
      }
      // console.log("imageeeeee: " + image)
    } else {
      console.log("camera permissions were denied");
    }
  };

  const uploadImage = async () => {
    try {
      const fileURI = image;
      const fileName = fileURI.split("/").pop();
      const fileType = "image/jpeg";
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

      console.log("image uploaded successfully", data);

      return `https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`;
    } catch (err) {
      console.error("Error uploading image", err);
      return "";
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const s3URL = await uploadImage();
      // console.log("THIS IS THE FORM RIGHT NOW: \n" + JSON.stringify(form))
      if (!s3URL) {
        throw "Image failed to upload to S3";
      }

      const response = await fetch(`${apiUrl}/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, image_url: s3URL }),
      });
      const data = await response.json();
      console.log("Item added:", data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep open for iOS, auto-close for Android
    if (date) {
      setSelectedDate(date);
      handleChange("date_reported", date.toLocaleDateString("en-GB")); // Formats as dd/mm/yyyy
    }
    setShowDatePicker(false);
  };

  const handleTextChange = (input: string) => {
    // Basic date validation (dd/mm/yyyy format)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (dateRegex.test(input)) {
      handleChange("date_reported", input);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FC5E1A", "#FFC480"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          minHeight: 95,
          height: "11.3%",
          width: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              marginTop: "10%",
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{ marginLeft: "2%" }}
              onPress={() => router.back()}
            >
              <Entypo name="chevron-left" size={32} color="white" />
            </Pressable>
            <View
              style={{
                position: "absolute",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Add a New Found/Lost Item
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={{ padding: 20, backgroundColor: "#ffffff", flex: 1 }}>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 370 }}
            />
          )}
        </View>
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
            <Text style={{ color: "white", fontWeight: "bold" }}>Photos</Text>
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
            <Text style={{ color: "white", fontWeight: "bold" }}>Camera</Text>
          </TouchableOpacity>
        </View>
        {Object.keys(form).map((key) => (
          <View key={key} style={{ marginBottom: 10, marginTop: 10 }}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 5, color: "#000" }}
            >
              {key.replace("_", " ").toUpperCase()}
            </Text>
            {key === "date_reported" ? (
              <>
                {/* ------------TRYING TO HAVE BOTH INPUT AND SHOWDATEPICKER----------- */}
                {/* <TextInput
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor="#888"
                  value={form["location"]}
                  onChangeText={handleTextChange}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderColor: "green",
                    height: 50,
                    marginBottom: 10,
                  }}
                /> */}
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderColor: "green",
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: form[key] ? "#000" : "#888" }}>
                      {form[key] || "dd/mm/yyyy"}
                    </Text>
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        style={{
                          backgroundColor: "##00674F",
                          margin: 5,
                          position: "absolute",
                          right: 0,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <TextInput
                placeholder={`Enter ${key.replace("_", " ")}`}
                placeholderTextColor="#888"
                value={
                  Array.isArray(form[key as keyof FormData])
                    ? (form[key as keyof FormData] as string[]).join(", ")
                    : (form[key as keyof FormData] as string)
                }
                onChangeText={(value) =>
                  handleChange(key as keyof FormData, value)
                }
                keyboardType={key === "reporter_id" ? "numeric" : "default"}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  borderColor: "green",
                  height: 50,
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 16,
    backgroundColor: "#f7f7f7",
    marginBottom: 80,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  messageBubbleLeft: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 8,
    maxWidth: "75%",
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    width: "100%",
  },
  postButton: {
    backgroundColor: "#FC5E1A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddItemScreen;
