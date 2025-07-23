import { MaterialIcons } from "@expo/vector-icons"; // For share icon
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Placeholder for translation hook
const useGetTranslation = () => {
  const translations: { [key: string]: string } = {
    Share: "Share",
  };
  return (key: string) => translations[key] || key;
};

interface BlogDetailsBannerProps {
  blogDetails: {
    _id: string;
    cover_image?: string;
    author?: {
      firstName: string;
      lastName: string;
    };
    title: string;
    description: string;
  } | null;
}

export default function BlogDetailsBanner({
  blogDetails,
}: BlogDetailsBannerProps) {
  const trans = useGetTranslation();

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  return (
    <View className="bg-white pb-6">
      {blogDetails?.cover_image && (
        <View className="w-full h-60 mb-6">
          <Image
            className="w-full h-full object-cover"
            source={{ uri: blogDetails.cover_image }}
            resizeMode="cover"
          />
        </View>
      )}

      <View className="px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/icons/blogs/details-people.png")}
              style={styles.icon}
              className="mr-2"
            />
            <Text className="text-gray-600 text-base">
              {blogDetails?.author
                ? `${blogDetails.author.firstName} ${blogDetails.author.lastName}`
                : "Daniel Monninger"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log("Share pressed")}
            className="flex-row items-center"
          >
            <MaterialIcons
              name="share"
              size={20}
              color="#8b3888"
              className="mr-1"
            />
            <Text className="text-primary text-base">{trans("Share")}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-bold text-gray-800 mb-4">
          {blogDetails?.title || "Blog Title"}
        </Text>
        <Text className="text-gray-700 text-base leading-relaxed">
          {stripHtmlTags(blogDetails?.description || "")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    tintColor: "#666", // Adjust color if needed
  },
});
