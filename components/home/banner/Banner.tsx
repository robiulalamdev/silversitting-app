import { COLORS } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons"; // Using for placeholder icons
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

type SelectedTab = "caregiver" | "children";

export default function Banner() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("caregiver"); // Default to 'Find Caregiver'
  const [careAddress, setCareAddress] = useState("");

  const backgroundImage =
    selectedTab === "caregiver"
      ? require("../../../assets/images/home/banner/banner1.png")
      : require("../../../assets/images/home/banner/banner.png");

  const handleFindCaregiver = () => {
    setSelectedTab("caregiver");
  };

  const handleCareChildren = () => {
    setSelectedTab("children");
  };

  const handleRegister = () => {
    router.push({
      pathname: "/(auth)/register",
      params: {
        role: "childcarer",
      },
    });
  };

  const handleFindNow = () => {
    if (careAddress) {
      router.push({
        pathname: "/child-care",
        params: {
          location: careAddress,
        },
      });
    }
  };

  const handleLearnMore = () => {};

  return (
    <View style={styles.container}>
      {/* Background with blur */}
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
      ></ImageBackground>

      {/* Content Card */}

      <BlurView
        intensity={100}
        tint="default"
        style={styles.card}
        className="border border-primary"
      >
        {/* Title */}
        <Text style={styles.title}>Seniors take care of children</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedTab === "caregiver" && styles.selectedActionButton,
            ]}
            onPress={handleFindCaregiver}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require("../../../assets/images/home/banner/caregiver.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionButtonText}>Find{"\n"}Caregiver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedTab === "children" && styles.selectedActionButton,
            ]}
            onPress={handleCareChildren}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require("../../../assets/images/home/banner/children.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionButtonText}>Care{"\n"}children</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Content based on selectedTab */}
        {selectedTab === "caregiver" ? (
          <>
            {/* Address Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={careAddress}
                onChangeText={setCareAddress}
                placeholder="Enter care address"
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="black"
                placeholderTextColor="black"
              />
            </View>

            {/* Find Now Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleFindNow}
            >
              <Text style={styles.primaryButtonText}>Find now</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Description Text */}
            <Text style={styles.description}>
              Take care of children and get compensation from parents if you
              want.
            </Text>

            {/* Register Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRegister}
            >
              <Text style={styles.primaryButtonText}>
                Register as a child carer
              </Text>
            </TouchableOpacity>

            {/* Learn More Link */}
            <TouchableOpacity
              style={styles.learnMoreContainer}
              onPress={handleLearnMore}
            >
              <Text style={styles.learnMoreText}>Learn more</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#666" />
            </TouchableOpacity>
          </>
        )}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center", // Center the card vertically
    alignItems: "center", // Center the card horizontally
    height: 650,
    maxHeight: 650,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: 650,
    maxHeight: 650,
  },
  card: {
    width: "90%", // Adjust width as needed
    maxWidth: 400, // Max width for larger screens
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#8b3888",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 30,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1, // Add border for selection
    borderColor: "white", // Default transparent
  },
  selectedActionButton: {
    backgroundColor: "white",
  },
  iconContainer: {
    marginBottom: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: "transparent",
    fontSize: 16,
    height: 40, // Explicitly set height for TextInput root
  },
  inputOutline: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#000000",
    height: 40, // Explicitly set height for inner content
  },
  description: {
    fontWeight: 600,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#8b3888",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  learnMoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  learnMoreText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
