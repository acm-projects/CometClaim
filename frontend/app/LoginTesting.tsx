// /*
//     Test Login Page w/ User Auth.
// */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { signUp, confirmSignUp, signIn, signOut } from "./Signup";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode";
// import { Link, RelativePathString } from "expo-router";

// type AuthUser = {
//   email: string;
//   family_name: string;
//   given_name: string;
// };

// const App: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [name, setName] = useState<string>(""); // Added name field
//   const [username, setUsername] = useState<string>(""); // Added username field
//   const [confirmCode, setConfirmCode] = useState<string>("");
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [step, setStep] = useState<"login" | "signup" | "confirm">("login");
//   const [showPassword, setShowPassword] = useState<boolean>(false);

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
//       const message = await confirmSignUp(email, confirmCode);
//       Alert.alert("Success", message);
//       setStep("login");
//     } catch (error) {
//       Alert.alert("Confirmation Failed", error as string);
//     }
//   };
//   const handleLogin = async () => {
//     try {
//       const token = await signIn(email, password);
//       await AsyncStorage.setItem("jwtToken", token);

//       const decodedToken: AuthUser = jwtDecode(token);
//       await AsyncStorage.setItem("userEmail", decodedToken.email);
//       await AsyncStorage.setItem("userFullName", decodedToken.family_name);
//       await AsyncStorage.setItem("username", decodedToken.given_name);

//       const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//       const res = await fetch(`${apiUrl}/users?email=${email}`, {
//         method: "GET",
//       });

//       const data = await res.json();

//       await AsyncStorage.setItem("userId", data.user.user_id);

//       console.log(
//         "this is the decoded stuff:",
//         JSON.stringify(jwtDecode(token))
//       );
//       // console.log("the user id is", data.user.user_id);
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
//   const handleDismissKeyboard = () => {
//     if (Platform.OS !== "web") {
//       Keyboard.dismiss();
//     }
//   };
//   return (
//     // <SafeAreaView style={styles.container}>
//       <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
//         <KeyboardAvoidingView
//           style={{ ...styles.container }}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           {isAuthenticated ? (
//             <>
//               <Text style={styles.welcome}>Welcome, {email}</Text>
//               <Button title="Logout" onPress={handleLogout} color="red" />
//               <Link href={"/(tabs)/HomeScreen" as RelativePathString}>
//                 Go to Home Screen
//               </Link>
//             </>
//           ) : step === "signup" ? (
//             <>
//               {/* <Text style={styles.title}>Hello, Sign up!</Text>
//             <TextInput
//               placeholder="Username"
//               value={username}
//               onChangeText={setUsername}
//               style={styles.input}
//               placeholderTextColor={"gray"}
//             />
//             <TextInput
//               placeholder="Name"
//               value={name}
//               onChangeText={setName}
//               style={styles.input}
//               placeholderTextColor={"gray"}
//             />
//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               autoCapitalize="none"
//               placeholderTextColor={"gray"}
//             />
//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//               placeholderTextColor={"gray"}
//             />
//             <Button title="Sign Up" onPress={handleSignup} />
//             <Button
//               title="Go to Login"
//               onPress={() => setStep("login")}
//               color="gray"
//             /> */}
//               <View style={styles.logoContainer}>
//                 <Image
//                   source={require("@/assets/images/CometClaim-Logo.png")}
//                   style={styles.logo}
//                 />
//                 <View style={{ alignItems: "center" }}>
//                   <Text
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       color: "#fff",
//                       fontSize: 16,
//                       fontWeight: 600,
//                     }}
//                   >
//                     Create an Account To Claim!
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.cardContainer}>
//                 <Text style={styles.title}>Create Account</Text>

//                 <TextInput
//                   placeholder="Username"
//                   value={username}
//                   onChangeText={setUsername}
//                   style={styles.input}
//                   placeholderTextColor="rgba(0,0,0,0.5)"
//                 />

//                 <TextInput
//                   placeholder="Full Name"
//                   value={name}
//                   onChangeText={setName}
//                   style={styles.input}
//                   placeholderTextColor="rgba(0,0,0,0.5)"
//                 />

//                 <TextInput
//                   placeholder="Email Address"
//                   value={email}
//                   onChangeText={setEmail}
//                   style={styles.input}
//                   autoCapitalize="none"
//                   keyboardType="email-address"
//                   placeholderTextColor="rgba(0,0,0,0.5)"
//                 />

//                 <View style={styles.passwordContainer}>
//                   <TextInput
//                     placeholder="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     style={styles.passwordInput}
//                     placeholderTextColor="rgba(0,0,0,0.5)"
//                   />
//                   <TouchableOpacity
//                     onPress={() => setShowPassword(!showPassword)}
//                     style={styles.eyeIcon}
//                   >
//                     <Text>{showPassword ? "🙈" : "👁️"}</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.primaryButton}
//                   onPress={handleSignup}
//                 >
//                   <Text style={styles.buttonText}>Sign Up</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.switchPrompt}>
//                   Already have an account?{" "}
//                   <Text
//                     style={styles.switchLink}
//                     onPress={() => setStep("login")}
//                   >
//                     Log In
//                   </Text>
//                 </Text>
//               </View>
//             </>
//           ) : step === "confirm" ? (
//             <>
//               <View style={styles.logoContainer}>
//                 <Image
//                   source={require("@/assets/images/CometClaim-Logo.png")}
//                   style={styles.logo}
//                 />
//               </View>

//               <View style={styles.cardContainer}>
//                 <Text style={styles.title}>Confirm Your Account</Text>
//                 <Text style={styles.subtitle}>
//                   A confirmation code has been sent to your email.
//                 </Text>

//                 <TextInput
//                   placeholder="Confirmation Code"
//                   value={confirmCode}
//                   onChangeText={setConfirmCode}
//                   style={styles.input}
//                   keyboardType="number-pad"
//                   placeholderTextColor="rgba(0,0,0,0.5)"
//                 />

//                 <TouchableOpacity
//                   style={styles.primaryButton}
//                   onPress={handleConfirmSignup}
//                 >
//                   <Text style={styles.buttonText}>Confirm Account</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => setStep("signup")}>
//                   <Text style={styles.secondaryLink}>Back to Signup</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           ) : (
//             <>
//               <View style={styles.logoContainer}>
//                 <Image
//                   source={require("@/assets/images/CometClaim-Logo.png")}
//                   style={styles.logo}
//                 />
//                 <View style={{ alignItems: "center" }}>
//                   <Text
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       color: "#fff",
//                       fontSize: 16,
//                       fontWeight: 600,
//                     }}
//                   >
//                     Login To Claim!
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.cardContainer}>
//                 <Text style={styles.title}>Hello, Sign in!</Text>

//                 <TextInput
//                   placeholder="Email Address"
//                   value={email}
//                   onChangeText={setEmail}
//                   style={styles.input}
//                   autoCapitalize="none"
//                   keyboardType="email-address"
//                   placeholderTextColor="rgba(0,0,0,0.5)"
//                 />

//                 <View style={styles.passwordContainer}>
//                   <TextInput
//                     placeholder="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     style={styles.passwordInput}
//                     placeholderTextColor="rgba(0,0,0,0.5)"
//                   />
//                   <TouchableOpacity
//                     onPress={() => setShowPassword(!showPassword)}
//                     style={styles.eyeIcon}
//                   >
//                     <Text>{showPassword ? "🙈" : "👁️"}</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity style={styles.forgotPasswordContainer}>
//                   <Text style={styles.forgotPasswordText}>
//                     Forgot Password?
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.primaryButton}
//                   onPress={handleLogin}
//                 >
//                   <Text style={styles.buttonText}>Log In</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.orText}>Or</Text>

//                 <Text style={styles.switchPrompt}>
//                   Don't have an account?{" "}
//                   <Text
//                     style={styles.switchLink}
//                     onPress={() => setStep("signup")}
//                   >
//                     Sign Up
//                   </Text>
//                 </Text>
//               </View>
//             </>
//           )}
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     // </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FC801A",
//   },
//   keyboardView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     marginLeft: 10,
//     height: 130,
//     width: 130,
//     resizeMode: "contain",
//   },
//   cardContainer: {
//     paddingTop: 100,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "white",
//     borderRadius: 35,
//     padding: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#666",
//   },
//   input: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 12,
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 16,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   forgotPasswordContainer: {
//     alignItems: "flex-end",
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: "#555",
//     fontSize: 14,
//   },
//   primaryButton: {
//     backgroundColor: "#FC5E1A",
//     borderRadius: 12,
//     padding: 16,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   orText: {
//     textAlign: "center",
//     color: "#888",
//     marginVertical: 10,
//   },
//   switchPrompt: {
//     textAlign: "center",
//     marginTop: 10,
//     color: "#666",
//   },
//   switchLink: {
//     color: "#FC5E1A",
//     fontWeight: "bold",
//   },
//   secondaryLink: {
//     textAlign: "center",
//     color: "#555",
//     marginTop: 10,
//   },
//   logoutButton: {
//     backgroundColor: "#FF3B30",
//     borderRadius: 12,
//     padding: 16,
//     alignItems: "center",
//     width: "100%",
//     marginBottom: 20,
//   },
//   linkText: {
//     color: "white",
//     textAlign: "center",
//     textDecorationLine: "underline",
//   },
//   welcome: {
//     fontSize: 18,
//     marginVertical: 20,
//     textAlign: "center",
//     color: "white",
//   },
// });
// export default App;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { signUp, confirmSignUp, signIn, signOut } from "./Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Link, RelativePathString, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient"; // Make sure to install expo-linear-gradient

type AuthUser = {
  email: string;
  family_name: string;
  given_name: string;
};

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [step, setStep] = useState<"login" | "signup" | "confirm">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const router = useRouter();

  // Monitor keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/HomeScreen" as RelativePathString);
    }
  }, [isAuthenticated, router]);

  const handleSignup = async () => {
    try {
      if (!email || !username || !name || !password) {
        Alert.alert("Error", "All fields are required");
        return;
      }

      setIsLoading(true);
      const message = await signUp(username, email, password, name);
      setIsLoading(false);
      Alert.alert("Signup Successful", message);
      setStep("confirm");
      setPassword(""); // Clear password for security
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Signup Failed", error as string);
    }
  };

  const handleConfirmSignup = async () => {
    try {
      if (!confirmCode) {
        Alert.alert("Error", "Please enter the confirmation code");
        return;
      }

      setIsLoading(true);
      const message = await confirmSignUp(email, confirmCode);
      setIsLoading(false);
      Alert.alert("Success", message);
      setStep("login");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Confirmation Failed", error as string);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Email and password are required");
        return;
      }

      setIsLoading(true);
      const token = await signIn(email, password);
      await AsyncStorage.setItem("jwtToken", token);

      const decodedToken: AuthUser = jwtDecode(token);
      await AsyncStorage.setItem("userEmail", decodedToken.email);
      await AsyncStorage.setItem("userFullName", decodedToken.family_name);
      await AsyncStorage.setItem("username", decodedToken.given_name);

      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/users?email=${email}`, {
        method: "GET",
      });

      const data = await res.json();
      await AsyncStorage.setItem("userId", data.user.user_id);

      setIsLoading(false);
      setIsAuthenticated(true);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Login Failed", error as string);
    }
  };

  const handleLogout = () => {
    signOut(email);
    setIsAuthenticated(false);
    Alert.alert("Logged out successfully");
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderAuthenticatedScreen = () => (
    <View style={styles.authenticatedContainer}>
      <Image
        source={require("@/assets/images/CometClaim-Logo.png")}
        style={styles.authenticatedLogo}
      />
      <Text style={styles.welcome}>Welcome, {email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Link
        href={"/(tabs)/HomeScreen" as RelativePathString}
        style={styles.homeLink}
      >
        <View style={styles.homeLinkContainer}>
          <Text style={styles.homeLinkText}>Go to Home Screen</Text>
          <Ionicons name="arrow-forward" size={20} color="#FC801A" />
        </View>
      </Link>
    </View>
  );

  const renderLoginScreen = () => (
    <>
      <View
        style={[
          styles.logoContainer,
          keyboardVisible && styles.logoContainerSmall,
        ]}
      >
        <Image
          source={require("@/assets/images/CometClaim-Logo.png")}
          style={[styles.logo, keyboardVisible && styles.logoSmall]}
        />
        {!keyboardVisible && (
          <Text style={styles.logoText}>Login To Claim!</Text>
        )}
      </View>

      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <Text style={styles.switchPrompt}>
            Don't have an account?{" "}
            <Text style={styles.switchLink} onPress={() => setStep("signup")}>
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </View>
    </>
  );

  const renderSignupScreen = () => (
    <>
      <View
        style={[
          styles.logoContainer,
          keyboardVisible && styles.logoContainerSmall,
        ]}
      >
        <Image
          source={require("@/assets/images/CometClaim-Logo.png")}
          style={[styles.logo, keyboardVisible && styles.logoSmall]}
        />
        {!keyboardVisible && (
          <Text style={styles.logoText}>Create an Account To Claim!</Text>
        )}
      </View>

      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill in your details to get started
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-circle-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.switchPrompt}>
            Already have an account?{" "}
            <Text style={styles.switchLink} onPress={() => setStep("login")}>
              Log In
            </Text>
          </Text>

          {/* Extra padding at the bottom to ensure content is not cut off */}
        </ScrollView>
      </View>
    </>
  );

  const renderConfirmScreen = () => (
    <>
      <View
        style={[
          styles.logoContainer,
          keyboardVisible && styles.logoContainerSmall,
        ]}
      >
        <Image
          source={require("@/assets/images/CometClaim-Logo.png")}
          style={[styles.logo, keyboardVisible && styles.logoSmall]}
        />
        {!keyboardVisible && (
          <Text style={styles.logoText}>Verify Your Account</Text>
        )}
      </View>

      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.title}>Confirm Your Account</Text>
          <Text style={styles.subtitle}>
            A confirmation code has been sent to your email.
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="key-outline"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Confirmation Code"
              value={confirmCode}
              onChangeText={setConfirmCode}
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleConfirmSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setStep("signup")}>
            <Text style={styles.secondaryLink}>Back to Signup</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FC5E1A" />
      <LinearGradient
        colors={["#FC5E1A", "#FEAB55"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.35 }}
        style={styles.gradientBackground}
      >
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            {step === "login"
              ? renderLoginScreen()
              : step === "signup"
              ? renderSignupScreen()
              : renderConfirmScreen()}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 0,
    backgroundColor: "#FC5E1A",
  },
  gradientBackground: {
    flex: 1,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  authenticatedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  authenticatedLogo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    height: 180,
    justifyContent: "center",
  },
  logoContainerSmall: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  logoSmall: {
    height: 60,
    width: 60,
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    // Remove bottom padding/margin to ensure it extends to the bottom
    marginBottom: -50, // This negative margin helps extend beyond SafeAreaView
    paddingBottom: 50, // Add padding to compensate for the negative margin
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#555",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#FC801A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
    height: 56,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    color: "#888",
    marginHorizontal: 10,
    fontSize: 14,
  },
  switchPrompt: {
    textAlign: "center",
    color: "#666",
    fontSize: 15,
  },
  switchLink: {
    color: "#FC801A",
    fontWeight: "bold",
  },
  secondaryLink: {
    textAlign: "center",
    color: "#555",
    marginTop: 16,
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#FC801A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  homeLink: {
    marginTop: 20,
  },
  homeLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeLinkText: {
    color: "#333",
    fontWeight: "600",
    marginRight: 8,
  },
  welcome: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});

export default App;
