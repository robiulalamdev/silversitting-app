import type React from "react";

import { Image, Text, View } from "react-native";

interface InstructionCardProps {
  instruction: {
    title: string;
    image: any;
    content: React.ReactNode;
  };
  number: number;
}

export default function InstructionCard({
  instruction,
  number,
}: InstructionCardProps) {
  return (
    <View className="bg-purple-50 rounded-lg mb-6">
      {/* Icon Section */}
      <View className="bg-primary w-full flex justify-center items-center rounded-t-lg">
        <Image
          source={instruction.image}
          resizeMode="contain"
          className="w-[50px]"
        />
      </View>

      <View className="px-6 pb-4 mt-6">
        <View className="flex-row items-center justify-center">
          <View className="bg-primary rounded-full w-8 h-8 justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">{number}</Text>
          </View>
          <Text className="text-xl font-bold text-primary">
            {instruction.title}
          </Text>
        </View>

        {/* Content Section */}
        <View className="mt-4 text-left">
          {typeof instruction.content === "string" ? (
            <Text className="text-base text-left text-gray-700 leading-relaxed">
              {instruction.content}
            </Text>
          ) : (
            <View className="text-left">{instruction.content}</View>
          )}
        </View>
      </View>
    </View>
  );
}
