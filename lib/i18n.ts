// lib/i18n.ts
import translations from "@/utils/translation"; // Import your translations
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Function to initialize i18n asynchronously
export const initializeI18n = async () => {
  const storedLanguage = await AsyncStorage.getItem("lan");
  const defaultLanguage = storedLanguage || "de"; // Use 'de' as default if nothing is stored

  i18n
    .use(initReactI18next) // THIS IS REQUIRED for react-i18next to work
    .init({
      compatibilityJSON: "v4", // Recommended for i18next v20+
      resources: {
        // Define your translation resources
        en: { translation: translations.en },
        de: { translation: translations.de },
      },
      lng: defaultLanguage, // Set the initial language
      fallbackLng: "en", // Fallback to English if the selected language is not found
      debug: false, // Set to true for debugging i18n issues
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
      // You can uncomment and configure detection if needed
      // detection: {
      //   order: ["cookie", "navigator"],
      //   caches: ["cookie"],
      // },
    });
};

export default i18n; // Export the i18n instance
