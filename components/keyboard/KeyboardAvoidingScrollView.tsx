// KeyboardAvoidingScrollView.tsx
import React, { useEffect, useRef } from "react";
import { ScrollView, TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useKeyboardHeight from "react-native-use-keyboard-height";

interface Props {
  children: React.ReactNode;
  style?: any;
  reduceHeight?: number;
  ref?: React.Ref<TextInput>;
  className?: string;
  onFocus?: () => void;
}

export const KeyboardAvoidingScrollView = ({
  children,
  style,
  reduceHeight = 0,
  className = "",
  onFocus,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardHeight = useKeyboardHeight();

  // Animated spacer
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(
      keyboardHeight > reduceHeight
        ? keyboardHeight - reduceHeight
        : keyboardHeight,
      { duration: 250 }
    ),
  }));

  useEffect(() => {
    if (keyboardHeight > 0) {
      // Wait a tiny bit then scroll to bottom
      setTimeout(() => {
        // scrollViewRef.current?.scrollToEnd({ animated: true });
        if (onFocus) {
          onFocus();
        }
      }, 50);
    }
  }, [keyboardHeight]);

  return (
    <ScrollView
      ref={scrollViewRef}
      className={className ?? ""}
      style={style}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
      <Animated.View style={animatedStyle} />
    </ScrollView>
  );
};
