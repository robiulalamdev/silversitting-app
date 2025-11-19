import Tabs from "@/components/common/tabs/Tabs";
import ChildCareProfile from "@/components/profile/ChildCareProfile";
import ParentProfile from "@/components/profile/ParentProfile";
import useGetTranslation from "@/context/TranslationContext";
import { useAuth } from "@/hooks/useAuth";
import { RelativePathString, useRouter, useSegments } from "expo-router";
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
  }, [isAuthenticated, router, segments, setRedirectPath]);

  if (!isAuthenticated) return null;

  return (
    <View className="flex-1">
      <Tabs
        tabs={[
          {
            id: 1,
            label: trans("poBox") as string,
            route: "/pro-box" as RelativePathString,
            slug: "/pro-box",
            isShouldVisible: true,
          },
          {
            id: 2,
            label: trans("profile") as string,
            route: "/profile" as RelativePathString,
            slug: "/",
            subSlug: "/profile",
            isShouldVisible: true,
          },
          {
            id: 3,
            label: trans("settings") as string,
            route: "/settings" as RelativePathString,
            slug: "/settings",
            isShouldVisible: user?.role === "childcarer",
          },
          {
            id: 4,
            label: trans("changePassword") as string,
            route: "/change-password" as RelativePathString,
            slug: "/change-password",
            isShouldVisible: true,
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
