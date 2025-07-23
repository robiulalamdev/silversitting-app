import Banner from "@/components/home/banner/Banner";
import HomeRegister from "@/components/home/HomeRegister";
import HowItWorks from "@/components/home/HowItWorks";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const dkd = usePathname();

  console.log(dkd, router.canGoBack());
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <HowItWorks />
      <HomeRegister />
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
