import type {Node} from 'react';
import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Content} from './src/content';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {notifications} from './src/notifications';

const App: () => Node = () => {
  return (
    <View style={styles.container}>
      <Text>Notification test</Text>
      <Content />
    </View>
  );
};

export default App;

function FullScreenActivity(): any {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FullScreen Launch Activity</Text>
    </View>
  );
}

AppRegistry.registerComponent('custom', () => FullScreenActivity);

function FullScreenComponent(): any {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FullScreen Launch Component</Text>
    </View>
  );
}

// does not seem to work
AppRegistry.registerComponent(
  'full-screen-main-component',
  () => FullScreenComponent,
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const notification = notifications.fullScreen;

  await notifee.deleteChannel(notification.android?.channelId || 'default');
  // Create a channel
  await notifee.createChannel({
    id: notification.android?.channelId || 'default',
    name: notification.android?.channelId || 'default',
    importance: notification.android?.importance || AndroidImportance.DEFAULT,
    visibility: notification.android?.visibility || AndroidVisibility.PRIVATE,
    vibration: true,
    sound: notification.android?.sound || 'default',
  });

  try {
    await notifee.displayNotification(notification);
  } catch (e) {
    console.error(e);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
