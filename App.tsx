import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootStackNavigator from './src/navigation/RootStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}


export default App;
