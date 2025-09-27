"use client";

import useGetTranslation from "@/hooks/useGetTranslation";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

export default function ChildrenProviderFaq() {
  const trans = useGetTranslation();
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({ 1: true });

  const handlePress = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      id: 1,
      question: trans("RequiredAgeCondition"),
      answer: trans("RequiredAgeConditionAnswer"),
    },
    {
      id: 2,
      question: trans("FirstChildcarePreparation"),
      answer: trans("FirstChildcarePreparationAnswer"),
    },
    {
      id: 3,
      question: trans("ChildcareProcessAndCosts"),
      answer: trans("ChildcareProcessAndCostsAnswer"),
    },
    {
      id: 4,
      question: trans("PersonalDataAccessibility"),
      answer: trans("PersonalDataAccessibilityAnswer"),
    },
    {
      id: 5,
      question: trans("SilverSittingChildCarersSelection"),
      answer: trans("SilverSittingChildCarersSelectionAnswer"),
    },
    {
      id: 6,
      question: trans("EarningMoneyWithChildcare"),
      answer: trans("EarningMoneyWithChildcareAnswer"),
    },
    {
      id: 7,
      question: trans("UnsubscribeFromPlatform"),
      answer: trans("UnsubscribeFromPlatformAnswer"),
    },
  ];

  // Function to strip HTML tags and render as plain text
  const stripHtmlTags = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  return (
    <ScrollView className="flex-1 bg-purple-50">
      {/* Banner Section */}
      <View className="relative">
        <Image
          source={require("../../assets/images/childrenProviderFaq/faq-banner.png")}
          resizeMode="cover"
          className="h-[150px] w-full"
        />
        <View className="absolute w-full h-full items-center justify-center">
          <View className="bg-white/80 p-8 rounded-lg">
            <Text className="text-3xl font-bold text-primary text-center">
              {trans.currentLanguage === "de" ? (
                <Text>{trans("FaqForChildcareProvider")}</Text>
              ) : (
                <Text>
                  {trans("FaqForChildcare")}
                  {"\n"}
                  {trans("Provider")}
                </Text>
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View className="p-4">
        {faqs.map((item) => (
          <View key={item.id} className="mb-2">
            <List.Accordion
              title={item.question}
              expanded={expandedItems[item.id]}
              onPress={() => handlePress(item.id)}
              style={styles.accordionItem}
              titleStyle={styles.accordionTitle}
              titleNumberOfLines={0} // Allow multi-line titles
            >
              <View className="bg-white px-4 py-4">
                <Text className="text-base text-gray-700 leading-relaxed">
                  {stripHtmlTags(item.answer)}
                </Text>
              </View>
            </List.Accordion>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    minHeight: 150,
  },
  accordionItem: {
    backgroundColor: "white",
    borderColor: "#e5e7eb",
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#374151", // gray-700
    paddingRight: 16,
    lineHeight: 22,
  },
});
