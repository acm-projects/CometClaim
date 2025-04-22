
/*
  Push Notifications 
  (only local notifications for Expo Go as of 4/08/25)

  TODO: Test on android device, line 30
  TODO: Would it be better for notification faster than 3 seconds?
*/

import React, { useEffect } from 'react';
import { View, Text, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


export default function PushNotificationTester() {
  useEffect(() => {
    //Request permission
    requestNotificationPermission();
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Welcome to CometClaim! ☄️',
      'Thanks for joining! We hope you find all your lost items!',
      [{ text: 'OK' }]  // Buttons for the alert
    );
  };

  //Checks for permission
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please enable notifications to receive alerts!');
      }
    }
  };

  //Android specific settings
  const sendLocalNotification = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    console.log("CLICKED")
    showAlert();
    //"Welcome to CometClaim" default notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Welcome to CometClaim! ☄️',
        body: 'Thanks for joining! We hope you find all your lost items!',
      },
      trigger: {
        seconds: 0,
        repeats: false,
        type: 'timeInterval',
      } as Notifications.TimeIntervalTriggerInput,
    });
  };

  //Notification button for testing! :)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18, textAlign: 'center' }}>
        Press the button for a notification in about 3 seconds.
      </Text>
      <Button title="Send Notification" onPress={sendLocalNotification} />
    </View>
  );
}

