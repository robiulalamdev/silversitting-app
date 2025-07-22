"use client";

import { Image, StyleSheet, Text, View } from "react-native";

export default function NoSms() {
  return (
    <View
      className="flex-1 justify-center items-center p-6 bg-white rounded-lg shadow-md"
      style={styles.cardShadow}
    >
      <Image
        source={require("../../../assets/icons/profile/sms.png")}
        style={styles.smsIcon}
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-gray-800 mt-6 mb-2 text-center">
        No Messages Yet
      </Text>
      <Text className="text-gray-600 text-base text-center">
        You don't have any conversations in your inbox. Start a new chat to
        connect with others!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smsIcon: {
    width: 80,
    height: 80,
    tintColor: "theme('colors.primary')", // Apply primary color to the icon
  },
});
