import type {Node} from 'react';
import React, {useEffect} from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const App: () => Node = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const token = messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        // Recommended to set a category
        category: AndroidCategory.CALL,
        // Recommended to set importance to high
        importance: AndroidImportance.HIGH,
        fullScreenAction: {
          id: 'default',
        },
        channelId,
      },
    });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Notification test</Text>
        <Button title="Test" onPress={onDisplayNotification} />
      </View>
    </SafeAreaView>
  );
};

export default App;
