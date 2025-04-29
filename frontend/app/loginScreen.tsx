import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { RelativePathString, useRouter } from "expo-router";
import { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  //Validate username and passwords function
  const validateForm = () => {
    let errors: any = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted", username, password);
      setUsername("");
      setPassword("");
      setErrors({
        username: "",
        password: "",
      });
    }
  };
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      {/* <Image
        source={"./assets/images/CometClaim-Logo.png"}
        style={styles.image}
      ></Image> */}
      <Text style={styles.title}>Login or Sign Up</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#888888"
          value={username}
          onChangeText={setUsername}
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
        <TouchableOpacity
          style={{
            backgroundColor: "#FC5E1A",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/(tabs)/HomeScreen" as RelativePathString);
            handleSubmit();
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 25,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "center",
    marginBottom: 50,
  },
  form: {
    // backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0.3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 65,
    borderRadius: 12,
    borderColor: "green",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
