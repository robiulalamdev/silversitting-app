import LanguageSelector from "@/components/common/languages/LanguageSelector";
import { ASSETS } from "@/constants/assets";
import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider } from "react-native-paper";

export default function Header() {
  const { isAuthenticated, onLogout } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerAnim = useRef(new Animated.Value(300)).current;

  const [showSearch, setShowSearch] = useState(false);
  const searchWidth = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleMenuPress = () => {
    setShowDrawer(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setShowDrawer(false);
    });
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
    handleCloseDrawer();
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    handleCloseDrawer();
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      Animated.timing(searchWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowSearch(false));
    } else {
      setShowSearch(true);
      Animated.timing(searchWidth, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log("Searching for:", text);
  };

  const DrawerContent = () => (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          onPress={handleCloseDrawer}
          style={styles.closeButton}
        >
          <MaterialIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

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

        {isAuthenticated && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("/(profile)")}
          >
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/insights")}
        >
          <Text style={styles.menuItemText}>Insights</Text>
        </TouchableOpacity>

        {isAuthenticated && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation("/settings")}
          >
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/legal")}
        >
          <Text style={styles.menuItemText}>Legal</Text>
        </TouchableOpacity>
      </View>

      <Divider style={styles.divider} />

      <LanguageSelector />

      <Divider style={styles.divider} />

      <View style={styles.section}>
        {isAuthenticated ? (
          <Button
            mode="contained"
            onPress={onLogout}
            className="!bg-primary !rounded-md py-1"
            labelStyle={styles.loginButtonText}
          >
            Logout
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={styles.loginButtonText}
          >
            Login
          </Button>
        )}
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            <Image
              source={ASSETS.Logo}
              className="w-[100px] h-[50px]"
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={handleSearchToggle}
            style={{ marginRight: 10 }}
          >
            <MaterialIcons name="search" size={24} color="#8b3888" />
          </TouchableOpacity>

          {showSearch && (
            <Animated.View style={[styles.searchBox, { width: searchWidth }]}>
              <View style={styles.searchInner}>
                <TextInput
                  placeholder="Search..."
                  placeholderTextColor="#999"
                  value={searchText}
                  onChangeText={handleSearch}
                  style={styles.searchInput}
                  autoFocus
                  onBlur={handleSearchToggle}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => handleSearch("")}>
                    <MaterialIcons name="close" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          )}

          <TouchableOpacity onPress={handleMenuPress}>
            <MaterialIcons name="menu" size={24} color="#8b3888" />
          </TouchableOpacity>
        </View>
      </View>

      {showDrawer && (
        <>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={handleCloseDrawer}
            activeOpacity={1}
          />
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
          >
            <DrawerContent />
          </Animated.View>
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
    top: -40,
    right: 0,
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
    paddingTop: 60,
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
  searchBox: {
    height: 36,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    fontSize: 14,
    paddingVertical: 0,
    color: "#333",
    flex: 1,
    marginRight: 6,
  },
});
