// AddItemScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ExpoFileSystem from "expo-file-system";
import * as ExpoImagePicker from "expo-image-picker";
import * as base64 from "base64-js";
import { LinearGradient } from "expo-linear-gradient";
import { RelativePathString, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

import {
  S3Client,
  S3ClientConfig,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import AsyncStorage from "@react-native-async-storage/async-storage";

const bucketName = "cometclaim-images-utd";
const bucketRegion = "us-east-1";
const accessKeyId = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

type UserInfo = {
  username: string;
  email: string;
  fullName: string;
};

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
} as S3ClientConfig);

interface FormData {
  item: string;
  location: string;
  description: string;
  status: string;
  image_url?: string;
  keywords: string[];
  color: string;
}

const AddItemScreen = () => {
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [postKeywordsString, setPostKeywordsString] = useState("");

  const [form, setForm] = useState<FormData>({
    item: "",
    location: "",
    description: "",
    status: "",
    keywords: [""],
    color: "",
  });

  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // const [cameraPermission, requestPermission] = ExpoImagePicker.useCameraPermissions()

  const selectImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const takePhoto = async () => {
    let cameraPermissions = await ExpoImagePicker.getCameraPermissionsAsync();
    // console.log(cameraPermissions);
    if (!cameraPermissions.granted) {
      cameraPermissions = await ExpoImagePicker.requestCameraPermissionsAsync();
    }

    // console.log(cameraPermissions);

    if (cameraPermissions.granted) {
      let result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        cameraType: ExpoImagePicker.CameraType.back,
      });

      // console.log(result);

      if (!result.canceled) {
        // console.log("BLASH: " + result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
      // console.log("imageeeeee: " + image)
    } else {
      console.log("camera permissions were denied");
    }
  };
  const removeImage = () => {
    setImage("");
  };

  const manipulateImage = async (uri: string) => {
    const context = ImageManipulator.manipulate(uri);

    context.resize({
      width: 800,
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
    if (!image) {
      return "";
    }
    try {
      setIsUploading(true);
      const fileURI = await manipulateImage(image);
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

      // console.log("image uploaded successfully", data);

      return `https://${bucketName}.s3.amazonaws.com/uploads/${fileName}`;
    } catch (err) {
      console.error("Error uploading image", err);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let s3URL = "";
      if (image) {
        s3URL = await uploadImage();
        if (image && !s3URL) {
          throw "Image failed to upload to S3";
        }
      }

      const reporterId = await AsyncStorage.getItem("userId");
      const reporterRes = await fetch(`${apiUrl}/users/${reporterId}`, {
        method: "GET",
      });

      const reporterData = await reporterRes.json();
      const reporter = JSON.parse(reporterData.body);

      delete reporter.posts

      // Only include image_url in the payload if it exists
      const payload = {
        ...form,
        date_reported: new Date()
          .toLocaleString("sv", { timeZone: "CST" })
          .replace(" ", "T"),
        reporter_id: reporterId,
        reporter: reporter,
      };

      if (s3URL) {
        payload.image_url = s3URL;
      }

      // const submissionData = { ...form };
      // if (s3URL) {
      //   submissionData.image_url = s3URL;
      // }
      const response = await fetch(`${apiUrl}/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image_url: s3URL,
          date_reported: new Date()
            .toLocaleString("sv", { timeZone: "CST" })
            .replace(" ", "T"),
          reporter_id: reporterId,
          reporter: reporter,
          comments: [],
        }),
      });

      const data = await response.json();
      // console.log("Item added:", data);

      setForm({
        item: "",
        location: "",
        description: "",
        status: "",
        keywords: [""],
        color: "",
      });

      setImage("");

      router.navigate("/(tabs)/HomeScreen" as RelativePathString);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsUploading(false);
    }
  };
  // const handleDateChange = (event: any, date?: Date) => {
  //   setShowDatePicker(Platform.OS === "ios"); // Keep open for iOS, auto-close for Android
  //   if (date) {
  //     setSelectedDate(date);
  //     handleChange("date_reported", date.toLocaleDateString("en-GB")); // Formats as dd/mm/yyyy
  //   }
  //   setShowDatePicker(false);
  // };

  // const handleTextChange = (input: string) => {
  //   // Basic date validation (dd/mm/yyyy format)
  //   const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  //   if (dateRegex.test(input)) {
  //     handleChange("date_reported", input);
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
                // onPress={() => router.back()}
                onPress={() =>
                  router.push("/(tabs)/HomeScreen" as RelativePathString)
                }
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
        <ScrollView
          style={{ padding: 20, backgroundColor: "#ffffff", flex: 1 }}
        >
          {/* Image section - with clear indication that it's optional */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>
              Add Image <Text style={styles.optionalText}>(Optional)</Text>
            </Text>
            <View style={styles.imageContainer}>
              {image ? (
                <>
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: 370, borderRadius: 10 }}
                  />
                  {/* Remove image button */}
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={removeImage}
                  >
                    <Entypo name="cross" size={24} color="white" />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.noImagePlaceholder}>
                  <Entypo name="image" size={48} color="#ccc" />
                  <Text style={styles.placeholderText}>No image selected</Text>
                </View>
              )}
            </View>

            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={selectImage}
              >
                <Entypo name="images" size={20} color="white" />
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                <Entypo name="camera" size={20} color="white" />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>
              Item Details <Text style={styles.requiredText}>*</Text>
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Item Name <Text style={styles.requiredText}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter item name"
                placeholderTextColor="#888"
                value={form.item}
                onChangeText={(value) => handleChange("item", value)}
                style={styles.input}
              />
            </View>

            {/* <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Date Reported <Text style={styles.requiredText}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: form.date_reported ? "#000" : "#888" }}>
                  {form.date_reported || "dd/mm/yyyy"}
                </Text>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    style={{
                      backgroundColor: "#00674F",
                      margin: 5,
                      position: "absolute",
                      right: 0,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View> */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Location <Text style={styles.requiredText}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter location"
                placeholderTextColor="#888"
                value={form.location}
                onChangeText={(value) => handleChange("location", value)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Description <Text style={styles.requiredText}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter description"
                placeholderTextColor="#888"
                value={form.description}
                onChangeText={(value) => handleChange("description", value)}
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reporter ID</Text>
            <TextInput
              placeholder="Enter reporter ID"
              placeholderTextColor="#888"
              value={form.reporter_id}
              onChangeText={(value) => handleChange("reporter_id", value)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View> */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Status</Text>
              <View style={styles.segmentedControlContainer}>
                <View style={styles.segmentedControl}>
                  <TouchableOpacity
                    style={[
                      styles.segmentOption,
                      form.status === "Lost" && styles.activeSegment,
                      { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                    ]}
                    onPress={() => handleChange("status", "Lost")}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        form.status === "Lost" && styles.activeSegmentText,
                      ]}
                    >
                      Lost
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TouchableOpacity
                    style={[
                      styles.segmentOption,
                      form.status === "Found" && styles.activeSegment,
                      { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                    ]}
                    onPress={() => handleChange("status", "Found")}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        form.status === "Found" && styles.activeSegmentText,
                      ]}
                    >
                      Found
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Keywords</Text>
              <TextInput
                placeholder="Enter keywords (comma separated)"
                placeholderTextColor="#888"
                onChangeText={(value) =>
                  setForm((oldForm) => ({
                    ...oldForm,
                    keywords: value.split(",").map((val) => val.trim()),
                  }))
                }
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Color</Text>
              <TextInput
                placeholder="Enter color"
                placeholderTextColor="#888"
                value={form.color}
                onChangeText={(value) => handleChange("color", value)}
                style={styles.input}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.postButton, isUploading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isUploading}
          >
            <Text style={styles.postButtonText}>
              {isUploading ? "Posting..." : "Post Item"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  optionalText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#888",
    fontStyle: "italic",
  },
  requiredText: {
    color: "#FC5E1A",
    fontWeight: "bold",
  },
  imageSection: {
    marginBottom: 24,
  },
  imageContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
    height: 370,
  },
  noImagePlaceholder: {
    height: "100%",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#888",
    marginTop: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageButton: {
    flex: 1,
    backgroundColor: "#FC5E1A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    height: 50,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  postButton: {
    backgroundColor: "#FC5E1A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#FFA07A",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  segmentedControlContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  segmentedControl: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FC5E1A",
    borderRadius: 8,
    // overflow: "hidden",
    width: "100%",
  },
  segmentOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "white",
    // borderColor: "#FC5E1A",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#FC5E1A",
  },
  activeSegment: {
    backgroundColor: "#FC5E1A",
  },
  segmentText: {
    fontWeight: "bold",
    color: "#FC5E1A",
  },
  activeSegmentText: {
    color: "white",
  },
});

export default AddItemScreen;
