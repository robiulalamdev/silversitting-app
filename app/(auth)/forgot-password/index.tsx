import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const ForgotPassword = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl mb-4">🔑</Text>
        <Text className="text-2xl font-bold text-gray-800 text-center">
          Forgot Password
        </Text>
        <Text className="text-center text-gray-500 mt-2">
          Coming Soon — this page is under construction.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
