"use client";

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

// Redux RTK Query imports
import { BASE_URL } from "@/config";
import useGetTranslation from "@/context/TranslationContext";
import { IUser } from "@/lib/types/user.type";
import { getAuthHeaders } from "@/utils/getAuthHeaders";
import {
  useEditUserMutation,
  useGetSingleUserQuery,
} from "../../redux/features/user/userApi";
import { KeyboardSpacer } from "../keyboard/KeyboardSpacer";

// Define types for Redux state
interface IProps {
  user: IUser;
}

export default function ParentProfile({ user }: IProps) {
  const trans = useGetTranslation();

  const toast = useToast();

  const {
    data: userInfo,
    isSuccess,
    isLoading: userInfoLoading,
    refetch,
  }: any = useGetSingleUserQuery(user?._id || "", {
    skip: !user?._id, // Skip query if user ID is not available
  });
  const [editUser, { isLoading: isUpdating }] = useEditUserMutation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For local preview
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetOrHouseNumber, setStreetOrHouseNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [residence, setResidence] = useState("");

  // Populate form fields when userInfo is loaded
  useEffect(() => {
    if (isSuccess && userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setPhoneNumber(userInfo.phoneNumber || "");
      setStreetOrHouseNumber(userInfo.streetOrHouseNumber || "");
      setPostCode(userInfo.postCode ? String(userInfo.postCode) : "");
      setResidence(userInfo.residance || "");
      setSelectedImage(userInfo.image || null); // Set initial image for preview
    }
  }, [isSuccess, userInfo]);

  const handleImagePick = async () => {
    // In a real Expo app, you would use expo-image-picker here:

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // You would then prepare this URI for upload
    }

    // Example of setting a local placeholder image for preview
    // setSelectedImage("https://via.placeholder.com/150/92c953?text=New+Image");
    // set image from picker
    // setSelectedImage(result.assets[0])
    // Fixed: Only set if assets is not null, and use the URI string
    if (result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !postCode || !residence) {
      toast.show(trans("plzFillInReq"), {
        type: "danger",
      });
      return;
    }

    const formData: any = new FormData();
    let imageUrlToSave = userInfo?.image; // Default to existing image

    if (selectedImage && selectedImage !== userInfo?.image) {
      try {
        const fileName = selectedImage.split("/").pop() || "photo.jpg";
        const fileType = fileName.split(".").pop();

        formData.append("image", {
          uri: selectedImage,
          name: fileName,
          type: `image/${fileType}`, // e.g. image/jpeg or image/png
        });

        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          headers: headers,
          body: formData, // No need to manually set content-type
        });

        const imgData = await response.json();
        imageUrlToSave = imgData.imageUrl;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        toast.show("Failed to upload image. Please try again.", {
          type: "danger",
        });
        return;
      }
    }

    const data = {
      image: imageUrlToSave,
      firstName,
      lastName,
      phoneNumber,
      streetOrHouseNumber,
      postCode: Number.parseInt(postCode),
      residance: residence,
    };

    try {
      const res: any = await editUser({ id: user?._id, editData: data });
      if (res.data?.status === 200) {
        toast.show(res.data.message, { type: "success" });
        refetch(); // Refetch user info to update UI
      } else {
        toast.show(res.error?.data?.message || "Failed to update profile.", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.show("An unexpected error occurred during profile update.", {
        type: "danger",
      });
    }
  };

  if (userInfoLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50">
        <ActivityIndicator size="large" color="#8b3888" />
        <Text className="text-gray-600 mt-2">Loading profile...</Text>
      </View>
    );
  }

  return isSuccess ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust based on your header height if any
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-purple-50 p-4 h-full"
      >
        <View
          className="bg-white rounded-lg p-6 shadow-md"
          style={styles.cardShadow}
        >
          <Text className="text-2xl font-bold text-primary text-center mb-4">
            {trans("myAccount")}
          </Text>
          <Text className="text-gray-700 text-base text-center mb-6">
            {trans("reviewEditInfo")}
          </Text>

          <View className="bg-purple-100 rounded-lg p-4 mb-6">
            <Text className="text-gray-700 text-base">
              {trans("emailForRegistration")}:{" "}
              <Text className="font-semibold">{user?.email}</Text>
            </Text>
          </View>

          {/* Image Input */}
          <View className="items-center mb-8">
            <TouchableOpacity
              onPress={handleImagePick}
              className="relative w-32 h-32 rounded-full border-2 border-primary justify-center items-center overflow-hidden"
            >
              <Image
                className="w-full h-full object-cover"
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require("../../assets/images/profile/pobox-profile.png")
                }
                alt="User Profile"
              />
              <TouchableOpacity
                onPress={handleImagePick}
                className="absolute bottom-0 right-0 bg-primary rounded-full p-2"
                style={styles.cameraIconContainer}
              >
                <Image
                  source={require("../../assets/images/profile/camera.png")}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View className="grid grid-cols-1 gap-y-6">
            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("firstName")} <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("lastName")} <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={lastName}
                onChangeText={setLastName}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("phoneNumber")}
              </Text>
              <TextInput
                mode="outlined"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("streetNo")}
              </Text>
              <TextInput
                mode="outlined"
                value={streetOrHouseNumber}
                onChangeText={setStreetOrHouseNumber}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("postCode")} <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={postCode}
                onChangeText={setPostCode}
                keyboardType="numeric"
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2">
                {trans("location")} <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={residence}
                onChangeText={setResidence}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isUpdating}
            className={`bg-primary rounded-lg py-4 mt-8 ${isUpdating ? "opacity-50" : ""}`}
            style={styles.updateButton}
          >
            {isUpdating ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color="white" size="small" />
                <Text className="text-white text-lg font-semibold ml-2">
                  Updating...
                </Text>
              </View>
            ) : (
              <Text className="text-white text-lg font-semibold text-center">
                {trans("update")}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <KeyboardSpacer reduceHeight={220} />
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View className="flex-1 justify-center items-center bg-purple-50">
      <Text className="text-gray-600">Failed to load user data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cameraIconContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: "white", // Make camera icon white
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 50, // Standard height for TextInput
  },
  inputOutline: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000000", // Ensure text color is black
  },
  updateButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
