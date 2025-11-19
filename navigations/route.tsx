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
        name="auth"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="profile/index" />
      <Stack.Screen name="search/index" />
      <Stack.Screen name="blogs/index" />
      <Stack.Screen name="blogs/[id]" />
      <Stack.Screen name="pro-box/index" />
      <Stack.Screen name="settings/index" />
      <Stack.Screen name="change-password/index" />
      <Stack.Screen name="insights/index" />
      <Stack.Screen name="who-we-are/index" />
      <Stack.Screen name="children-provider-faq/index" />
      <Stack.Screen name="legal/index" />
      <Stack.Screen name="child-care/index" />
      <Stack.Screen name="child-care/message/[id]" />

      <Stack.Screen name="privacy-statement/index" />
      <Stack.Screen name="terms-and-conditions/index" />
      <Stack.Screen name="feedback/index" />
      <Stack.Screen name="contact/index" />
      <Stack.Screen name="faq/index" />
      <Stack.Screen name="guidance/index" />
    </Stack>
  );
};

export default Route;
