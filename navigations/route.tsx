// route.tsx

import Header from "@/components/shared/header/Header";
import { Stack } from "expo-router";
import React from "react";

const Route: React.FC = () => {
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="(profile)" />
    </Stack>
  );
};

export default Route;
