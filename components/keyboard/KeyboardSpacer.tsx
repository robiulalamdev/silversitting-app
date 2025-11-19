// KeyboardSpacer.tsx
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useKeyboardHeight from "react-native-use-keyboard-height";

interface IProps {
  reduceHeight?: number;
  backgroundColor?: string;
}

export const KeyboardSpacer = ({
  reduceHeight = 0,
  backgroundColor = "",
}: IProps) => {
  const keyboardHeight = useKeyboardHeight();

  // Animate height when keyboard opens/closes
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(
        keyboardHeight > reduceHeight
          ? keyboardHeight - reduceHeight
          : keyboardHeight,
        { duration: 250 }
      ),
      backgroundColor: backgroundColor || "white",
    };
  });

  return <Animated.View style={animatedStyle} />;
};
