import useGetTranslation from "@/context/TranslationContext";
import { Text, View } from "react-native";

export default function TermsBanner() {
  const trans = useGetTranslation();

  return (
    <View className="bg-primary py-8 px-6">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        {trans("bannerTitleAGB")}
      </Text>
      <View className="bg-white/10 rounded-lg p-4">
        <View className="space-y-2">
          {trans("listItems")?.map(
            (item: string, idx: number) =>
              idx > 0 && (
                <Text key={idx} className="text-white text-sm leading-relaxed">
                  • {item}
                </Text>
              )
          )}
        </View>
      </View>
    </View>
  );
}
