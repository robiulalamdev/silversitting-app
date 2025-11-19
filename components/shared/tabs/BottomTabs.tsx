import { COLORS } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabItem {
  name: string;
  route: string;
  icon: React.ReactNode;
  label: string;
  requiresAuth?: boolean;
}

const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, setRedirectPath } = useAuth();
  const trans = useGetTranslation();

  const tabs: TabItem[] = [
    {
      name: "index",
      route: "/",
      icon: <MaterialIcons name="home" size={24} />,
      label: trans("startTab"),
    },
    {
      name: "profile",
      route: "/profile",
      icon: <MaterialIcons name="person" size={24} />,
      label: trans("profileTab"),
      requiresAuth: true,
    },
    {
      name: "search",
      route: "/search",
      icon: <Feather name="search" size={22} />,
      label: trans("searchTab"),
    },
    {
      name: "blogs",
      route: "/blogs",
      icon: <MaterialIcons name="article" size={24} />,
      label: trans("blogTab"),
    },
  ];

  const handleTabPress = (tab: TabItem) => {
    // If already on the same route, do nothing
    if (
      pathname === tab.route ||
      (tab.name === "profile" && pathname === "/auth/login")
    ) {
      return;
    }
    if (tab.requiresAuth && !isAuthenticated) {
      setRedirectPath(tab.route);
      router.push("/auth/login");
      return;
    }
    router.push(tab.route as any);
  };

  const isActiveTab = (tab: TabItem) => {
    if (tab.name === "index") {
      return pathname === "/" || pathname === "" || pathname === "/";
    }
    return pathname.startsWith(`/${tab.name}`);
  };

  return (
    <View
      className="border-t border-gray-200"
      style={{
        backgroundColor: "white",
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-row">
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab);
          const iconColor = isActive ? COLORS.primary : "#6B7280";
          const textColor = isActive ? COLORS.primary : "#6B7280";

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handleTabPress(tab)}
              className="flex-1 items-center justify-center py-2 px-1"
              style={{ minHeight: 60 }}
              activeOpacity={0.7}
            >
              <View className="items-center justify-center mb-1">
                {React.cloneElement(tab.icon as React.ReactElement, {
                  color: iconColor,
                })}
              </View>
              <Text
                className="text-xs text-center"
                style={{
                  color: textColor,
                  fontSize: 11,
                  fontWeight: isActive ? "600" : "400",
                }}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(BottomTabs);
