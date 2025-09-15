import { COLORS } from "@/constants/theme";
import { formatDate } from "@/utils/format/time";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Placeholder for translation hook
const useGetTranslation = () => {
  const translations: { [key: string]: string } = {
    ReadMore: "Read More",
    // Add month translations here if formatDate uses them
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
  };
  return (key: string) => translations[key] || key;
};

interface BlogCardProps {
  blog: {
    _id: string;
    image?: string;
    createdAt: string | number;
    author?: {
      firstName: string;
      lastName: string;
    };
    title: string;
    description: string;
  };
}

export default function BlogItem({ blog }: BlogCardProps) {
  const router = useRouter();
  const trans = useGetTranslation();
  const [day, monthYear] = formatDate(blog.createdAt, trans);

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/(tabs)/blogs/[id]`,
          params: {
            id: blog._id,
          },
        })
      }
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
      style={styles.cardShadow}
    >
      <View className="relative w-full h-60">
        <Image
          source={
            blog?.image
              ? { uri: blog.image }
              : require("../../assets/images/blogs//blog.png")
          }
          style={styles.blogImage}
          resizeMode="cover"
        />
        <View className="absolute top-4 left-4 bg-primary rounded-lg px-4 py-2 items-center">
          <Text className="text-white text-xl font-bold">{day}</Text>
          <Text className="text-white text-xs">{monthYear}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-center mb-4">
          <Image
            source={require("../../assets/icons/blogs/people.png")}
            style={styles.authorIcon}
            className="mr-2"
          />
          <Text className="text-gray-600 text-sm">
            {blog?.author
              ? `${blog.author.firstName} ${blog.author.lastName}`
              : "Unknown Author"}
          </Text>
        </View>

        <Text className="text-xl font-bold text-gray-800 mb-2">
          {blog?.title || "New Title"}
        </Text>
        <Text
          className="text-gray-700 text-base leading-relaxed mb-4"
          numberOfLines={4}
        >
          {stripHtmlTags(blog?.description || "")}
        </Text>

        <View className="flex-row items-center">
          <Text className="text-primary text-base font-semibold mr-1">
            {trans("ReadMore")}
          </Text>
          <Image
            source={require("../../assets/icons/blogs/violet-arrow.png")}
            style={styles.arrowIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blogImage: {
    width: "100%",
    height: "100%",
  },
  authorIcon: {
    width: 16,
    height: 16,
    tintColor: "#666", // Adjust color if needed
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary, // Apply primary color
  },
});
