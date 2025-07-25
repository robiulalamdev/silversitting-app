// import BlogContent from "@/components/blogs/details/BlogContent";
// import BlogDetailsBanner from "@/components/blogs/details/BlogDetailsBanner";
// import BlogShare from "@/components/blogs/details/BlogShare";
// import CurrentBlogs from "@/components/blogs/details/CurrentBlogs";
// import { useGetBlogByIdQuery } from "@/redux/features/blog/blogApi";
// import { useLocalSearchParams } from "expo-router";
// import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// export default function BlogDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const blogId = typeof id === "string" ? id : "";

//   const {
//     data: blogDetails,
//     isLoading,
//     isError,
//   }: any = useGetBlogByIdQuery(blogId, {
//     skip: !blogId, // Skip the query if ID is not available
//   });

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-purple-50">
//         <ActivityIndicator size="large" color="theme('colors.primary')" />
//         <Text className="text-gray-600 mt-2">Loading blog details...</Text>
//       </View>
//     );
//   }

//   if (isError || !blogDetails?.data) {
//     return (
//       <View className="flex-1 justify-center items-center bg-purple-50 p-4">
//         <Text className="text-red-500 text-center">
//           Failed to load blog details or blog not found.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-purple-50">
//       <BlogDetailsBanner blogDetails={blogDetails?.data} />
//       <BlogContent content={blogDetails?.data?.content} />
//       <BlogShare blogDetails={blogDetails?.data} />
//       <CurrentBlogs blogDetails={blogDetails?.data} />
//     </ScrollView>
//   );
// }

import React from "react";
import { Text, View } from "react-native";

const BlogDetails = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-primary">Blog Screen</Text>
    </View>
  );
};

export default BlogDetails;
