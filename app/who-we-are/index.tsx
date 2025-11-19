import useGetTranslation from "@/context/TranslationContext"; // Import your actual translation hook
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function WhoWeAre() {
  const trans = useGetTranslation();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Family Image */}
        <View className="mb-8">
          <Image
            source={require("../../assets/images/who-we-are/family.png")}
            style={styles.familyImage}
            className="w-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Content Section */}
        <View className="space-y-8">
          {/* Who We Are Section */}
          <View>
            <Text className="text-3xl font-bold text-gray-800 mb-4">
              {trans("whoWeAreTitle")}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed mb-8">
              {trans("whoWeAreContent")}
            </Text>
          </View>

          {/* The Origin of the Idea Section */}
          <View>
            <Text className="text-3xl font-bold text-gray-800 mb-4">
              {trans("originOfIdeaTitle")}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed mb-6">
              {trans("originOfIdeaContent")}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {trans("connectingGenerationsContent")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  familyImage: {
    height: 250, // Adjust height as needed
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
