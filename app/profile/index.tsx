import Tabs from "@/components/common/tabs/Tabs";
import ChildCareProfile from "@/components/profile/ChildCareProfile";
import ParentProfile from "@/components/profile/ParentProfile";
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const ProfileScreen = () => {
  const trans = useGetTranslation();
  const { user, isAuthenticated, setRedirectPath } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const fullPath = "/" + segments.join("/");
      setRedirectPath(fullPath); // store complete path
      router.replace("/auth/login"); // replace with login
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
            route: "/pro-box",
            slug: "/pro-box",
          },
          {
            id: 2,
            label: trans("profile"),
            route: "/profile",
            slug: "/",
            subSlug: "/profile",
          },
          {
            id: 3,
            label: trans("settings"),
            route: "/settings",
            slug: "/settings",
          },
          {
            id: 4,
            label: trans("changePassword"),
            route: "/change-password",
            slug: "/change-password",
          },
        ]}
      />
      {user?.role === "parents" && <ParentProfile user={user} />}
      {user?.role === "childcarer" && <ChildCareProfile user={user} />}
      {user?.role === "admin" && <ParentProfile user={user} />}
    </View>
  );
};

export default ProfileScreen;
