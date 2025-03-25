import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface UserMessageProps {
  name: string;
  preview: string;
  timestamp?: string;
  unread?: boolean;
  avatar?: string;
  onPress?: () => void;
}

export const UserMessage: React.FC<UserMessageProps> = ({
  name,
  preview,
  timestamp = "Just now",
  unread = false,
  avatar,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, unread && styles.unreadName]}>{name}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>

        <View style={styles.previewContainer}>
          <Text
            style={[styles.preview, unread && styles.unreadPreview]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {preview}
          </Text>

          {unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "white",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FC5E1A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  unreadName: {
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 12,
    color: "#888888",
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  preview: {
    flex: 1,
    fontSize: 14,
    color: "#666666",
  },
  unreadPreview: {
    color: "#333333",
    fontWeight: "500",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FC5E1A",
    marginLeft: 8,
  },
});
