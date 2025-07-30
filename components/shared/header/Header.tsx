import { ASSETS } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useGlobal } from "@/hooks/useGlobal";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  const { handleShowMenu } = useGlobal();
  const router = useRouter();

  // const [showSearch, setShowSearch] = useState(false);
  // const searchWidth = useRef(new Animated.Value(0)).current;
  // const [searchText, setSearchText] = useState("");

  // const handleSearchToggle = () => {
  //   if (showSearch) {
  //     Animated.timing(searchWidth, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start(() => setShowSearch(false));
  //   } else {
  //     setShowSearch(true);
  //     Animated.timing(searchWidth, {
  //       toValue: 200,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // };

  // const handleSearch = (text: string) => {
  //   setSearchText(text);
  // };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Pressable
            onPress={() => router.push("/(tabs)")}
            style={styles.logoContainer}
          >
            <Image
              source={ASSETS.Logo}
              className="w-[100px] h-[50px]"
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <View style={styles.rightSection}>
          {/* <TouchableOpacity
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
          )} */}

          <TouchableOpacity
            onPress={() => router.push("/(profile)/pro-box")}
            style={{ marginRight: 20 }}
          >
            <MaterialIcons name="message" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleShowMenu(true)}>
            <MaterialIcons name="menu" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
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
    zIndex: 99999,
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
