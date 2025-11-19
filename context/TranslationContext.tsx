import { BASE_URL } from "@/config";
import { initializeI18n } from "@/lib/i18n";
import { TranslationKeys } from "@/utils/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { AppState } from "react-native";
import defaultTranslate from "../utils/defaultTranslate.json";

type Params = Record<string, string | number>;

interface TranslationContextType {
  translations: any;
  version: string;
  translate: (key: TranslationKeys, params?: Params) => string | string[];
}

const TranslationContext = createContext<TranslationContextType>({
  translations: {},
  version: "v1.0.0",
  translate: (key: TranslationKeys) => key,
});

interface Props {
  children: ReactNode;
}

export const TranslationProvider: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const [translations, setTranslations] = useState<any>({});
  const [version, setVersion] = useState<string>("v1.0.0");
  const hasRun = useRef(false); // for first active update

  // Load stored translations or default
  const getTrans = async () => {
    try {
      const stored = await AsyncStorage.getItem("Translate");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTranslations(parsed.json || defaultTranslate);
        setVersion(parsed.version || "v1.0.0");
      } else {
        setTranslations(defaultTranslate);
        setVersion("v1.0.0");
      }
    } catch (error) {
      console.error("❌ Failed to load translations:", error);
      setTranslations(defaultTranslate);
    }
  };

  // Update translations from API if version differs
  const updateTranslations = async () => {
    try {
      // Fetch latest translations from API
      const res = await fetch(`${BASE_URL}/api/translate/latest`);
      const data = await res.json();

      if (data.success && data.data) {
        const { version, json } = data.data;
        if (json && json.en && json.de) {
          // Check existing stored version
          const stored = await AsyncStorage.getItem("Translate");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.version === version) {
              console.log(
                "✅ Translation version is already up to date:",
                version
              );
              return; // same version, no need to update
            }
          }

          // Save new version and translations
          await AsyncStorage.setItem(
            "Translate",
            JSON.stringify({ version, json })
          );
          initializeI18n();
          console.log("✅ Translations updated to version:", version);
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch translations from API:", error);
    }
  };

  useEffect(() => {
    getTrans();

    // Listen for first time app becomes active
    if (AppState.currentState === "active" && !hasRun.current) {
      hasRun.current = true;
      updateTranslations();
    }

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active" && !hasRun.current) {
        hasRun.current = true;
        updateTranslations();
      }
    });

    return () => subscription.remove();
  }, []);

  // Same translate function as original hook
  const translate = (
    key: TranslationKeys,
    params: Params = {}
  ): string | string[] => {
    const lang = i18n.language === "de" ? "de" : "en";
    const translation: any = translations[lang]?.[key];

    if (!translation) {
      console.error(`Missing translation for key: "${key}" in "${lang}"`);
      return key;
    }

    if (typeof translation === "string") {
      return translation.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
        String(params[match] ?? "")
      );
    }

    if (Array.isArray(translation)) {
      return translation.map((item) =>
        typeof item === "string"
          ? item.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
              String(params[match] ?? "")
            )
          : item
      );
    }

    return key;
  };

  translate.currentLanguage = i18n.language;

  return (
    <TranslationContext.Provider value={{ translations, version, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook interface unchanged
export default function useGetTranslation() {
  return useContext(TranslationContext).translate;
}
