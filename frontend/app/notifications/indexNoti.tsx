import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to the community notifications by default
  return <Redirect href="/notifications/communityNotifications" />;
}
