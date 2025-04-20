import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

interface ProfileInfoProps {
  phone: string;
  email: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ phone, email }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.infoItem}>
        <View style={styles.iconContainer}>
          <Feather name="phone" size={18} color="#FC5E1A" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{phone}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={18} color="#FC5E1A" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
      </View>

      {/* <View style={styles.infoItem}>
        <View style={styles.iconContainer}>
          <Ionicons name="location-sharp" size={18} color="#FC5E1A" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{location}</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(252, 94, 26, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
  },
});

export default ProfileInfo;
