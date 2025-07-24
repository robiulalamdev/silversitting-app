import { Redirect } from "expo-router";
import React from "react";

const HomeScreen = () => {
  return <Redirect href="/(tabs)" withAnchor={false} />;
};

export default HomeScreen;
