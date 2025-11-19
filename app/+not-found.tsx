import useGetTranslation from "@/context/TranslationContext";
import { Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  const trans = useGetTranslation();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-white dark:bg-black px-4">
        <Text className="text-2xl font-semibold text-primary mb-4">
          {trans("notFoundTitle")}
        </Text>
        <Text className="text-base text-gray-500 mb-6 text-center px-5">
          {trans("notFoundDescription")}
        </Text>
        <Pressable
          onPress={() => router.replace("/")}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white text-base font-medium">
            {trans("notFoundBackButton")}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
