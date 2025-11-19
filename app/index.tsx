import Banner from "@/components/home/banner/Banner";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Banner />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
