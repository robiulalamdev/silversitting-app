import { Redirect } from "expo-router";
import React from "react";

const AuthScreen = () => {
  return <Redirect href="/(auth)/login" />;
};

export default AuthScreen;
