import ChattingScreen from "@/components/child-care/message/Chatting";
import { useAuth } from "@/hooks/useAuth";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const MessageScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  let id = params.id ?? "";
  if (Array.isArray(id)) {
    id = id[0] ?? "";
  }

  if (id && id === user?._id) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
    return null;
  }

  if (id) {
    return <ChattingScreen receiverId={id} />;
  } else {
    return null;
  }
};

export default MessageScreen;
