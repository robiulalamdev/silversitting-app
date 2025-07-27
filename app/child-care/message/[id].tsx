// import ChattingScreen from "@/components/child-care/message/Chatting";
// import { useLocalSearchParams } from "expo-router";
// import React from "react";

// const MessageScreen = () => {
//   const params = useLocalSearchParams();
//   let id = params.id ?? "";
//   if (Array.isArray(id)) {
//     id = id[0] ?? "";
//   }
//   return <ChattingScreen receiverId={id} />;
// };

// export default MessageScreen;

import React from "react";
import { Text, View } from "react-native";

const MessageScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-purple-50">
      <Text className="text-lg font-semibold text-primary mb-2">
        Messaging Coming Soon!
      </Text>
      <Text className="text-gray-600 text-center">
        We're working hard to bring you a great messaging experience. Please
        check back later.
      </Text>
    </View>
  );
};

export default MessageScreen;
