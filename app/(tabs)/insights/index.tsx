import HomeAbout from "@/components/home/HomeAbout";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import Known from "@/components/home/Known";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const InsightsScreen = () => {
  const { section = "" } = useLocalSearchParams<{ section: string }>();

  const scrollViewRef = useRef<ScrollView>(null);

  // store y offset for each section separately
  const [knownY, setKnownY] = useState(0);
  const [howItWorksY, setHowItWorksY] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      if (!scrollViewRef.current) return;

      if (section === "known") {
        scrollViewRef.current.scrollTo({ y: knownY, animated: true });
      }

      if (section === "how-it-works" && howItWorksY > 0) {
        scrollViewRef.current.scrollTo({ y: howItWorksY, animated: true });
      }
    }, [section, knownY, howItWorksY])
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-7">
      <ScrollView ref={scrollViewRef}>
        {/* Known */}
        <View
          className="py-8"
          onLayout={(e) => setKnownY(e.nativeEvent.layout.y)}
        >
          <Known />
        </View>

        {/* About */}
        <HomeAbout />

        {/* How It Works */}
        <View onLayout={(e) => setHowItWorksY(e.nativeEvent.layout.y)}>
          <HowItWorks />
        </View>

        {/* Register */}
        <HomeRegister />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
