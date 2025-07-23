import { Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-white dark:bg-black px-4">
        <Text className="text-2xl font-semibold text-primary mb-4">
          Page Not Found
        </Text>
        <Text className="text-base text-gray-500 mb-6 text-center px-5">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Pressable
          onPress={() => router.replace("/")}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white text-base font-medium">Go Home</Text>
        </Pressable>
      </View>
    </>
  );
}
