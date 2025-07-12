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
  return (
    <View className="flex-1 bg-[#cc8cdc] py-12 px-6 items-center">
      <Text className="text-3xl font-bold text-white text-center mb-10">
        Here&apos;s how it works
      </Text>

      <View className="w-full max-w-md">
        <StepCard
          stepNumber={1}
          description="Seniors aged 55 and over register as childcare workers"
        />
        <StepCard
          stepNumber={2}
          description="With the proximity search, parents can find suitable childcare providers in the vicinity"
        />
        <StepCard
          stepNumber={3}
          description="Parents get in touch and after getting to know each other personally, we can start!"
        />
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
