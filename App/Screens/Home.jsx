//  importing required libraries and modules
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//  react material
import React, { useState, useEffect } from 'react';
//  this is static data from services
import ChatFaceData from '../services/bot__info';
import AsyncStorage from '@react-native-async-storage/async-storage';
// navigation used for navigating fron one screen to another
import { useNavigation } from '@react-navigation/native';

// Function component for the Home Screen
export default function HomeScreen() {
  // State variables using the useState hook
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);
  const navigation = useNavigation();

  // useEffect hook to initialize the component
  useEffect(() => {
    setChatFaceData(ChatFaceData);
    checkFaceId();
  }, []);

  // Function to check and set the selected chat face based on stored ID
  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    // If ID exists, set the selected chat face; otherwise, set the first one
    id
      ? setSelectedChatFace(ChatFaceData[id])
      : setSelectedChatFace(ChatFaceData[0]);
  };

  // Function to handle the press event when a chat face is selected
  const onChatFacePress = async (id) => {
    // Set the selected chat face and store the ID
    setSelectedChatFace(ChatFaceData[id - 1]);
    await AsyncStorage.setItem('chatFaceId', (id - 1).toString());
  };

  // Rendering the UI components
  return (
    <View style={styles.container}>
      {/* Greeting text */}
      <Text style={[styles.greetingText, { color: selectedChatFace?.primary }]}>
        Hey,
      </Text>
      {/* Name text */}
      <Text style={[styles.nameText, { color: selectedChatFace?.primary }]}>
        I am {selectedChatFace.name} here
      </Text>
      {/* Chat face image */}
      <Image
        source={{ uri: selectedChatFace.image }}
        style={styles.chatImage}
      />
      {/* Help text */}
      <Text style={styles.helpText}>How Can I help you today?</Text>

      {/* Container for selecting chat buddies */}
      <View style={styles.chatListContainer}>
        {/* FlatList for rendering chat buddies */}
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            item.id !== selectedChatFace.id && (
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => onChatFacePress(item.id)}
              >
                {/* Chat buddy image */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.chatBuddyImage}
                />
              </TouchableOpacity>
            )
          }
        />
        {/* Text indicating to choose a favorite chat buddy */}
        <Text style={styles.chooseBuddyText}>Select Your Fav Chat-Bot</Text>
      </View>

      {/* Button to navigate to the chat screen */}
      <TouchableOpacity
        style={[
          styles.letsChatButton,
          { backgroundColor: selectedChatFace.primary },
        ]}
        onPress={() => navigation.navigate('chat')}
      >
        {/* Text on the button */}
        <Text style={styles.letsChatText}>Unlock the conversation!</Text>
      </TouchableOpacity>
    </View>
  );
}

// Separate CSS object for styles
const styles = {
  container: {
    alignItems: 'center',
    paddingTop: 100,
  },
  greetingText: {
    fontSize: 30,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  chatImage: {
    height: 150,
    width: 150,
    marginTop: 30,
  },
  helpText: {
    marginTop: 50,
    fontSize: 25,
  },
  chatListContainer: {
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: 130,
    padding: 10,
    borderRadius: 10,
  },
  chatBuddyImage: {
    width: 40,
    height: 40,
  },
  chooseBuddyText: {
    marginTop: 5,
    fontSize: 17,
    color: 'gray',
  },
  letsChatButton: {
    marginTop: 50,
    padding: 17,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 50,
    alignItems: 'center',
  },
  letsChatText: {
    fontSize: 18,
    color: '#fff',
  },
};
