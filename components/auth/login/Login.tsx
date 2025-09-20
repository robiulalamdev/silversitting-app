import { KeyboardAvoidingScrollView } from "@/components/keyboard/KeyboardAvoidingScrollView";
import {
  useLoginMutation,
  useSendResendEmailMutation,
} from "@/redux/features/user/userApi";
import { RelativePathString, useRouter } from "expo-router";
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

// ✅ Import translation hook
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";

interface LoginFormData {
  email: string;
  password: string;
}

type IProps = {
  isPopup?: boolean;
  onHide?: () => void;
};

export default function Login({ isPopup = false, onHide = () => {} }: IProps) {
  const { redirectPath, setRedirectPath, setUserData } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [errors, setErrors] = useState("");
  const [resendErrors, setResendErrors] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [isResendAllowed, setIsResendAllowed] = useState(true);

  // ✅ Translation hook usage
  const trans = useGetTranslation();

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
        toast.show(trans("activationLinkSent"), { type: "success" });
        setIsResendAllowed(false);
        setResendErrors("");
      } else {
        toast.show(trans("somethingWentWrong"), { type: "danger" });
      }
    } catch (error) {
      toast.show(trans("somethingWentWrong"), { type: "danger" });
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
        setUserData({
          _id: response.data.user._id,
          role: response.data.user.role,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          isVerified: response.data.user.isVerified,
          residance: response.data.user.residance,
        });
        toast.show(trans("loginSuccessful"), { type: "success" });
        if (isPopup) {
          onHide();
        } else {
          if (redirectPath) {
            const rp = redirectPath;
            setRedirectPath(null);
            router.replace(rp as RelativePathString);
          } else {
            router.replace("/(tabs)");
          }
        }
      } else if (response.error) {
        const errorMessage = response.error.data?.message;

        if (errorMessage === trans("pleaseVerifyYourEmail")) {
          setResendErrors(errorMessage);
          setResendEmail(data.email);
        } else if (errorMessage === "Ungültiger Benutzer oder Passwort") {
          setErrors(trans("invalidAcPass"));
        } else {
          setErrors(trans("somethingWentWrong"));
        }
      } else {
        setErrors(trans("somethingWentWrong"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(trans("somethingWentWrong"));
      toast.show(trans("loginFailed"), { type: "danger" });
    }
  };

  return (
    <KeyboardAvoidingScrollView>
      <View className="flex-1 bg-white px-6 py-8 justify-center">
        {/* Title */}
        <Text className="text-3xl font-bold text-primary text-center mb-12">
          {trans("logIn")}
        </Text>

        {/* Email Address Field */}
        <View className="mb-6">
          <Text className="text-gray-700 text-base mb-2">
            {trans("emailAddress")} <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: trans("emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: trans("invalidEmail"),
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
            {trans("password")} <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: trans("passwordRequired"),
              minLength: {
                value: 6,
                message: trans("passwordMinLength"),
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
            {trans("forgotPassword")}
          </Text>
        </TouchableOpacity>

        {/* Error Messages */}
        {errors && (
          <Text className="text-red-500 text-sm mb-4 text-center">
            {errors}
          </Text>
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
                <Text className="text-primary font-semibold">
                  {sendingEmail ? trans("sending") : trans("resendEmail")}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-green-600 text-sm">
                {trans("verificationLinkSent")}
              </Text>
            )}
          </View>
        )}

        {/* Login Button */}
        <TouchableRipple
          onPress={handleSubmit(onSubmit)}
          className="bg-primary rounded-lg h-14 justify-center items-center mb-8"
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
              {isLoading ? trans("loggingIn") : trans("logIn")}
            </Text>
          </View>
        </TouchableRipple>

        {/* Register Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-700 text-base">{trans("newHere")} </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/register");
              onHide();
            }}
          >
            <Text className="text-primary text-base font-medium">
              {trans("register")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingScrollView>
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
