import Header from "@/components/shared/header/Header";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme, View, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme(); // 'light' | 'dark'

  const trans = useGetTranslation();

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        paddingBottom: insets.bottom,
      }}
    >
      <Tabs
        initialRouteName="index"
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderColor: "#ddd",
            height: 60,
            paddingTop: 2,
            paddingBottom: 0,
            marginBottom: 0,
            elevation: 0, // Remove Android shadow
            shadowOpacity: 0, // Remove iOS shadow
            shadowOffset: { height: 0, width: 0 },
            shadowRadius: 0,
          },
          tabBarActiveTintColor: COLORS.primary, // tailwind -primary
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: trans("startTab"),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={30} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile/index"
          options={{
            title: trans("profileTab"),
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
            title: trans("searchTab"),
            tabBarIcon: ({ color }) => (
              <Feather name="search" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="blogs/index"
          options={{
            title: trans("blogTab"),
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="article" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="blogs/[id]"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="pro-box/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="settings/index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="change-password/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="insights/index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="who-we-are/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="children-provider-faq/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="legal/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="child-care/index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="child-care/message/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
