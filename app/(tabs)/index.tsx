import Banner from "@/components/home/banner/Banner";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const TabsScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Banner />
      <HowItWorks />
      <HomeRegister />
    </ScrollView>
  );
};

export default TabsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
