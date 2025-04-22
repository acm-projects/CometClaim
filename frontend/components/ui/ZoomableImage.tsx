// components/ui/ZoomableImage.tsx
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import ImageViewing from "react-native-image-viewing";

interface Props {
  uri: string;
  size?: number; // thumb size
}

export default function ZoomableImage({ uri, size = 60 }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: 8 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <ImageViewing
        images={[{ uri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        presentationStyle="overFullScreen" // iOS
        backgroundColor="black"
      />
    </>
  );
}
