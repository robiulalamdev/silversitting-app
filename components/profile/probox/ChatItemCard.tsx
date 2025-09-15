import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import {
  useGetMessageByConversationQuery,
  usePutMessageSeenMutation,
} from "@/redux/features/chat/chatApi";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";

interface ChatItemCardProps {
  members: string[];
  conversationId: string;
}

export default function ChatItemCard({
  members,
  conversationId,
}: ChatItemCardProps) {
  const trans = useGetTranslation();

  const router = useRouter();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);

  const [putMessageSeen] = usePutMessageSeenMutation();

  const otherUserId = members?.find((memberId) => user?._id !== memberId);

  const { data: otherUserInfo, isLoading: otherUserInfoLoading } =
    useGetSingleUserQuery(otherUserId || "", {
      skip: !otherUserId,
    });

  const { data: messages, isLoading: messagesLoading } =
    useGetMessageByConversationQuery(conversationId, {
      skip: !conversationId,
      pollingInterval: 5000, // Poll for new messages every 5 seconds for unread count
    });

  useEffect(() => {
    if (otherUserInfo) {
      setUserInfo(otherUserInfo);
    }
  }, [otherUserInfo]);

  const handleSeenMessage = () => {
    if (otherUserId && conversationId) {
      putMessageSeen({ senderId: otherUserId, conversationId });
    }
  };

  const handleChatPress = () => {
    handleSeenMessage();
    if (userInfo?._id) {
      router.push({
        pathname: "/child-care/message/[id]",
        params: { id: userInfo._id },
      });
    }
  };

  const unreadMessagesCount =
    messages?.filter((msg: any) => msg.sender !== user?._id && !msg.seen)
      .length || 0;

  if (otherUserInfoLoading) {
    return (
      <View
        className="p-4 bg-white rounded-lg shadow-md flex-row items-center justify-center"
        style={styles.cardShadow}
      >
        <ActivityIndicator size="small" color="theme('colors.primary')" />
        <Text className="ml-2 text-gray-600">Loading conversation...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleChatPress}
      className="p-6 bg-purple-50 rounded-lg shadow-md items-center"
      style={styles.cardShadow}
    >
      <Image
        source={
          userInfo?.image
            ? { uri: userInfo.image }
            : require("../../../assets/icons/profile/sms.png")
        }
        style={styles.profileImage}
        className="rounded-full mb-4"
      />
      <Text className="text-base font-semibold text-primary mb-1">
        {trans("Conversationwith")}
      </Text>
      {userInfo && (
        <Text className="text-lg font-bold text-gray-800 text-center mb-6">
          {userInfo?.firstName} {userInfo?.lastName}
        </Text>
      )}
      <View className="relative">
        <Image
          source={require("../../../assets/icons/profile/sms.png")}
          style={styles.smsIcon}
          resizeMode="contain"
        />
        {unreadMessagesCount > 0 && (
          <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 justify-center items-center">
            <Text className="text-white text-xs font-bold">
              {unreadMessagesCount} {trans("unreadmessages")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
  },
  smsIcon: {
    width: 40,
    height: 40,
    tintColor: "theme('colors.primary')", // Apply primary color to the icon
  },
});
