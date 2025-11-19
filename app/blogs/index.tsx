import BlogItem from "@/components/blogs/BlogItem";
import useGetTranslation from "@/context/TranslationContext";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Assuming you have react-i18next setup
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BlogItem {
  _id: string;
  image?: string;
  createdAt: string | number;
  author?: {
    firstName: string;
    lastName: string;
  };
  title: string;
  description: string;
  category: string;
  language: "english" | "german";
}

export default function Blogs() {
  const [active, setActive] = useState("all");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);
  const trans = useGetTranslation();
  // Assuming i18n is available from react-i18next for language filtering
  const { i18n } = useTranslation();

  const { data, isLoading, isSuccess } = useGetAllBlogsQuery(undefined);

  const blogTabCategories = [
    { name: trans("AllPosts"), slug: "all" },
    { name: trans("HealthWellbeing"), slug: "healthWellbeing" },
    { name: trans("Psychology"), slug: "psychology" },
    { name: trans("Upbringing"), slug: "upbringing" },
  ];

  const applyFilters = (
    selectedSlug: string,
    allFetchedBlogs: BlogItem[],
    currentLanguage: string
  ) => {
    const languageFiltered = allFetchedBlogs.filter(
      (blog) => blog.language === currentLanguage
    );

    if (selectedSlug === "all") {
      setFilteredBlogs(languageFiltered);
    } else {
      const categoryFiltered = languageFiltered.filter(
        (item) => item?.category === selectedSlug
      );
      setFilteredBlogs(categoryFiltered);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data?.blogs) {
      const fetchedBlogs: BlogItem[] = Array.isArray(data.data.blogs)
        ? data.data.blogs
        : [];
      const currentLanguage = i18n.language === "en" ? "english" : "german";
      applyFilters(active, fetchedBlogs, currentLanguage);
    }
  }, [data, isSuccess, i18n.language, active]); // Re-run when data, success status, language, or active tab changes

  const handleBlogsFilter = (tab: { name: string; slug: string }) => {
    setActive(tab.slug);
    // Filtering logic will be handled by the useEffect when `active` state changes
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50 py-12">
        <ActivityIndicator size="large" color="theme('colors.primary')" />
        <Text className="text-gray-600 mt-2">Loading blogs...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-purple-50 py-6">
      <View className="px-4 mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.blogTabContainer}
        >
          {blogTabCategories.map((tab, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-full mx-1 ${
                active === tab.slug
                  ? "bg-primary"
                  : "bg-white border border-gray-200"
              }`}
              onPress={() => handleBlogsFilter(tab)}
              style={styles.tabButton}
            >
              <Text
                className={`text-base font-semibold ${active === tab.slug ? "text-white" : "text-gray-700"}`}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 px-4">
        {filteredBlogs.length > 0 ? (
          <FlatList
            data={filteredBlogs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <BlogItem blog={item} />}
            numColumns={1} // For single column layout on mobile
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text className="text-center text-gray-600 text-lg mt-8">
            {trans("NoBlogsFound")}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blogTabContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10, // Adjust padding for scrollable tabs
  },
  tabButton: {
    minWidth: 100, // Ensure buttons have a minimum width
    justifyContent: "center",
    alignItems: "center",
  },
});
