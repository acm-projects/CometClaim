import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import NewMessage from "@/components/ui/UserMessages";
import { useState, useEffect, useRef } from "react";
import filter from "lodash.filter";

// Define the user type
interface User {
  user_id: string;
  username: string;
  full_name?: string;
  email: string;
  profile_picture?: string;
  phone_number?: string;
  posts?: any[];
  comments?: any[];
}

const API_URL = process.env.EXPO_PUBLIC_API_URL; // Replace with your actual API URL

export default function MessagesScreen() {
  // Navigate to the DM screen with the user's information
  const navigateToDM = (user: {
    id: string;
    name: string;
    avatar?: string;
  }) => {
    router.push({
      pathname: "/messages/[id]",
      params: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || "",
      },
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fullData, setFullData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await res.json();
        const parsedUsers: User[] = JSON.parse(responseData.body);
        setData(parsedUsers);
        setFullData(parsedUsers);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, []);

  // Loading handling state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Error fetching data ... Please check your internet connection!
        </Text>
      </View>
    );
  }

  // Error handling state

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      // If query is empty, show all users
      setData(fullData);
      return;
    }
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  // Function to check if the user matches the search query
  const contains = (user: User, query: string): boolean => {
    if (user.username.toLowerCase().includes(query)) {
      return true;
    }
    if (user.full_name && user.full_name.toLowerCase().includes(query)) {
      return true;
    }
    if (user.email.toLowerCase().includes(query)) {
      return true;
    }
    // Check if phone number contains the query (if available)
    if (user.phone_number && user.phone_number.includes(query)) {
      return true;
    }
    return false;
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
                New Message
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.inputContainer}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 500,
            color: "#A6A6A6",
          }}
        >
          To:{" "}
        </Text>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          placeholder="Search"
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <NewMessage
            name={item.username}
            avatar={item.profile_picture}
            onPress={() =>
              navigateToDM({
                id: item.user_id,
                name: item.username,
                avatar: item.profile_picture || "",
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  listContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 500,
    marginLeft: -10,
  },
});
