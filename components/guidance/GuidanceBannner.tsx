import useGetTranslation from "@/context/TranslationContext";
import { StyleSheet, Text, View } from "react-native";

export default function GuidanceBanner() {
  const trans = useGetTranslation();
  const { currentLanguage } = trans;

  return (
    <View
      className="bg-primary py-12 px-6 items-center justify-center"
      style={styles.banner}
    >
      <Text className="text-3xl font-bold text-white text-center mb-6">
        {trans("guidanceBannerTitle")}
        {currentLanguage === "en" && "\n"}
        {currentLanguage === "de" && " um Kinder kümmern?\n"}
        {trans("readHowToBecome")}
      </Text>
      <Text className="text-lg text-purple-200 text-center italic mb-4">
        "{trans("guidanceBannerQuote")}"
      </Text>
      <Text className="text-base text-purple-300 text-center font-semibold">
        {trans("guidanceBannerAuthor")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    minHeight: 200,
  },
});
