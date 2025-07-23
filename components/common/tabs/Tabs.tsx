import { usePathname, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TabItem {
  id: number;
  label: string;
  route: string;
  slug: string;
  subSlug?: string;
}

interface TabsProps {
  tabs: TabItem[];
}

export default function Tabs({ tabs }: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View className="bg-white border-b border-gray-200 shadow-sm">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.slug || pathname === tab?.subSlug;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleTabPress(tab.route)}
              className={`px-4 py-3 items-center justify-center ${
                isActive ? "bg-primary" : "bg-white"
              }`}
              style={isActive ? styles.activeTab : styles.inactiveTab}
            >
              <Text
                className={`text-base font-semibold ${
                  isActive ? "text-white" : "text-primary"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#8b3888",
  },
  inactiveTab: {},
});
