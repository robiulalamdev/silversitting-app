import Header from "@/components/shared/header/Header";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const ProfileLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" withAnchor={false} />;
  }

  return (
    <View className="flex-1 bg-white pt-[30px]">
      <Header />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isAuthenticated}>
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
        </Stack.Protected>
      </Stack>
    </View>
  );
};

export default ProfileLayout;
