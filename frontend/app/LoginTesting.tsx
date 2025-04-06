/*
    Test Login Page w/ User Auth.
*/

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { signUp, confirmSignUp, signIn, signOut } from './(tabs)/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { Link, RelativePathString } from 'expo-router';

type AuthUser = {
  email: string;
  family_name: string;
  given_name: string;
}

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>(''); // Added name field
  const [username, setUsername] = useState<string>(''); // Added username field
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [step, setStep] = useState<'login' | 'signup' | 'confirm'>('login');
  const handleSignup = async () => {
    try {
      // if (!email || !username || !name || !password) {
      //   Alert.alert('Error', 'All fields are required');
      //   return;
      // }
      console.log("Clicked")
      // const message = await signUp(username, email, password);
      const message = await signUp(username, email, password, name)
      Alert.alert('Signup Successful', message);
      setStep('confirm');
      setPassword(''); // Clear password for security
    } catch (error) {
      Alert.alert('Signup Failed', error as string);
    }
  };
  const handleConfirmSignup = async () => {
    try {
      const message = await confirmSignUp(email, confirmCode);
      Alert.alert('Success', message);
      setStep('login');
    } catch (error) {
      Alert.alert('Confirmation Failed', error as string);
    }
  };
  const handleLogin = async () => {
    try {
      const token = await signIn(email, password);
      // const secureStoreAvailable = await SecureStore.isAvailableAsync()
      // console.log(secureStoreAvailable)
      await AsyncStorage.setItem("jwtToken", token)

      const decodedToken: AuthUser = jwtDecode(token)
      await AsyncStorage.setItem("userEmail", decodedToken.email)
      await AsyncStorage.setItem("userFullName", decodedToken.family_name)
      await AsyncStorage.setItem("username", decodedToken.given_name)
      
      const apiUrl = process.env.EXPO_PUBLIC_API_URL
      const res = await fetch(`${apiUrl}/users?email=${email}`, {
        method: 'GET',
      })

      const data = await res.json()

      await AsyncStorage.setItem("userId", data.user.user_id)
      
      
      console.log("this is the decoded stuff:", JSON.stringify(jwtDecode(token)))
      console.log("the user id is", data.user.user_id)
      setIsAuthenticated(true);
      Alert.alert('Login Successful!', `Token: ${token.substring(0, 20)}...`);
      
    } catch (error) {
      Alert.alert('Login Failed', error as string);
    }
  };
  const handleLogout = () => {
    signOut(email);
    setIsAuthenticated(false);
    Alert.alert('Logged out successfully');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Text style={styles.title}>AWS Cognito Auth</Text>
        {isAuthenticated ? (
          <>
            <Text style={styles.welcome}>Welcome, {email}</Text>
            <Button title="Logout" onPress={handleLogout} color="red" />
            <Link href={"/(tabs)/HomeScreen" as RelativePathString}>Go to Home Screen</Link>
          </>
        ) : step === 'signup' ? (
          <>
          <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor={'gray'}
            />
          <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor={'gray'}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={'gray'}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor={'gray'}
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Button title="Go to Login" onPress={() => setStep('login')} color="gray" />
          </>
        ) : step === 'confirm' ? (
          <>
            <TextInput
              placeholder="Confirmation Code"
              value={confirmCode}
              onChangeText={setConfirmCode}
              style={styles.input}
              placeholderTextColor={'gray'}
            />
            <Button title="Confirm Account" onPress={handleConfirmSignup} />
            <Button title="Back to Signup" onPress={() => setStep('signup')} color="gray" />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={'gray'}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor={'gray'}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={() => setStep('signup')} color="gray" />
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});
export default App;