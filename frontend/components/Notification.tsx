import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface NotificationProps {
  image: string;
}

export function Notification(props: NotificationProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: "92%",
        /*borderColor: 'red', borderWidth: 1,*/ alignSelf: "center",
        marginVertical: 8,
      }}
    >
      <View style={{ flexBasis: "14.4%", justifyContent: "center" }}>
        <FontAwesome name="user-circle" size={45} color={"gray"} style={{}} />
      </View>

      <View style={{ flexBasis: "67.4%", flex: 1, justifyContent: "center" }}>
        <View style={{ flexDirection: "row", margin: "1%" }}>
          <Text>Username</Text>
          <Text> </Text>
          <Text style={{ color: "#676767" }}>2m</Text>
        </View>
        <View style={{ margin: "1%", paddingTop: "2%" }}>
          <Text>
            I lost this item at the ECSS around 7 PM coming into class.
          </Text>
        </View>
      </View>

      <View
        style={{
          flexBasis: "18.2%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Image
          source={props.image}
          style={{ borderRadius: 9, width: 50, height: 50 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
