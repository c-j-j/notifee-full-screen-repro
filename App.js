import type {Node} from 'react';
import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Content} from './src/content';

const App: () => Node = () => {
  return (
    <View style={styles.container}>
      <Text>Notification test</Text>
      <Content />
    </View>
  );
};

export default App;

function FullScreenComponent(): any {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FullScreen Launch Activity</Text>
    </View>
  );
}

AppRegistry.registerComponent('custom', () => FullScreenComponent);

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
