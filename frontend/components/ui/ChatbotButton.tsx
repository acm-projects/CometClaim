import type React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ChatbotButtonProps {
  size?: number;
  color?: string;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  size = 60,
  color = "#FC5E1A",
}) => {
  const handlePress = () => {
    router.push("/chatScreen");
  };

  return (
    <View style={{ position: "absolute", bottom: 70, right: 1 }}>
      <TouchableOpacity
        style={[
          styles.button,
          { width: size, height: size, backgroundColor: color },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          {/* <Ionicons
            name="chatbubble-ellipses"
            size={size * 0.5}
            color="white"
          /> */}
          <Image
            source={require("@/assets/images/CometClaim-Logo.png")}
            style={{ height: 50, width: 50 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatbotButton;
