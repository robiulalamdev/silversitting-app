import HomeAbout from "@/components/home/HomeAbout";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import Known from "@/components/home/Known";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const InsightsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white pt-7">
      <ScrollView className="">
        <View className="py-8">
          <Known />
        </View>
        <HomeAbout />
        <HowItWorks />
        <HomeRegister />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
