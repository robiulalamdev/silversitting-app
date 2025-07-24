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

      {/* <Stack.Screen name="index" /> */}

      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="(profile)" />

      <Stack.Screen name="who-we-are/index" />

      <Stack.Screen name="blogs/[id]" />

      <Stack.Screen name="children-provider-faq/index" />

      <Stack.Screen name="insights/index" />

      <Stack.Screen name="legal/index" />

      <Stack.Screen name="child-care/index" />

      <Stack.Screen name="child-care/message/[id]" />
    </Stack>
  );
};

export default Route;
