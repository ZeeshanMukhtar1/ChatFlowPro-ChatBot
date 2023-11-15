//  importing the required dependencies for react native
import { View, Text, Image } from 'react-native';

// importing the required dependencies for react
import React from 'react';
import { useState, useEffect, useCallback } from 'react';

// importing the required dependencies for gift chat
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
// importing backend api from services folder
import GlobalApi from '../services/Backend__api.js';

// importing icons
import { FontAwesome } from '@expo/vector-icons';

// importing static bot data
import ChatFaceData from '../services/bot__info.js';

// importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

CHAT_BOT_FACE =
  'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();

  // useEffect hook to initialize the component
  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    CHAT_BOT_FACE = id ? ChatFaceData[id].image : ChatFaceData[0].image;
    setChatFaceColor(ChatFaceData[id].primary);
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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (msg) => {
    setLoading(true);
    GlobalApi.getBardApi(msg).then(
      (resp) => {
        if (resp.data.resp[1].content) {
          setLoading(false);
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
            // fontSize:20,
            padding: 2,
          },
          left: {
            color: '#671ddf',
            // fontSize:20,
            padding: 2,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
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
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
