import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// Function to request notification permission
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert('Permission Required', 'Please enable notifications to receive alerts!');
    }
  }
};

const showAlert = () => {
    Alert.alert(
      'Welcome to CometClaim! ☄️',
      'Thanks for joining! We hope you find all your lost items!',
      [{ text: 'OK' }]  // Buttons for the alert
    );
  };

// Function to send a local notification
export const sendLocalNotification = async () => {
  // Android specific settings (notification channel)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  showAlert()

  // Send the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Welcome to CometClaim! ☄️',
      body: 'Thanks for joining! We hope you find all your lost items!',
    },
    trigger: {
        seconds: 3,
        repeats: false,
        type: 'timeInterval',
      } as Notifications.TimeIntervalTriggerInput,
  });
};
