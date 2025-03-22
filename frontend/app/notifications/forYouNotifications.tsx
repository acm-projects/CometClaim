import { View, ScrollView } from "react-native";
import { Notification } from "@/components/Notification";

export default function ForYouNotificationScreen() {
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingBottom: 80,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/9D8BF924-005A-4CF2-B90A-38A55D35831E.jpg" />
      </ScrollView>
    </View>
  );
}
