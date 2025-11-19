import { useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const { width } = useWindowDimensions();

  // Define custom styles for the HTML content
  const tagsStyles: any = {
    p: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 16,
      color: "#4b5563", // gray-700
      textAlign: "justify",
    },
    h1: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#1f2937", // gray-900
    },
    h2: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 14,
      color: "#1f2937",
    },
    h3: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: "#1f2937",
    },
    ul: {
      marginBottom: 16,
      paddingLeft: 20,
    },
    ol: {
      marginBottom: 16,
      paddingLeft: 20,
    },
    li: {
      fontSize: 16,
      lineHeight: 24,
      color: "#4b5563",
      marginBottom: 8,
    },
    a: {
      color: "#8b3888", // primary color
      textDecorationLine: "underline",
    },
    img: {
      width: "100%", // Make images responsive
      height: 200, // Default height, adjust as needed or make dynamic
      resizeMode: "contain",
      marginVertical: 16,
    },
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
  };

  return (
    <View className="px-4 py-6 bg-white">
      <RenderHtml
        contentWidth={width}
        source={{ html: content || "<p></p>" }}
        tagsStyles={tagsStyles}
      />
    </View>
  );
}
