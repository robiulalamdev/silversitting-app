import Tabs from "@/components/common/tabs/Tabs";
import ProfileSettings from "@/components/profile/ProfileSettings";
import useGetTranslation from "@/hooks/useGetTranslation";
import React from "react";
import { View } from "react-native";

const ProfileSettingsScreen = () => {
  const trans = useGetTranslation();
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
      <ProfileSettings />;
    </View>
  );
};

export default ProfileSettingsScreen;
