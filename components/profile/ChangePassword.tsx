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
import { useAuth } from "@/hooks/useAuth";
import { useChangePasswordMutation } from "../../redux/features/user/userApi";

export default function ChangePassword() {
  const trans = useGetTranslation();
  const { user, onLogout } = useAuth();

  const toast = useToast();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;

  const handleSubmit = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    const isValid = passwordRegex.test(password);
    if (!isValid) {
      setPasswordError(trans("passwordRequirement"));
      toast.show(trans("passwordRequirement"), {
        type: "danger",
      });
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(trans("passwordMismatch"));
      toast.show(trans("passwordMismatch"), { type: "danger" });
      return;
    }

    if (!user?.email) {
      toast.show("User email not found. Please log in again.", {
        type: "danger",
      });
      return;
    }

    const data = {
      email: user.email,
      password: password,
    };

    try {
      const response: any = await changePassword(data);
      if (response?.data?.success) {
        toast.show(trans("passwordChangeSuccess"), { type: "success" });
        onLogout();
        // In React Native, you might clear AsyncStorage or other persistent storage here
        // AsyncStorage.removeItem("silverSittingAuth");
        router.push("/auth/login");
      } else {
        toast.show(
          response?.error?.data?.message || trans("somethingWentWrong"),
          { type: "danger" }
        );
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast.show(trans("somethingWentWrong"), {
        type: "danger",
      });
    }
  };

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
              {trans("changePassword")}
            </Text>

            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("enterNewPassword")}
              </Text>
              <TextInput
                mode="outlined"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                secureTextEntry
                autoCapitalize="none"
                style={styles.textInput}
                outlineStyle={[
                  styles.inputOutline,
                  passwordError && styles.inputError,
                ]}
                contentStyle={styles.inputContent}
                textColor="#000000"
                error={!!passwordError}
              />
              {passwordError && (
                <Text className="text-red-500 text-sm mt-1">
                  {passwordError}
                </Text>
              )}
            </View>

            <View className="mb-8">
              <Text className="text-gray-700 text-base mb-2">
                {trans("reEnterPassword")}
              </Text>
              <TextInput
                mode="outlined"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError("");
                }}
                secureTextEntry
                autoCapitalize="none"
                style={styles.textInput}
                outlineStyle={[
                  styles.inputOutline,
                  confirmPasswordError && styles.inputError,
                ]}
                contentStyle={styles.inputContent}
                textColor="#000000"
                error={!!confirmPasswordError}
              />
              {confirmPasswordError && (
                <Text className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`bg-primary rounded-lg py-4 ${isLoading ? "opacity-50" : ""}`}
              style={styles.changeButton}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    {trans("changing")}
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {trans("change")}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Decorative Image */}
          {/* <View className="mt-8 items-center">
            <Image
              source={require("../../assets/images/child-change-password.png")}
              style={styles.childrenImage}
              resizeMode="contain"
            />
          </View> */}
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
  changeButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  childrenImage: {
    width: "80%", // Adjust as needed
    height: 200, // Adjust as needed
  },
});
