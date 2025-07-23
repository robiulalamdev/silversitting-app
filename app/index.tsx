import Banner from "@/components/home/banner/Banner";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />

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
