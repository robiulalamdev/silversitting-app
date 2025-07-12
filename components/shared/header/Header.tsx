import { ASSETS } from "@/constants/assets";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Divider, Menu } from "react-native-paper";

export default function Header() {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleMenuPress = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const router = useRouter();
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setLanguageMenuVisible(false);
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
    handleCloseDrawer?.();
  };

  const handleNavigation = (route: any) => {
    router.push(route);
    handleCloseDrawer?.();
  };

  const DrawerContent = () => (
    <View style={styles.drawerContent}>
      {/* Close button */}
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          onPress={handleCloseDrawer}
          style={styles.closeButton}
        >
          <MaterialIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Company Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/")}
        >
          <Text style={styles.menuItemText}>For Child Carer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/")}
        >
          <Text style={styles.menuItemText}>For Parents</Text>
        </TouchableOpacity>
      </View>

      <Divider style={styles.divider} />

      {/* Language Selector */}
      <View style={styles.section}>
        <Menu
          visible={languageMenuVisible}
          onDismiss={() => setLanguageMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.languageSelector}
              onPress={() => setLanguageMenuVisible(true)}
            >
              <Text style={styles.languageText}>{selectedLanguage}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => handleLanguageSelect("ENG")}
            title="English"
          />
          <Menu.Item
            onPress={() => handleLanguageSelect("DE")}
            title="Deutsch"
          />
        </Menu>
      </View>

      <Divider style={styles.divider} />

      {/* Login Button */}
      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
        >
          Login
        </Button>
      </View>
    </View>
  );

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        {/* Left side - Menu and Logo */}
        <View style={styles.leftSection}>
          {/* Logo - You can replace this with your actual logo */}
          <View style={styles.logoContainer}>
            <Image
              source={ASSETS.Logo}
              className="w-[100px] h-[50px]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Right side - could add additional items here */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={handleMenuPress}>
            <MaterialIcons name="menu" size={24} color="#8b3888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Drawer Overlay */}
      {showDrawer && (
        <>
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.backdrop}
            onPress={handleCloseDrawer}
            activeOpacity={1}
          />

          {/* Drawer */}
          <View style={styles.drawer}>
            <DrawerContent />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8b3888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoIconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400",
  },
  logoTextBold: {
    fontWeight: "bold",
    color: "#8b3888",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "white",
    zIndex: 999,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 60, // Account for status bar
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  menuItemText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 20,
  },
  divider: {
    marginHorizontal: 20,
    backgroundColor: "#e5e7eb",
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  languageText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#8b3888",
    borderRadius: 8,
    paddingVertical: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
