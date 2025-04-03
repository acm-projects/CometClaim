import type React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import type { Item } from "@/data/sampleData";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const handlePress = () => {
    // Navigate to item details page
    router.push({
      pathname: "/YourPost",
      params: {
        id: item.id,
        name: item.name,
        location: item.location,
        description: item.description,
      },
    });
    console.log("Item selected: ", item);
  };

  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              item.image ||
              "https://img.icons8.com/ios-filled/50/question-mark.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.location}>
            Location: {item.location.toUpperCase()}
          </Text>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 12,
    color: "#FC5E1A",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});

export default ItemCard;
