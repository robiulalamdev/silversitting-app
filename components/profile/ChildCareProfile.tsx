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
import { BASE_URL } from "@/config"; // Assuming BASE_URL is defined here
import { IUser } from "@/lib/types/user.type";
import {
  useEditUserMutation,
  useGetSingleUserQuery,
} from "../../redux/features/user/userApi";

// Define types for Redux state
interface IProps {
  user: IUser;
}

export default function ChildCareProfile({ user }: IProps) {
  const toast = useToast();

  const {
    data: userInfo,
    isSuccess,
    isLoading: userInfoLoading,
    refetch,
  }: any = useGetSingleUserQuery(user?._id || "", {
    skip: !user?._id,
  });
  const [editUser, { isLoading: isUpdating }] = useEditUserMutation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetOrHouseNumber, setStreetOrHouseNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [residence, setResidence] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | undefined>(
    undefined
  );
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState("");
  const [charCount, setCharCount] = useState(500);

  useEffect(() => {
    if (isSuccess && userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setPhoneNumber(userInfo.phoneNumber || "");
      setStreetOrHouseNumber(userInfo.streetOrHouseNumber || "");
      setPostCode(userInfo.postCode ? String(userInfo.postCode) : "");
      setResidence(userInfo.residance || "");
      setSelectedImage(userInfo.image || null);
      setGender(userInfo.gender || undefined);
      setAvailabilities(userInfo.availability || []);
      setOffers(userInfo.offerProvide || []);
      setAboutMe(userInfo.aboutMe || "");
      setCharCount(500 - (userInfo.aboutMe?.length || 0));
    }
  }, [isSuccess, userInfo]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAvailabilityValue = (value: string) => {
    setAvailabilities((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleOfferProvideValue = (value: string) => {
    setOffers((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleAboutMeChange = (value: string) => {
    if (value.length <= 500) {
      setAboutMe(value);
      setCharCount(500 - value.length);
    }
  };

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !postCode ||
      !residence ||
      !gender ||
      availabilities.length === 0 ||
      offers.length === 0 ||
      !aboutMe
    ) {
      toast.show("Please fill in all required fields (marked with *).", {
        type: "danger",
      });
      return;
    }

    const formData: any = new FormData();
    let imageUrlToSave = userInfo?.image;

    if (selectedImage && selectedImage !== userInfo?.image) {
      try {
        const fileName = selectedImage.split("/").pop() || "photo.jpg";
        const fileType = fileName.split(".").pop();
        formData.append("image", {
          uri: selectedImage,
          name: fileName,
          type: `image/${fileType}`,
        });

        const response = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
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
      gender,
      aboutMe,
      availability: availabilities,
      offerProvide: offers,
    };

    try {
      const res: any = await editUser({ id: user?._id, editData: data });
      if (res.data?.status === 200) {
        toast.show(res.data.message, { type: "success" });
        refetch();
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-purple-50 p-4"
      >
        <View
          className="bg-white rounded-lg p-6 shadow-md"
          style={styles.cardShadow}
        >
          <Text className="text-2xl font-bold text-primary text-center mb-4">
            Information About You
          </Text>
          <Text className="text-gray-700 text-base text-center mb-6">
            In order to be found by parents as a childcare worker, some
            information about you is required. This information is the only way
            to ensure that care is provided that meets your expectations.
          </Text>

          <View className="bg-purple-100 rounded-lg p-4 mb-6">
            <Text className="text-gray-700 text-base">
              You are registered on SilverSitting with this email address:{" "}
              <Text className="font-semibold">{user?.email}</Text>
            </Text>
            <Text className="text-gray-600 text-sm mt-1">
              Please always use this email address when registering.
            </Text>
          </View>

          {/* Image Input */}
          <View className="items-center mb-8">
            <View className="relative w-32 h-32 rounded-full border-2 border-primary justify-center items-center overflow-hidden">
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
            </View>
          </View>

          {/* Input Fields */}
          <View className="gap-y-6">
            <View>
              <Text className="text-gray-700 text-base mb-2">
                First Name <Text className="text-red-500">*</Text>
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
                Last Name <Text className="text-red-500">*</Text>
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
              <Text className="text-gray-700 text-base mb-2">Phone Number</Text>
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
              <Text className="text-gray-700 text-base mb-2">Street, No</Text>
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
                Post Code <Text className="text-red-500">*</Text>
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
                Location <Text className="text-red-500">*</Text>
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

          {/* Checkbox and Radio Input Fields */}
          <View className="mt-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Please fill out carefully to ensure an optimal match with the
              parents
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 text-base mb-2">
                Gender <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row gap-8">
                <TouchableOpacity
                  onPress={() => setGender("Male")}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded-full mr-2 ${
                      gender === "Male"
                        ? "bg-primary border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {gender === "Male" && (
                      <View className="w-2 h-2 bg-white rounded-full self-center mt-0.5" />
                    )}
                  </View>
                  <Text className="text-gray-700">Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender("Female")}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded-full mr-2 ${
                      gender === "Female"
                        ? "bg-primary border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {gender === "Female" && (
                      <View className="w-2 h-2 bg-white rounded-full self-center mt-0.5" />
                    )}
                  </View>
                  <Text className="text-gray-700">Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 text-base mb-2">
                Availability for childcare services{" "}
                <Text className="text-red-500">*</Text>
              </Text>
              {[
                "During the day",
                "In the morning",
                "In the evening",
                "At the weekend",
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAvailabilityValue(item)}
                  className="flex-row items-center py-2"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded mr-2 ${
                      availabilities.includes(item)
                        ? "bg-primary border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {availabilities.includes(item) && (
                      <Text className="text-white text-xs text-center">✓</Text>
                    )}
                  </View>
                  <Text className="text-gray-700 text-base">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 text-base mb-2">
                You Offer <Text className="text-red-500">*</Text>
              </Text>
              {[
                "Classic babysitting for children from 1 year",
                "Child care for children from 3 years on",
                "Pick-up and delivery services",
                "Baking/cooking (for the child and with the child)",
                "Homework help classes 1 - 4",
                "Homework help classes 5 - 7",
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOfferProvideValue(item)}
                  className="flex-row items-center py-2"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded mr-2 ${
                      offers.includes(item)
                        ? "bg-primary border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {offers.includes(item) && (
                      <Text className="text-white text-xs text-center">✓</Text>
                    )}
                  </View>
                  <Text className="text-gray-700 text-base">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Short About You */}
          <View className="mt-8">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Short About You
            </Text>
            <Text className="text-gray-600 text-sm leading-relaxed mb-4">
              This text is displayed in the hit list for the parents. Take the
              opportunity to write a few words about yourself so that the
              parents get a good first impression of you.
            </Text>
            <View className="mb-2">
              <Text className="text-gray-700 text-sm">
                <Text className="font-semibold">NOTE:</Text> Please only provide
                information that is publicly viewable{" "}
                <Text className="text-gray-600 text-sm">({charCount}/500)</Text>{" "}
                <Text className="text-red-500">*</Text>
              </Text>
            </View>
            <TextInput
              mode="outlined"
              value={aboutMe}
              onChangeText={handleAboutMeChange}
              placeholder="Write here...."
              multiline
              maxLength={500}
              style={styles.textAreaInput}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              textColor="#000000"
            />
          </View>

          {/* Save Button */}
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
                  Saving...
                </Text>
              </View>
            ) : (
              <Text className="text-white text-lg font-semibold text-center">
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
    tintColor: "white",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 50,
  },
  textAreaInput: {
    backgroundColor: "white",
    fontSize: 16,
    minHeight: 120, // Min height for textarea
    maxHeight: 200, // Max height before scrolling
    textAlignVertical: "top", // Align text to top for multiline
  },
  inputOutline: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000000",
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
