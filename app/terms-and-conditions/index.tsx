import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl mb-4">⏳</Text>
        <Text className="text-2xl font-bold text-gray-800 text-center">
          Coming Soon
        </Text>
        <Text className="text-center text-gray-500 mt-2">
          This page is under construction.
        </Text>
      </View>
    </SafeAreaView>
  );
}
