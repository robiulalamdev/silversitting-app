import { ActivityIndicator, FlatList, Text, View } from "react-native";

import ChatItemCard from "@/components/profile/probox/ChatItemCard";
import NoSms from "@/components/profile/probox/NoSms";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useGetConversationByUserQuery } from "../../redux/features/chat/chatApi";

export default function ProBoxScreen() {
  const { user, isAuthenticated, setRedirectPath } = useAuth();
  const { data, isLoading, isSuccess, isError } = useGetConversationByUserQuery(
    user?._id || "",
    {
      skip: !user?._id, // Skip the query if user ID is not available
    }
  );

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const fullPath = "/" + segments.join("/");
      setRedirectPath(fullPath); // store complete path
      router.replace("/auth/login"); // replace with login
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50">
        <ActivityIndicator size="large" color="theme('colors.primary')" />
        <Text className="text-gray-600 mt-2">Loading conversations...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50 p-4">
        <Text className="text-red-500 text-center">
          Failed to load conversations. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      {data && data.length > 0 && isSuccess ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="mb-4">
              <ChatItemCard
                members={item?.members}
                conversationId={item?._id}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }} // Add some padding at the bottom
        />
      ) : (
        <NoSms />
      )}
    </View>
  );
}
