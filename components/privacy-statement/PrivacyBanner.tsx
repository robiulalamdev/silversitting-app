"use client";

import useGetTranslation from "@/hooks/useGetTranslation";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface PrivacyBannerProps {
  activeSection: string;
  onSectionPress: (section: string) => void;
}

export default function PrivacyBanner({
  activeSection,
  onSectionPress,
}: PrivacyBannerProps) {
  const trans = useGetTranslation();

  const sections = [
    { key: "general", label: trans("generalInformation") },
    { key: "purpose", label: trans("dataCollectionPurpose") },
    { key: "collection", label: trans("dataCollectionByOperator") },
    { key: "thirdParty", label: trans("dataCollectionByThirdParties") },
    { key: "security", label: trans("dataSecurity") },
    { key: "rights", label: trans("rightToObject") },
  ];

  return (
    <View className="bg-primary py-8 px-4">
      <Text className="text-2xl font-bold text-white text-center mb-6">
        {trans("bannerTitle")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <View className="flex-row gap-x-3 px-2">
          {sections.map((section) => (
            <TouchableOpacity
              key={section.key}
              onPress={() => onSectionPress(section.key)}
              className={`px-4 py-2 rounded-full min-w-32 ${
                activeSection === section.key
                  ? "bg-white"
                  : "bg-primary-dark border border-white/30"
              }`}
            >
              <Text
                className={`text-sm font-medium text-center ${
                  activeSection === section.key ? "text-primary" : "text-white"
                }`}
                numberOfLines={2}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
