// useGradualAnimation.ts
import { useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

const OFFSET = 42;

export const useGradualAnimation = () => {
  const height = useSharedValue(OFFSET);

  useEffect(() => {
    // Keyboard event names are platform-specific
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e: any) => {
      // e.endCoordinates.height works on both iOS and Android
      const toValue = (e.endCoordinates?.height ?? 0) + OFFSET;
      height.value = withTiming(toValue, { duration: 250 });
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      height.value = withTiming(OFFSET, { duration: 250 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [height]);

  return { height };
};
