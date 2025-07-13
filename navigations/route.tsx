// route.tsx

import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import React from "react";

const Route: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
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

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Screen
        name="(profile)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="who-we-are/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="blogs/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="children-provider-faq/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="child-care/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="child-care/message/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Route;
