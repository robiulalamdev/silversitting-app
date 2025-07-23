// route.tsx

import Header from "@/components/shared/header/Header";
import { Stack } from "expo-router";
import React from "react";

const Route: React.FC = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen name="(auth)" />

      <Stack.Screen
        name="(profile)"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="who-we-are/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="blogs/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="children-provider-faq/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="insights/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="legal/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="child-care/index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="child-care/message/[id]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default Route;
