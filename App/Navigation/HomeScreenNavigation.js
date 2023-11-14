import { View, Text } from 'react-native';
import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
}
