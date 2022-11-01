/**
 * @format
 */

import React from 'react';
import {AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
import {AndroidVisibility} from '@notifee/react-native/src/types/NotificationAndroid';

AppRegistry.registerComponent(appName, () => App);

function CustomComponent() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Text>A custom component</Text>
    </View>
  );
}

AppRegistry.registerComponent('custom', () => CustomComponent);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'fullscreen',
    name: 'Default Channel',
    visibility: AndroidVisibility.PUBLIC,
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Testing full screen notification from background',
    android: {
      // Recommended to set a category
      category: AndroidCategory.CALL,
      // Recommended to set importance to high
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
        launchActivity: 'com.awesomeproject.CustomActivity',
      },
      visibility: AndroidVisibility.PUBLIC,
      channelId,
    },
  });
  console.log('Message handled in the background!', remoteMessage);
});
