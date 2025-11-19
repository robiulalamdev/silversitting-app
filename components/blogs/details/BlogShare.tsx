import useGetTranslation from "@/context/TranslationContext";
import { Text, View } from "react-native";
import BlogShareBar from "../BlogShareBar";

interface BlogShareProps {
  blogDetails: {
    category?: string;
    _id: string;
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
        {blogDetails?._id && <BlogShareBar blogId={blogDetails?._id} />}

        {/* <View className="flex-row items-center gap-x-4">
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="linkedin" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Facebook share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/facebook.png")}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Twitter share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/twitter.png")}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("LinkedIn share icon pressed")}
          >
            <Image
              source={require("../../../assets/icons/blogs/linkedin.png")}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View> */}
        {blogDetails?.category && (
          <Text className="text-gray-600 text-sm">
            {getCategoryText(blogDetails.category)}
          </Text>
        )}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   socialIcon: {
//     width: 25,
//     height: 25,
//   },
//   iconButton: {
//     backgroundColor: "#c9a6d1", // your purple shade
//     padding: 10,
//     borderRadius: 8,
//   },
// });
