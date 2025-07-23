import Header from "@/components/shared/header/Header";
import { COLORS } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#ddd",
          height: 80,
          paddingTop: 5,
        },
        tabBarActiveTintColor: COLORS.primary, // tailwind -primary
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blogs/index"
        options={{
          title: "Blogs",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="article" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
