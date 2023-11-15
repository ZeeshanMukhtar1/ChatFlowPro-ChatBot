// Importing necessary dependencies for React and React Native
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing backend API from the services folder
import GlobalApi from '../services/Backend__api.js';

// Importing static bot data
import ChatFaceData from '../services/bot__info.js';

// Setting a default chat bot face
let CHAT_BOT_FACE =
  'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';

// Main ChatScreen component
export default function ChatScreen() {
  // State variables
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();

  // useEffect hook to initialize the component
  useEffect(() => {
    checkFaceId();
  }, []);

  // Function to check and set the selected chat face based on stored ID
  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    CHAT_BOT_FACE = id ? ChatFaceData[id].image : ChatFaceData[0].image;
    setChatFaceColor(ChatFaceData[id].primary);

    // Setting the initial greeting message
    setMessages([
      {
        _id: 1,
        text:
          'Greetings 🤝, I am ' +
          ChatFaceData[id].name +
          ', How Can I assist  you today ?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  // Function to handle the send action
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  // Function to get the response from the backend API
  const getBardResp = (msg) => {
    setLoading(true);

    // Calling the backend API
    GlobalApi.getBardApi(msg).then(
      (resp) => {
        if (resp.data.resp[1].content) {
          setLoading(false);

          // If a valid response is received, append it to the messages
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.data.resp[1].content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp)
          );
        } else {
          setLoading(false);

          // If no valid response, send a default sorry message
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: 'Sorry, I can not help with it',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp)
          );
        }
      },
      (error) => {}
    );
  };

  // Function to render chat bubbles with custom styling
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#671ddf',
          },
          left: {},
        }}
        textStyle={{
          right: {
            padding: 2,
          },
          left: {
            color: '#000',
            padding: 2,
          },
        }}
      />
    );
  };

  // Function to render the input toolbar with custom styling
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 3,
          backgroundColor: '#671ddf',
          color: '#fff',
        }}
        textInputStyle={{ color: '#fff' }}
      />
    );
  };

  // Function to render the send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome
            name="send"
            size={24}
            color="white"
            resizeMode={'center'}
          />
        </View>
      </Send>
    );
  };

  // Return statement with JSX for rendering the chat screen
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </View>
  );
}

// Styles object
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
