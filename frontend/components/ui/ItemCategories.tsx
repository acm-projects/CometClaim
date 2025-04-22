import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import ZoomableImage from "./ZoomableImage";

type CategoryItem = {
  id: string;
  name: string;
  icon: string;
};

interface ItemCategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string) => void;
}

const ItemCategoryFilter: React.FC<ItemCategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Select by Category</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => onCategoryChange(category.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                activeCategory === category.id && styles.activeIconContainer,
              ]}
            >
              <ZoomableImage uri={category.icon} size={60} />
            </View>
            <Text
              style={[
                styles.categoryName,
                activeCategory === category.id && styles.activeCategoryName,
              ]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#FF5722", // Using the orange color from your app
    fontWeight: "500",
  },
  scrollContainer: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    width: 70,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeIconContainer: {
    borderColor: "#FF5722",
    borderWidth: 2,
  },
  icon: {
    width: 40,
    height: 40,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  activeCategoryName: {
    color: "#FF5722",
    fontWeight: "500",
  },
});

export default ItemCategoryFilter;
