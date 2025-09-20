import Tabs from "@/components/common/tabs/Tabs";
import ChangePassword from "@/components/profile/ChangePassword";
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const ChangePasswordScreen = () => {
  const trans = useGetTranslation();
  const { isAuthenticated, setRedirectPath } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const fullPath = "/" + segments.join("/");
      setRedirectPath(fullPath); // store complete path
      router.replace("/(auth)/login"); // replace with login
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;
  return (
    <View className="flex-1">
      <Tabs
        tabs={[
          {
            id: 1,
            label: trans("poBox"),
            route: "/(tabs)/pro-box",
            slug: "/pro-box",
          },
          {
            id: 2,
            label: trans("profile"),
            route: "/(tabs)/profile",
            slug: "/",
            subSlug: "/profile",
          },
          {
            id: 3,
            label: trans("settings"),
            route: "/(tabs)/settings",
            slug: "/settings",
          },
          {
            id: 4,
            label: trans("changePassword"),
            route: "/(tabs)/change-password",
            slug: "/change-password",
          },
        ]}
      />
      <ChangePassword />;
    </View>
  );
};

export default ChangePasswordScreen;
