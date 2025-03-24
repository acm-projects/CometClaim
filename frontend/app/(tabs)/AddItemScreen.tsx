import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView 
} from "react-native";

const AddItemScreen = () => {
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("02/21/2025");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Add a New Found/Lost Item</Text>

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
    paddingTop: 16,
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
