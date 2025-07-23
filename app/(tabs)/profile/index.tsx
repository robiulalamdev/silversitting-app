import Tabs from "@/components/common/tabs/Tabs";
import ChildCareProfile from "@/components/profile/ChildCareProfile";
import ParentProfile from "@/components/profile/ParentProfile";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { View } from "react-native";

const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <View className="flex-1">
      <Tabs
        tabs={[
          {
            id: 1,
            label: "P.O Box",
            route: "/(profile)/pro-box",
            slug: "/pro-box",
          },
          {
            id: 2,
            label: "Profile",
            route: "/(profile)",
            slug: "/",
            subSlug: "/profile",
          },
          {
            id: 3,
            label: "Settings",
            route: "/(profile)/settings",
            slug: "/settings",
          },
          {
            id: 4,
            label: "Change Password",
            route: "/(profile)/change-password",
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
