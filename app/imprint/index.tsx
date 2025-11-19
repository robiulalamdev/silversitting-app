import useGetTranslation from "@/context/TranslationContext";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ImprintScreen() {
  const trans = useGetTranslation();

  const handleEmailPress = () => {
    Linking.openURL("mailto:info@silversitting.com").catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          {/* According to TMG Section */}
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {trans("accordingToTMG")}
          </Text>

          {/* Address Section */}
          <View className="mb-6">
            <Text className="text-base text-gray-700 leading-relaxed">
              {trans("silverSittingAddress1")}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {trans("silverSittingAddress2")}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {trans("silverSittingAddress3")}
            </Text>
          </View>

          {/* VAT ID Section */}
          <Text className="text-xl font-bold text-primary mb-6">
            {trans("vatId")}: DE327967812
          </Text>

          {/* Represented by Section */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            {trans("representedBy")}
          </Text>
          <View className="mb-6">
            <Text className="text-base text-gray-700 leading-relaxed">
              Andrea Monninger
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              Daniel Monninger
            </Text>
          </View>

          {/* Contact Section */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            {trans("contact")}
          </Text>
          <TouchableOpacity onPress={handleEmailPress} className="self-start">
            <Text className="text-base text-primary font-medium underline">
              {trans("emailAddress")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
