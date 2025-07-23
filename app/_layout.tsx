// RootLayout.tsx
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import "../styles/global.css";

import i18n, { initializeI18n } from "@/lib/i18n"; // Import the async initialization function
import Route from "@/navigations/route";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native"; // Import ActivityIndicator for loading
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [i18nInitialized, setI18nInitialized] = useState(false); // State to track i18n initialization

  useEffect(() => {
    // Initialize i18n when the component mounts
    const init = async () => {
      try {
        await initializeI18n();
        setI18nInitialized(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        // Handle error, maybe show an error message to the user
      }
    };
    init();
  }, []); // Empty dependency array means this runs once on mount

  if (!fontsLoaded || !i18nInitialized) {
    // Show a loading indicator while fonts and i18n are loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading application...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading Redux state...</Text>
            </View>
          }
          persistor={persistor}
        >
          {/* I18nextProvider is not strictly needed here if i18n is initialized globally,
              but it doesn't hurt and ensures context is available. */}
          <I18nextProvider i18n={i18n}>
            <PaperProvider>
              <Route />
            </PaperProvider>
          </I18nextProvider>
        </PersistGate>
      </ToastProvider>
    </Provider>
  );
}
