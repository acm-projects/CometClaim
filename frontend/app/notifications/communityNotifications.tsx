import { ScrollView, Text, View } from "react-native";
import { Notification } from "@/components/Notification";

export default function CommunityNotificationScreen() {
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
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
        <Notification image="https://cometclaim-image-bucket.s3.us-east-1.amazonaws.com/uploads/41CD8854-297E-4634-9718-E914C5E98BBA.jpg" />
      </ScrollView>
    </View>
  );
}
