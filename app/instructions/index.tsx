import InstructionCard from "@/components/guidance/InstructionCard";
import useGetTranslation from "@/context/TranslationContext";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Instructions() {
  const trans = useGetTranslation();
  const router = useRouter();

  const instructions = [
    {
      title: trans("searchAndFind"),
      image: require("../../assets/icons/instructions/search.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("searchAndFindContent")}
        </Text>
      ),
    },
    {
      title: trans("results"),
      image: require("../../assets/icons/instructions/handgraph.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("resultsContent")}
        </Text>
      ),
    },
    {
      title: trans("certificate"),
      image: require("../../assets/icons/instructions/staptik.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("certificateContent")}
        </Text>
      ),
    },
    {
      title: trans("safetyFirst"),
      image: require("../../assets/icons/instructions/halmettik.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("safetyFirstContent")}
        </Text>
      ),
    },
    {
      title: trans("contact"),
      image: require("../../assets/icons/instructions/mail.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("contactContent")}
        </Text>
      ),
    },
    {
      title: trans("recommend"),
      image: require("../../assets/icons/instructions/handStar.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("recommendContent")}
        </Text>
      ),
    },
    {
      title: trans("solutions"),
      image: require("../../assets/icons/instructions/handLight.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("solutionsContent")}
        </Text>
      ),
    },
    {
      title: trans("didYouKnow"),
      image: require("../../assets/icons/instructions/chat.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("didYouKnowContent")}
        </Text>
      ),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-purple-50 py-12 px-6 items-center justify-center">
        <Text className="text-3xl font-bold text-black text-center mb-6">
          {trans("howToFindANanny")}
        </Text>
        <Text className="text-lg text-primary text-center italic mb-4">
          {trans("agingPeopleQuote")}
        </Text>
        <Text className="text-xl text-gray-600 text-center font-medium">
          Jeanne Moreau
        </Text>
      </View>

      <View className="p-6">
        {instructions.map((item, idx) => (
          <InstructionCard instruction={item} key={idx} number={idx + 1} />
        ))}

        <View className="items-center mt-8 mb-6">
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="bg-primary rounded-lg py-4 px-8"
            style={styles.ctaButton}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {trans("findANannyNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ctaButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 250,
  },
});
