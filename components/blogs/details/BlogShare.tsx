import useGetTranslation from "@/hooks/useGetTranslation";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BlogShareProps {
  blogDetails: {
    category?: string;
  } | null;
}

export default function BlogShare({ blogDetails }: BlogShareProps) {
  const trans = useGetTranslation();

  const getCategoryText = (categorySlug?: string) => {
    switch (categorySlug) {
      case "healthWellbeing":
        return trans("HealthWellbeingCategory");
      case "psychology":
        return trans("PsychologyCategory");
      case "upbringing":
        return trans("UpbringingCategory");
      default:
        return "";
    }
  };

  return (
    <View className="px-4 py-6 bg-white border-t border-gray-200">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={() => console.log("Facebook share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Twitter share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/twitter.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("LinkedIn share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/linkedin.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        {blogDetails?.category && (
          <Text className="text-gray-600 text-sm">
            {getCategoryText(blogDetails.category)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialIcon: {
    width: 32,
    height: 32,
  },
});
