import useGetTranslation from "@/hooks/useGetTranslation";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RegisterCardProps {
  iconSource: any; // Use 'any' for require() or specify ImageSourcePropType
  title: string;
  buttonText: string;
  role: "parents" | "childcarer";
}

function RegisterCard({
  iconSource,
  title,
  buttonText,
  role,
}: RegisterCardProps) {
  const router = useRouter();

  const handleButtonPress = () => {
    router.push({ pathname: "/(auth)/register", params: { role: role } });
  };

  return (
    <View className="bg-[#f3ebf3] rounded-lg p-6 mb-6 items-center">
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      <Text className="text-lg font-bold text-gray-800 text-center mb-6">
        {title}
      </Text>
      {/* <TouchableOpacity
        onPress={handleButtonPress}
        className="bg-purple-600 rounded-lg py-3 px-6 flex-row items-center"
      >
        <Text className="text-white text-base font-semibold mr-2">
          {buttonText}
        </Text>
        <Text className="text-white text-base font-semibold">→ </Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={handleButtonPress} activeOpacity={0.8}>
        <LinearGradient
          colors={["#8b3888", "#cc8cdc"]}
          start={{ x: 0.36, y: 0 }} // simulate 111.23deg
          end={{ x: 1.56, y: 1 }}
          className="rounded-lg py-3 px-6 flex-row items-center"
        >
          <Text className="text-white text-base font-semibold mr-2">
            {buttonText}
          </Text>
          <Text className="text-white text-base font-semibold">→</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeRegister() {
  const trans = useGetTranslation();
  return (
    <View className="flex-1 bg-white mt-12">
      <RegisterCard
        iconSource={require("../../assets/images/home/register/register-childcare.png")} // Placeholder for childcare worker icon
        title={trans("RegisterAsChildcareWorker")}
        buttonText={trans("RegisterNow")}
        role="childcarer"
      />
      <RegisterCard
        iconSource={require("../../assets/images/home/register/register-parent.png")} // Placeholder for childcare worker icon
        title={trans("RegisterAsParent")}
        buttonText={trans("RegisterNow")}
        role="parents"
      />
    </View>
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
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
});
