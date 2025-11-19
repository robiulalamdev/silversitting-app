"use client";

import PrivacyBanner from "@/components/privacy-statement/PrivacyBanner";
import PrivacySection from "@/components/privacy-statement/PrivacySection";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export default function PrivacyStatement() {
  const [activeSection, setActiveSection] = useState("general");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSectionPress = (section: string) => {
    setActiveSection(section);
    // Scroll to top when section changes
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <PrivacyBanner
        activeSection={activeSection}
        onSectionPress={handleSectionPress}
      />

      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-100 p-6">
          <PrivacySection section={activeSection} />
        </View>
      </ScrollView>
    </View>
  );
}
