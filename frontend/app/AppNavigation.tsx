import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfilePage from "@/app/(tabs)/ProfilePage"; // Import ProfilePage screen
import EditProfile from "@/app/(tabs)/EditProfile"; // Import EditProfile screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
