import type {Node} from 'react';
import React, {useEffect} from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {AndroidVisibility} from '@notifee/react-native/src/types/NotificationAndroid';

const App: () => Node = () => {
  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'fullscreen',
      name: 'Default Channel',
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Testing full-screen notification from foreground',
      android: {
        // Recommended to set a category
        category: AndroidCategory.CALL,
        // Recommended to set importance to high
        importance: AndroidImportance.HIGH,
        fullScreenAction: {
          id: 'default',
          mainComponent: 'custom-component',
        },
        visibility: AndroidVisibility.PUBLIC,
        asForegroundService: true,
        channelId,
      },
    });
  }

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
