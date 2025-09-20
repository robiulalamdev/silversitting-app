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

      <Stack.Screen name="privacy-statement/index" />
      <Stack.Screen name="terms-and-conditions/index" />
      <Stack.Screen name="who-we-are/index" />
      <Stack.Screen name="children-provider-faq/index" />
      <Stack.Screen name="feedback/index" />
    </Stack>
  );
};

export default Route;
