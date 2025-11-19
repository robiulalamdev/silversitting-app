import useGetTranslation from "@/hooks/useGetTranslation";
import { useAddFeedbackMutation } from "@/redux/features/common/commonApi";
import { useRouter } from "expo-router";
import { useState } from "react";
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

export default function Feedback() {
  const trans = useGetTranslation();
  const router = useRouter();
  const toast = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(0);

  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !feedbackMessage) {
      toast.show(
        trans("PleaseFillOut") || "Please complete all required fields",
        { type: "danger" }
      );
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      phone,
      feedbackMessage,
      rating,
    };

    try {
      const res: any = await addFeedback(data);
      if (res.data?.status === 200) {
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setFeedbackMessage("");
        setRating(0);

        toast.show(
          trans("feedbackSuccessMessage") || "Thank you for your feedback!",
          { type: "success" }
        );
        router.push("/");
      } else {
        toast.show(
          trans("feedbackErrorMessage") ||
            "Something went wrong. Please try again.",
          { type: "danger" }
        );
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.show(
        trans("feedbackErrorMessage") ||
          "Something went wrong. Please try again.",
        { type: "danger" }
      );
    }
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingPress(i)}
          className="mx-1"
        >
          <Image
            source={
              i <= rating
                ? require("../../assets/icons/feedback/filledLove.png")
                : require("../../assets/icons/feedback/details.like.png")
            }
            style={styles.ratingIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-purple-50"
      >
        <View className="flex-1 p-6">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
              {trans("feedbackHeading") ||
                "We would like to know what you think"}
            </Text>
          </View>

          {/* Form Container */}
          <View className="p-2 mb-6">
            {/* Name Fields */}
            <View className="flex-row gap-4 mb-6">
              <View className="flex-1">
                <Text className="text-gray-700 text-base mb-2">
                  {trans("firstNameshort") || "First Name"}{" "}
                  <Text className="text-red-500">*</Text>
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
              <View className="flex-1">
                <Text className="text-gray-700 text-base mb-2">
                  {trans("lastNameshort") || "Last Name"}{" "}
                  <Text className="text-red-500">*</Text>
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
            </View>

            {/* Email Field */}
            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("email") || "Email"}{" "}
                <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            {/* Phone Field */}
            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("phone") || "Phone"}
              </Text>
              <TextInput
                mode="outlined"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            {/* Rating Section */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {trans("rateUs") || "Rate us"}
              </Text>
              <View className="flex-row justify-center items-center">
                {renderRatingStars()}
              </View>
            </View>

            {/* Feedback Message */}
            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("feedbackPlaceholder") || "What could we improve?"}{" "}
                <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={feedbackMessage}
                onChangeText={setFeedbackMessage}
                placeholder={
                  trans("feedbackPlaceholder") || "What could we improve?"
                }
                multiline
                numberOfLines={4}
                style={styles.textAreaInput}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`bg-primary rounded-lg py-4 ${isLoading ? "opacity-50" : ""}`}
              style={styles.submitButton}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    {trans("sending") || "Sending..."}
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {trans("sendFeedback") || "Send Feedback"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formCardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 50,
  },
  textAreaInput: {
    backgroundColor: "white",
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
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
  submitButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingIcon: {
    width: 32,
    height: 32,
  },
  childImage: {
    width: "80%",
    height: 200,
  },
});
