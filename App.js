// Importing necessary modules from React Native
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Importing components and navigation
import Chat from './App/Screens/Chat';
import Home from './App/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './App/Navigation/Navigation';

// Define the main App component
export default function App() {
  return (
    // Main container for the entire app
    <View style={styles.container}>
      {/* Navigation container to manage app navigation */}
      <NavigationContainer>
        {/* Navigate between Home and Chat screens */}
        <Navigation />
      </NavigationContainer>
    </View>
  );
}

// Styles for the main container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
