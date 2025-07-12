import Header from "@/components/shared/header/Header";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ProfileLayout = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="change-password/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default ProfileLayout;

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
