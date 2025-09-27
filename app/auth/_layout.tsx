import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login/index"
        options={{
          headerShown: false,
        }}
      />

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
