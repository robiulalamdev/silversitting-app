import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const MessageScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ID: {id}</Text>
    </View>
  );
};

export default MessageScreen;
