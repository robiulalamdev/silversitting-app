// useGetTranslation.ts (No changes needed here, as the i18n instance is now correctly initialized)
import translations, { TranslationKeys } from "@/utils/translation";
import { useTranslation } from "react-i18next";

type Params = Record<string, string | number>;

export default function useGetTranslation() {
  const { i18n } = useTranslation();

  const translate = (key: TranslationKeys, params: Params = {}) => {
    const lang = i18n.language === "de" ? "de" : "en";
    const translation: any = translations[lang][key];

    if (!translation) {
      console.error(`Missing translation for key: "${key}" in "${lang}"`);
      return key;
    }

    return translation.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
      String(params[match] ?? "")
    );
  };

  translate.currentLanguage = i18n.language;

  return translate;
}
