import useGetTranslation from "@/hooks/useGetTranslation";
import * as Linking from "expo-linking";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Known() {
  const trans = useGetTranslation();

  const handleLinkPress = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View className="bg-purple-50 py-8 px-4 items-center">
      <Text className="text-[22px] font-semibold text-gray-800 mb-6">
        {trans("Knownfrom")}
      </Text>
      <View className="flex-row items-center justify-center space-x-6">
        <TouchableOpacity
          onPress={() =>
            handleLinkPress(
              "https://www.deutsche-startups.de/tag/silversitting/"
            )
          }
          className="p-2"
        >
          <Image
            source={require("../../assets/images/home/known/known.png")}
            alt="Logo von Deutsche Startups"
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleLinkPress(
              "https://raketenstart.org/52-silversitting-senioren-betreuen-kinder/"
            )
          }
          className="p-2"
        >
          <Image
            source={require("../../assets/images/home/known/raketenstart.png")}
            alt="Raketenstart Logo"
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120, // Adjust width as needed
    height: 40, // Adjust height as needed
  },
});
