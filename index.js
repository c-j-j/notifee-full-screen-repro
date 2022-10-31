/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';

AppRegistry.registerComponent(appName, () => App);
// Register background handler

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

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
  console.log('Message handled in the background!', remoteMessage);
});
