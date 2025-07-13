import { formatMessageTime } from "@/utils/format/time";
import { Image, StyleSheet, Text, View } from "react-native";

interface MessageBubbleProps {
  message: {
    sender: string;
    text: string;
    createdAt: string | number;
  };
  isOwnMessage: boolean;
  senderProfileImage?: string;
}

export default function MessageBubble({
  message,
  isOwnMessage,
  senderProfileImage,
}: MessageBubbleProps) {
  return (
    <View
      className={`flex-row items-end mb-6 ${isOwnMessage ? "justify-end" : "justify-start"}`}
      style={
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
      }
    >
      {!isOwnMessage && senderProfileImage && (
        <Image
          source={{ uri: senderProfileImage }}
          style={styles.profileImage}
          className="rounded-full mr-2"
        />
      )}
      <View
        className={`p-4 rounded-lg max-w-[75%] ${isOwnMessage ? "bg-primary self-end" : "bg-purple-100 self-start"}`}
        style={isOwnMessage ? styles.ownBubble : styles.otherBubble}
      >
        <Text
          className={`text-base ${isOwnMessage ? "text-white" : "text-gray-800"}`}
        >
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${isOwnMessage ? "text-purple-200" : "text-gray-500"} ${
            isOwnMessage ? "text-right" : "text-left"
          }`}
        >
          {formatMessageTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
  },
  ownMessageContainer: {
    // Specific styles for the container of own messages if needed
  },
  otherMessageContainer: {
    // Specific styles for the container of other messages if needed
  },
  ownBubble: {
    borderBottomRightRadius: 0, // To create the "tail" effect
  },
  otherBubble: {
    borderBottomLeftRadius: 0, // To create the "tail" effect
  },
});
