"use client";

import {
  useLoginMutation,
  useSendResendEmailMutation,
} from "@/redux/features/user/userApi";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, TouchableRipple } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

// Redux hooks - you can import these from your actual Redux setup

interface LoginFormData {
  email: string;
  password: string;
}

type IProps = {
  isPopup?: boolean;
  onHide?: () => void;
};

export default function Login({ isPopup = false, onHide = () => {} }: IProps) {
  const router = useRouter();
  const toast = useToast();
  const [errors, setErrors] = useState("");
  const [resendErrors, setResendErrors] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [isResendAllowed, setIsResendAllowed] = useState(true);

  // Redux mutations
  const [login, { isLoading }] = useLoginMutation();
  const [sendResendEmail, { isLoading: sendingEmail }] =
    useSendResendEmailMutation();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleResendLink = async () => {
    try {
      const response: any = await sendResendEmail({ email: resendEmail });
      if (response?.data?.success) {
        toast.show("Activation link sent successfully!", { type: "success" });
        setIsResendAllowed(false);
        setResendErrors("");
      } else {
        toast.show("Something went wrong. Please try again.", {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("Failed to send activation link", { type: "danger" });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrors("");
      setResendErrors("");

      const response: any = await login({
        email: data.email,
        password: data.password,
      });

      if (response.data?.accessToken) {
        toast.show("Login successful!", { type: "success" });
        if (isPopup) {
          onHide();
        } else {
          router.back();
        }
      } else if (response.error) {
        const errorMessage = response.error.data?.message;

        if (errorMessage === "Please verify your email") {
          setResendErrors(errorMessage);
          setResendEmail(data.email);
        } else {
          setErrors(errorMessage || "Something went wrong");
        }
      } else {
        setErrors("Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors("Something went wrong");
      toast.show("Login failed. Please try again.", { type: "danger" });
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-8 justify-center">
      {/* Title */}
      <Text className="text-3xl font-bold text-purple-600 text-center mb-12">
        Log in
      </Text>

      {/* Email Address Field */}
      <View className="mb-6">
        <Text className="text-gray-700 text-base mb-2">
          Email Address <Text className="text-red-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.textInput}
              outlineStyle={[
                styles.inputOutline,
                formErrors.email && styles.inputError,
              ]}
              contentStyle={styles.inputContent}
              textColor="#000000"
              error={!!formErrors.email}
            />
          )}
        />
        {formErrors.email && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.email.message}
          </Text>
        )}
      </View>

      {/* Password Field */}
      <View className="mb-4">
        <Text className="text-gray-700 text-base mb-2">
          Password <Text className="text-red-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder=""
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={styles.textInput}
              outlineStyle={[
                styles.inputOutline,
                formErrors.password && styles.inputError,
              ]}
              contentStyle={styles.inputContent}
              textColor="#000000"
              error={!!formErrors.password}
            />
          )}
        />
        {formErrors.password && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.password.message}
          </Text>
        )}
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/forgot-password");
          onHide();
        }}
        className="mb-8"
      >
        <Text className="text-blue-500 text-base font-bold">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Error Messages */}
      {errors && (
        <Text className="text-red-500 text-sm mb-4 text-center">{errors}</Text>
      )}

      {/* Resend Email Section */}
      {resendErrors && (
        <View className="mb-6 p-4 bg-red-50 rounded-lg">
          <Text className="text-red-600 text-sm mb-2">{resendErrors}</Text>
          {isResendAllowed ? (
            <TouchableOpacity
              onPress={handleResendLink}
              disabled={sendingEmail}
            >
              <Text className="text-purple-600 font-semibold">
                {sendingEmail ? "Sending..." : "Resend Email"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-green-600 text-sm">
              Verification link sent!
            </Text>
          )}
        </View>
      )}

      {/* Login Button */}
      <TouchableRipple
        onPress={handleSubmit(onSubmit)}
        className="bg-purple-600 rounded-lg h-14 justify-center items-center mb-8"
        disabled={isLoading}
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
      >
        <View className="flex-row items-center">
          {isLoading && (
            <ActivityIndicator
              color="white"
              size="small"
              style={{ marginRight: 8 }}
            />
          )}
          <Text className="text-white text-lg font-semibold text-center">
            {isLoading ? "Logging in..." : "Log in"}
          </Text>
        </View>
      </TouchableRipple>

      {/* Register Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-700 text-base">
          New Here? Click here to{" "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/register");
            onHide();
          }}
        >
          <Text className="text-purple-600 text-base font-medium">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  loginButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
});
