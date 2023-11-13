import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import ChatFaceData from '../services/chatFaceData';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
export default function Home() {
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFace(ChatFaceData[0]);
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 90,
      }}
    >
      <Text
        // [] is used to give the multiple inline styles
        style={[
          {
            color: selectedChatFace?.primary,
          },
          {
            fontSize: 30,
          },
        ]}
      >
        Hello
      </Text>
      <Text
        style={[
          {
            color: selectedChatFace?.primary,
          },
          {
            fontSize: 30,
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          },
        ]}
      >
        I am {selectedChatFace?.name}
      </Text>
      <Image
        source={{
          uri: selectedChatFace?.image,
        }}
        style={{
          width: 200,
          height: 200,
          marginTop: 30,
        }}
      />
      <Text
        style={{
          fontSize: 25,
          marginTop: 30,
        }}
      >
        How can i help you?{' '}
      </Text>
      {/* flatlist */}
      <View
        style={{
          marginTop: 30,
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          height: 110,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            selectedChatFace.id != item.id && (
              <TouchableOpacity
                onPress={() => setSelectedChatFace(item)}
                style={{
                  margin: 15,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            )
          }
        />
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 15,
          color: '#b0b0b0',
        }}
      >
        Please select the chat Bot to start the conversation
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
