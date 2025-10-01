import { TranslationKeys } from "@/utils/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import defaultTranslate from "../utils/defaultTranslate.json";

type Params = Record<string, string | number>;

export default function useGetTranslation() {
  const { i18n } = useTranslation();
  const [translations, setTranslations] = useState<any>({});
  const [version, setVersion] = useState<string>("");

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

  useEffect(() => {
    getTrans();
  }, []);

  try {
    const translate = (
      key: TranslationKeys,
      params: Params = {}
    ): string | string[] => {
      const lang = i18n.language === "de" ? "de" : "en";
      const translation: any = translations[lang]?.[key];

      // fallback if missing
      if (!translation) {
        console.error(`Missing translation for key: "${key}" in "${lang}"`);
        return key; // always return something
      }

      // ✅ String
      if (typeof translation === "string") {
        return translation.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
          String(params[match] ?? "")
        );
      }

      // ✅ Array
      if (Array.isArray(translation)) {
        return translation.map((item) =>
          typeof item === "string"
            ? item.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
                String(params[match] ?? "")
              )
            : item
        );
      }

      return key; // fallback for objects/unknown
    };

    translate.currentLanguage = i18n.language;

    return translate;
  } catch (error) {
    console.log(error);
    return () => ""; // fallback safe function
  }
}
