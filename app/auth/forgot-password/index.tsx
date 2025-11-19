import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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

import useGetTranslation from "@/context/TranslationContext";
import { useResetPasswordMutation } from "@/redux/features/register/registerApi";

export default function ForgotPasswordScreen() {
  const trans = useGetTranslation();
  const toast = useToast();
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return trans("emailRequired");
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(value)) return trans("invalidEmail");
    return "";
  };

  const handleSubmit = async () => {
    const errorMsg = validateEmail(email);
    if (errorMsg) {
      setEmailError(errorMsg);
      return;
    }

    try {
      const response: any = await resetPassword({ email });
      if (response?.data?.success) {
        setSuccess(true);
      } else {
        setServerError(trans("somethingWentWrong"));
      }
    } catch (error) {
      toast.show(trans("somethingWentWrong"), { type: "danger" });
    }
  };

  // ✅ Show success screen
  if (success) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Text className="text-xl text-center text-primary font-bold mb-6">
          🎉 {trans("resetSuccess")}
        </Text>
        <Text className="text-lg text-center text-gray-800 mb-6">
          {trans("resetPasswordMsg")}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("")}
          className="bg-primary px-6 py-3 rounded-lg"
          style={styles.buttonShadow}
        >
          <Text className="text-white font-semibold">{trans("goHome")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Default: email input form
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        className="flex-1 bg-purple-50"
      >
        <View className="flex-1 justify-center items-center p-4">
          <View
            className="bg-white rounded-lg p-6 shadow-md w-full max-w-md"
            style={styles.formCardShadow}
          >
            <Text className="text-2xl font-bold text-primary text-center mb-8">
              {trans("resetPasswordTitle")}
            </Text>

            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("emailAddress")} <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                mode="outlined"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                  setServerError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={styles.textInput}
                outlineStyle={[
                  styles.inputOutline,
                  (emailError || serverError) && styles.inputError,
                ]}
                contentStyle={styles.inputContent}
                textColor="#000000"
                error={!!emailError || !!serverError}
              />
              {emailError ? (
                <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
              ) : serverError ? (
                <Text className="text-red-500 text-sm mt-1">{serverError}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`bg-primary rounded-lg py-4 ${isLoading ? "opacity-50" : ""}`}
              style={styles.buttonShadow}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    {trans("sendingEmail")}
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {trans("reset")}
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formCardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 50,
  },
  inputOutline: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000000",
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
