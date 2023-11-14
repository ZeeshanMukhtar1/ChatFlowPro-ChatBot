import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

export default function Chat() {
  const param = useRoute().params;

  useEffect(() => {
    console.log(param.selectedFace.name);
  }, []);

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}
