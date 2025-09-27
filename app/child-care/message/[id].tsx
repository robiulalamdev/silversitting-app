import ChattingScreen from "@/components/child-care/message/Chatting";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MessageScreen = () => {
  const params = useLocalSearchParams();
  let id = params.id ?? "";
  if (Array.isArray(id)) {
    id = id[0] ?? "";
  }
  return <ChattingScreen receiverId={id} />;
};

export default MessageScreen;
