"use client";

import useGetTranslation from "@/context/TranslationContext";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface InfoCardProps {
  iconSource: any; // Use 'any' for require() or specify ImageSourcePropType
  title: string;
  description: string;
  linkText: string;
  linkRoute:
    | "/children-provider-faq/index"
    | "/who-we-are/index"
    | "/blogs/index";
  backgroundColor: string;
  iconColor: string;
}

function InfoCard({
  iconSource,
  title,
  description,
  linkText,
  linkRoute,
  backgroundColor,
  iconColor,
}: InfoCardProps) {
  const router = useRouter();

  const handleLinkPress = () => {
    router.push(linkRoute);
  };

  return (
    <View
      className={`rounded-lg p-6 mb-6 items-center`}
      style={{ backgroundColor: backgroundColor }}
    >
      <View
        className="w-20 h-20 rounded-full bg-white justify-center items-center mb-4"
        style={{ borderColor: iconColor, borderWidth: 2 }}
      >
        <Image
          source={iconSource}
          style={[styles.icon, { tintColor: iconColor }]}
          resizeMode="contain"
        />
      </View>
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      <Text className="text-center text-gray-600 text-sm mb-4">
        {description}
      </Text>
      <TouchableOpacity onPress={handleLinkPress}>
        <Text
          className="text-sm font-medium underline"
          style={{ color: iconColor }}
        >
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeAbout() {
  const trans = useGetTranslation();
  return (
    <View className="flex-1 bg-white p-4">
      <InfoCard
        iconSource={require("../../assets/images/home/about/about.png")} // Placeholder for About Us icon
        title={trans("About")}
        description={trans("SilverSittingIdea")}
        linkText={trans("SilverSittingLearnMore")}
        linkRoute="/who-we-are/index"
        backgroundColor="#FCE7F3" // Light pink
        iconColor="#EC4899" // Pink
      />
      <InfoCard
        iconSource={require("../../assets/images/home/about/news.png")} // Placeholder for About Us icon
        title={trans("News")}
        description={trans("NewsContent")}
        linkText={trans("ToTheNews")}
        linkRoute="/blogs/index"
        backgroundColor="#EDE9FE" // Light purple
        iconColor="#8B5CF6" // Purple
      />
      <InfoCard
        iconSource={require("../../assets/images/home/about/security.png")} // Placeholder for About Us icon
        title={trans("Security")}
        description={trans("SecurityContent")}
        linkText={trans("SafetyLink")}
        linkRoute="/children-provider-faq/index"
        backgroundColor="#E0F7FA" // Light blue/cyan
        iconColor="#00BCD4" // Cyan
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});
