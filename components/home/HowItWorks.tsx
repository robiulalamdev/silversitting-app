import useGetTranslation from "@/hooks/useGetTranslation";
import { StyleSheet, Text, View } from "react-native";

interface StepCardProps {
  stepNumber: number;
  description: string;
}

function StepCard({ stepNumber, description }: StepCardProps) {
  return (
    <View
      className="bg-white rounded-lg p-6 max-w-[280px] mx-auto mb-6 shadow-md"
      style={styles.cardShadow}
    >
      <Text className="text-5xl font-bold text-purple-200 mb-4">
        {stepNumber}
      </Text>
      <Text className="text-base text-gray-700 leading-relaxed">
        {description}
      </Text>
    </View>
  );
}

export default function HowItWorks() {
  const trans = useGetTranslation();
  return (
    <View className="flex-1 bg-[#cc8cdc] py-12 px-6 items-center">
      <Text className="text-3xl font-bold text-white text-center mb-10">
        {trans("howitworks")}
      </Text>

      <View className="w-full max-w-md">
        <StepCard
          stepNumber={1}
          description={trans("SeniorsRegisterAsChildcareWorkers")}
        />
        <StepCard
          stepNumber={2}
          description={trans("ProximitySearchForChildcare")}
        />
        <StepCard stepNumber={3} description={trans("ParentsGetInTouch")} />
      </View>
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
});
