import Header from "@/components/shared/header/Header";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
