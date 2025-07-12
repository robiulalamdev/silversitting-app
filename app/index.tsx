import Banner from "@/components/home/banner/Banner";
import HomeAbout from "@/components/home/HomeAbout";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import Known from "@/components/home/Known";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />
      <View className="py-8">
        <Known />
      </View>
      <HomeAbout />
      <HowItWorks />
      <HomeRegister />
      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  content: {
    flex: 1,
  },
});
