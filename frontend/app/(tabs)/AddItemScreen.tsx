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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const AddItemScreen = () => {
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("02/21/2025");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

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
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Item Name */}
        <View style={styles.messageBubbleLeft}>
          <Text style={styles.messageText}>Item Name</Text>
        </View>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />

        {/* Date */}
        <View style={styles.messageBubbleLeft}>
          <Text style={styles.messageText}>Date</Text>
        </View>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Enter date"
        />

        {/* Location */}
        <View style={styles.messageBubbleLeft}>
          <Text style={styles.messageText}>Location</Text>
        </View>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />

        {/* Notes */}
        <View style={styles.messageBubbleLeft}>
          <Text style={styles.messageText}>Notes</Text>
        </View>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe the item"
          multiline
        />
      </ScrollView>

      {/* Post Button */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => console.log({ itemName, date, location, notes })}
        >
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
  postButton: {
    backgroundColor: "#4CAF50",
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
