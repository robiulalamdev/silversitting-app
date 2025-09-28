// useGetTranslation.ts (No changes needed here, as the i18n instance is now correctly initialized)
import translations, { TranslationKeys } from "@/utils/translation";
import { useTranslation } from "react-i18next";

type Params = Record<string, string | number>;

export default function useGetTranslation() {
  const { i18n } = useTranslation();

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

// // useGetTranslation.ts (No changes needed here, as the i18n instance is now correctly initialized)
// import translations, { TranslationKeys } from "@/utils/translation";
// import { useTranslation } from "react-i18next";

// type Params = Record<string, string | number>;

// export default function useGetTranslation() {
//   const { i18n } = useTranslation();
//   try {
//     const translate = (key: TranslationKeys, params: Params = {}) => {
//       const lang = i18n.language === "de" ? "de" : "en";
//       const translation: any = translations[lang][key];

//       if (!translation) {
//         console.error(`Missing translation for key: "${key}" in "${lang}"`);
//         return key;
//       }

//       return translation.replace(/\{\{(\w+)\}\}/g, (_: any, match: string) =>
//         String(params[match] ?? "")
//       );
//     };

//     translate.currentLanguage = i18n.language;

//     return translate;
//   } catch (error) {
//     console.log(error);
//   }
// }
