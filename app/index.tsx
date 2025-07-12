import Banner from "@/components/home/banner/Banner";
import Header from "@/components/shared/header/Header";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Banner />
    </SafeAreaView>
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
