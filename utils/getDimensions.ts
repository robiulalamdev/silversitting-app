// utils/getDimensions.ts
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const DIMENSIONS = {
  WIDTH: width,
  HEIGHT: height,
};

export default DIMENSIONS;
