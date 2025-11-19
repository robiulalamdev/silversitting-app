import GuidanceBanner from "@/components/guidance/GuidanceBannner";
import InstructionCard from "@/components/guidance/InstructionCard";
import useGetTranslation from "@/hooks/useGetTranslation";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Guidance() {
  const trans = useGetTranslation();
  const router = useRouter();

  const instructions = [
    {
      title: trans("firstImpressionCounts"),
      image: require("../../assets/icons/guidance/erster.png"),
      content: (
        <View>
          <Text className="text-base text-gray-700 leading-relaxed text-center mb-4">
            {trans("writeAboutYourself")}{" "}
            <Text
              className="text-primary font-semibold"
              onPress={() => router.push("/auth/register")}
            >
              {trans("registered")}
            </Text>{" "}
            {trans("writeAboutYourself2")}.
          </Text>
          <Text className="text-base text-gray-700 leading-relaxed text-center">
            {trans("parentsHaveOpportunity")}{" "}
            <Text
              className="text-primary font-semibold"
              onPress={() => router.push("/child-care")}
            >
              {trans("clickHere")}
            </Text>
            .
          </Text>
        </View>
      ),
    },
    {
      title: trans("veryImportant"),
      image: require("../../assets/icons/guidance/idee.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("profileInformationImportant")}.
        </Text>
      ),
    },
    {
      title: trans("howtocontinue"),
      image: require("../../assets/icons/guidance/wegweiser.png"),
      content: (
        <View>
          <Text className="text-base text-gray-700 leading-relaxed text-center mb-4">
            {trans("ifProfileInterestParents")}.
          </Text>
          <Text className="text-base text-gray-700 leading-relaxed text-center">
            {trans("asSoonAsParentsSendMessage")}.
          </Text>
        </View>
      ),
    },
    {
      title: trans("freeofcharge"),
      image: require("../../assets/icons/guidance/free.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("weWouldLikeToPointOutAgain")}.
        </Text>
      ),
    },
    {
      title: trans("yourMotivation"),
      image: require("../../assets/icons/guidance/thankful.png"),
      content: (
        <Text className="text-base text-gray-700 leading-relaxed text-center">
          {trans("aChildsLaughterAndThankYou")}
        </Text>
      ),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <GuidanceBanner />

      <View className="p-6">
        {instructions.map((item, idx) => (
          <InstructionCard instruction={item} key={idx} number={idx + 1} />
        ))}

        <View className="items-center mt-8 mb-6">
          <TouchableOpacity
            onPress={() => router.push("/auth/register")}
            className="bg-primary rounded-lg py-4 px-8"
            style={styles.ctaButton}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {trans("becomeAChildcarerNow")}
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
