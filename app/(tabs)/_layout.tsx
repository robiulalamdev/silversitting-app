import Header from "@/components/shared/header/Header";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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

      {/* <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={30} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="person" size={30} color={color} />
          ),
          tabBarButton: (props: any) => {
            const handleTabPress = () => {
              if (isAuthenticated) {
                if (props.onPress) props.onPress(); // Go to profile
              } else {
                router.push("/(auth)/login"); // Redirect to login
              }
            };

            return (
              <TouchableRipple
                onPress={handleTabPress}
                style={props.style as ViewStyle}
              >
                {props.children}
              </TouchableRipple>
            );
          },
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
