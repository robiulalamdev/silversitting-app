import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Screen
        name="register/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="forgot-password/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
