// /*
//     Test Login Page w/ User Auth.
// */

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// import { signUp, confirmSignUp, signIn, signOut } from "./Signup";
// const App: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [name, setName] = useState<string>(""); // Added name field
//   const [username, setUsername] = useState<string>(""); // Added username field
//   const [confirmCode, setConfirmCode] = useState<string>("");
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [step, setStep] = useState<"login" | "signup" | "confirm">("login");
//   const handleSignup = async () => {
//     try {
//       // if (!email || !username || !name || !password) {
//       //   Alert.alert('Error', 'All fields are required');
//       //   return;
//       // }
//       console.log("Clicked");
//       // const message = await signUp(username, email, password);
//       const message = await signUp(username, email, password, name);
//       Alert.alert("Signup Successful", message);
//       setStep("confirm");
//       setPassword(""); // Clear password for security
//     } catch (error) {
//       Alert.alert("Signup Failed", error as string);
//     }
//   };
//   const handleConfirmSignup = async () => {
//     try {
//       const message = await confirmSignUp(username, confirmCode);
//       Alert.alert("Success", message);
//       setStep("login");
//     } catch (error) {
//       Alert.alert("Confirmation Failed", error as string);
//     }
//   };
//   const handleLogin = async () => {
//     try {
//       const token = await signIn(email, password);
//       setIsAuthenticated(true);
//       Alert.alert("Login Successful!", `Token: ${token.substring(0, 20)}...`);
//     } catch (error) {
//       Alert.alert("Login Failed", error as string);
//     }
//   };
//   const handleLogout = () => {
//     signOut(email);
//     setIsAuthenticated(false);
//     Alert.alert("Logged out successfully");
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>AWS Cognito Auth</Text>
//       {step === "signup" ? (
//         <>
//           <TextInput
//             placeholder="Username"
//             value={username}
//             onChangeText={setUsername}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             autoCapitalize="none"
//           />
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             style={styles.input}
//           />
//           <Button title="Sign Up" onPress={handleSignup} />
//           <Button
//             title="Go to Login"
//             onPress={() => setStep("login")}
//             color="gray"
//           />
//         </>
//       ) : step === "confirm" ? (
//         <>
//           <TextInput
//             placeholder="Confirmation Code"
//             value={confirmCode}
//             onChangeText={setConfirmCode}
//             style={styles.input}
//           />
//           <Button title="Confirm Account" onPress={handleConfirmSignup} />
//           <Button
//             title="Back to Signup"
//             onPress={() => setStep("signup")}
//             color="gray"
//           />
//         </>
//       ) : (
//         <>
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             autoCapitalize="none"
//           />
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             style={styles.input}
//           />
//           <Button title="Login" onPress={handleLogin} />
//           <Button
//             title="Create Account"
//             onPress={() => setStep("signup")}
//             color="gray"
//           />
//         </>
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
//   welcome: {
//     fontSize: 18,
//     marginVertical: 20,
//     textAlign: "center",
//   },
// });
// export default App;

// //Login.tsx
// //Login.tsx
// // "use client";

// // import type React from "react";
// // import { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   Alert,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from "react-native";
// // import { signUp, confirmSignUp } from "./Signup"; // Remove signIn and signOut imports
// // import { useAuth } from "@/context/AuthContext"; // Import the auth context hook
// // import RouteDebug from "@/components/RouteDebug"; // Import the debug component

// // const Login: React.FC = () => {
// //   const { login, loading, isAuthenticated, user } = useAuth(); // Use the auth context

// //   const [email, setEmail] = useState<string>("");
// //   const [password, setPassword] = useState<string>("");
// //   const [name, setName] = useState<string>("");
// //   const [username, setUsername] = useState<string>("");
// //   const [confirmCode, setConfirmCode] = useState<string>("");
// //   const [step, setStep] = useState<"login" | "signup" | "confirm">("login");

// //   // Add logging for auth state changes
// //   console.log("Auth state:", { isAuthenticated, user, loading });

// //   const handleSignup = async () => {
// //     try {
// //       if (!email || !username || !name || !password) {
// //         Alert.alert("Error", "All fields are required");
// //         return;
// //       }

// //       const message = await signUp(username, email, password, name);
// //       Alert.alert("Signup Successful", message);
// //       setStep("confirm");
// //       setPassword(""); // Clear password for security
// //     } catch (error) {
// //       Alert.alert("Signup Failed", error as string);
// //     }
// //   };

// //   const handleConfirmSignup = async () => {
// //     try {
// //       const message = await confirmSignUp(username, confirmCode);
// //       Alert.alert("Success", message);
// //       setStep("login");
// //     } catch (error) {
// //       Alert.alert("Confirmation Failed", error as string);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     try {
// //       console.log("Login button pressed");
// //       await login(email, password);
// //       console.log("Login function completed");
// //     } catch (error) {
// //       console.error("Login error in component:", error);
// //       Alert.alert("Login Failed", error as string);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={[styles.container, styles.centered]}>
// //         <ActivityIndicator size="large" color="#FC5E1A" />
// //         <Text style={styles.loadingText}>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>AWS Cognito Auth</Text>
// //       {/* Display auth state for debugging */}
// //       <Text style={styles.debugText}>
// //         Auth State: {isAuthenticated ? "Authenticated" : "Not Authenticated"}
// //       </Text>
// //       {user && <Text style={styles.debugText}>User: {user.email}</Text>}
// //       {/* Rest of your component */}
// //       {step === "signup" ? (
// //         <>
// //           <TextInput
// //             placeholder="Username"
// //             value={username}
// //             onChangeText={setUsername}
// //             style={styles.input}
// //           />
// //           <TextInput
// //             placeholder="Name"
// //             value={name}
// //             onChangeText={setName}
// //             style={styles.input}
// //           />
// //           <TextInput
// //             placeholder="Email"
// //             value={email}
// //             onChangeText={setEmail}
// //             style={styles.input}
// //             autoCapitalize="none"
// //           />
// //           <TextInput
// //             placeholder="Password"
// //             value={password}
// //             onChangeText={setPassword}
// //             secureTextEntry
// //             style={styles.input}
// //           />
// //           <Button title="Sign Up" onPress={handleSignup} />
// //           <Button
// //             title="Go to Login"
// //             onPress={() => setStep("login")}
// //             color="gray"
// //           />
// //         </>
// //       ) : step === "confirm" ? (
// //         <>
// //           <TextInput
// //             placeholder="Confirmation Code"
// //             value={confirmCode}
// //             onChangeText={setConfirmCode}
// //             style={styles.input}
// //           />
// //           <Button title="Confirm Account" onPress={handleConfirmSignup} />
// //           <Button
// //             title="Back to Signup"
// //             onPress={() => setStep("signup")}
// //             color="gray"
// //           />
// //         </>
// //       ) : (
// //         <>
// //           <TextInput
// //             placeholder="Email"
// //             value={email}
// //             onChangeText={setEmail}
// //             style={styles.input}
// //             autoCapitalize="none"
// //           />
// //           <TextInput
// //             placeholder="Password"
// //             value={password}
// //             onChangeText={setPassword}
// //             secureTextEntry
// //             style={styles.input}
// //           />
// //           <Button title="Login" onPress={handleLogin} />
// //           <Button
// //             title="Create Account"
// //             onPress={() => setStep("signup")}
// //             color="gray"
// //           />
// //         </>
// //       )}
// //       <RouteDebug /> {/* Add the route debug component */}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: "white",
// //     flex: 1,
// //     padding: 20,
// //     justifyContent: "center",
// //   },
// //   centered: {
// //     alignItems: "center",
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   welcome: {
// //     fontSize: 18,
// //     marginVertical: 20,
// //     textAlign: "center",
// //   },
// //   debugText: {
// //     fontSize: 12,
// //     color: "#666",
// //     textAlign: "center",
// //     marginBottom: 10,
// //   },
// //   loadingText: {
// //     marginTop: 10,
// //     color: "#666",
// //   },
// // });

// // export default Login;
