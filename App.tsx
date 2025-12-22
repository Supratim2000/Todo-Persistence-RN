import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <RootStackNavigator />
        </GestureHandlerRootView>
      </Provider>
    </NavigationContainer>
  );
}


export default App;
