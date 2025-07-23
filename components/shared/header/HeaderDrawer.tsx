import LanguageSelector from "@/components/common/languages/LanguageSelector";
import { useAuth } from "@/hooks/useAuth";
import { useGlobal } from "@/hooks/useGlobal";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider } from "react-native-paper";

const HeaderDrawer = () => {
  const { showMenu, handleShowMenu } = useGlobal();
  const { isAuthenticated, onLogout } = useAuth();
  const drawerAnim = useRef(new Animated.Value(300)).current;

  const router = useRouter();

  useEffect(() => {
    if (showMenu === true) {
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    return () => {};
  }, [showMenu]);

  const handleCloseDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      handleShowMenu(false);
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

  return (
    <>
      {showMenu && (
        <>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={handleCloseDrawer}
            activeOpacity={1}
          />
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
          >
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
          </Animated.View>
        </>
      )}
    </>
  );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99999,
  },
  drawer: {
    position: "absolute",
    top: -40,
    right: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "white",
    zIndex: 9999999,
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
    backgroundColor: "white",
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
