// Importing necessary modules from React Navigation and React Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';

// Import the components for Home and Chat screens
import HomeScreen from '../Screens/Home';
import ChatScreen from '../Screens/Chat';

// Creating a stack navigator using createNativeStackNavigator
const Stack = createNativeStackNavigator();

// Defining the navigation structure for the Home Screen and Chat Screen
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{}}>
      {/* Home Screen */}
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide the header for the Home Screen
      />

      {/* Chat Screen */}
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
