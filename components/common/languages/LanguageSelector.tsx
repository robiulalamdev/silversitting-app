// LanguageSelector.tsx (No changes needed here, as the i18n instance is now correctly initialized)
import { ILanguageType } from "@/lib/types";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);

  const languages: { label: string; code: ILanguageType }[] = [
    { label: "English", code: "en" },
    { label: "Deutsch", code: "de" },
  ];

  const selectedLanguage =
    languages.find((lang) => lang.code === i18n.language)?.label || "English";

  const changeLanguage = async (code: "de" | "en") => {
    i18n.changeLanguage(code);
    await AsyncStorage.setItem("lan", code);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.languageSelector}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
          </TouchableOpacity>
        }
      >
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            title={lang.label}
          />
        ))}
      </Menu>
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 16,
    color: "#333",
    marginRight: 6,
  },
});
