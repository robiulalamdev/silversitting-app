import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGetAllBlogsQuery } from "../../../redux/features/blog/blogApi";
import BlogItem from "../BlogItem";

// Placeholder for translation hook
const useGetTranslation = () => {
  const translations: { [key: string]: string } = {
    Viewall: "View all",
    CurrentPosts: "Current Posts",
  };
  return (key: string) => translations[key] || key;
};

interface IProps {
  blogDetails: any; // Can be more specific if needed, but not directly used for filtering here
}

export default function CurrentBlogs({ blogDetails }: IProps) {
  const trans = useGetTranslation();
  const { data, isLoading, isSuccess } = useGetAllBlogsQuery(undefined);
  const router = useRouter();

  const handleClick = () => {
    router.push("/blogs");
  };

  const currentBlogs = data?.data?.blogs?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50 py-12">
        <ActivityIndicator size="large" color="theme('colors.primary')" />
        <Text className="text-gray-600 mt-2">Loading current posts...</Text>
      </View>
    );
  }

  return (
    <View className="bg-purple-50 py-8 px-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-bold text-gray-800">
          {trans("CurrentPosts")}
        </Text>
        <TouchableOpacity
          onPress={handleClick}
          className="bg-primary rounded-lg px-4 py-2"
        >
          <Text className="text-white text-base font-semibold">
            {trans("Viewall")}
          </Text>
        </TouchableOpacity>
      </View>

      {currentBlogs.length > 0 ? (
        <FlatList
          data={currentBlogs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <BlogItem blog={item} />}
          numColumns={1} // For single column layout on mobile
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable scrolling for this inner FlatList
        />
      ) : (
        <Text className="text-center text-gray-600 text-base">
          No current posts available.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // No specific styles needed here as Tailwind classes are used
});
