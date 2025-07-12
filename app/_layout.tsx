import { useFonts } from "expo-font";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import "../styles/global.css";

import Route from "@/navigations/route";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <PersistGate
          loading={
            <View>
              <Text>Loading...</Text>
            </View>
          }
          persistor={persistor}
        >
          <PaperProvider>
            <Route />
          </PaperProvider>
        </PersistGate>
      </ToastProvider>
    </Provider>
  );
}
