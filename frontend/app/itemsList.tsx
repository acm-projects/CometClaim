import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Image } from 'expo-image'
import Constants from "expo-constants";

interface Item {
  item_id: string;
  category: string;
  date_reported: string;
  description: string;
  location: string;
  reporter_id: string;
  status: string;
  image_url?: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ItemsListPage() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`${apiUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setItems(JSON.parse(data.body));
      console.log(data);
    };
    getItems();
  }, []);

  return (
    <ScrollView>
      <View style={{ height: 100 }} />
      {items && items.length > 0 ? (
        items.map((item: Item) => (
          <View
            key={item.item_id}
            style={{ marginBottom: 10, backgroundColor: "black", flex: 1 }}
          >
            {item.image_url && (
              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderColor: "red",
                  borderWidth: 10,
                }}
                alt="TESTING"
              />
            )}

            {Object.keys(item).map((key: any) => {
              if (key == "image_url") return null;
              return (
                <View key={key}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                      color: "#fff",
                    }}
                  >
                    {key.replace("_", " ").toUpperCase() +
                      ": " +
                      item[key as keyof Item]}
                  </Text>
                </View>
              );
            })}
          </View>
        ))
      ) : (
        <Text style={{ color: "red" }}>No items found</Text>
      )}
      <Button title="Thing" onPress={() => console.log(items)}></Button>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
