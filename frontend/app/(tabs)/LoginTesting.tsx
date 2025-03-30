/*
    Test Login Page w/ User Auth.
*/

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signUp, confirmSignUp, signIn, signOut } from './Signup';
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
      const message = await confirmSignUp(username, confirmCode);
      Alert.alert('Success', message);
      setStep('login');
    } catch (error) {
      Alert.alert('Confirmation Failed', error as string);
    }
  };
  const handleLogin = async () => {
    try {
      const token = await signIn(email, password);
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
    <View style={styles.container}>
      <Text style={styles.title}>AWS Cognito Auth</Text>
      {isAuthenticated ? (
        <>
          <Text style={styles.welcome}>Welcome, {email}</Text>
          <Button title="Logout" onPress={handleLogout} color="red" />
        </>
      ) : step === 'signup' ? (
        <>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
         <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
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
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Create Account" onPress={() => setStep('signup')} color="gray" />
        </>
      )}
    </View>
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