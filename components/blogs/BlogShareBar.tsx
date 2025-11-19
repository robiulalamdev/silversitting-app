import { WEBSITE_URL } from "@/config";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface BlogShareBarProps {
  blogId: string;
}

export default function BlogShareBar({ blogId }: BlogShareBarProps) {
  const baseUrl = WEBSITE_URL;

  const blogUrl = `${baseUrl}/blogs/details/${blogId}`;

  // Platform share link handlers
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
    Linking.openURL(url);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
    Linking.openURL(url);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
    Linking.openURL(url);
  };

  const shareToSystem = async () => {
    try {
      await Share.share({
        message: blogUrl,
        url: blogUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={shareToFacebook} style={styles.iconButton}>
        <FontAwesome name="facebook" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareToLinkedIn} style={styles.iconButton}>
        <FontAwesome name="linkedin" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareToTwitter} style={styles.iconButton}>
        <FontAwesome name="twitter" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareToSystem} style={styles.iconButton}>
        <Feather name="share-2" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },
  iconButton: {
    backgroundColor: "#c9a6d1", // your purple shade
    padding: 10,
    borderRadius: 8,
  },
});
