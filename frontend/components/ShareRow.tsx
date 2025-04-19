import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { User } from "@/types";
import { useState } from "react";

type ShareRowProps = {
  user: User;
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export function ShareRow({ user, setSelectedUsers }: ShareRowProps) {
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(value: boolean) {
    setChecked(value);
    if (value) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) => prev.filter((usr) => usr !== user));
    }
  }

  return (
    <Pressable
      style={{ ...styles.shareRow, }}
      onPress={() => handleCheckboxChange(!checked)}
    >
      <Checkbox
        style={{ width: 24, height: 24, position: "absolute", left: 0 }}
        value={checked}
      />
      {user.profile_picture ? (
        <Image
          source={{
            uri: user.profile_picture,
          }}
          style={{
            borderRadius: "50%",
            position: "absolute",
            left: 40,
            height: 40,
            width: 40,
          }}
        />
      ) : (
        <FontAwesome
          name="user-circle"
          size={39}
          color={"gray"}
          style={{
            position: "absolute",
            left: 40,
          }}
        />
      )}
      <Text style={{ position: "absolute", left: 100 }}>{user.username}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shareRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    margin: 10,
    height: 40,
    width: '80%'
  },
  testBorder: {
    borderColor: "black",
    borderWidth: 1,
  },
});
