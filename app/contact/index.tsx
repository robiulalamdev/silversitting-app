import useGetTranslation from "@/hooks/useGetTranslation";
import { useMakeContactMutation } from "@/redux/features/common/commonApi";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [makeContact, { isLoading }] = useMakeContactMutation();
  const router = useRouter();
  const toast = useToast();
  const trans = useGetTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res: any = await makeContact(data);
      if (res.data?.status === 200) {
        reset();
        toast.show(res.data.message || "Message sent successfully!", {
          type: "success",
        });
        router.push("/");
      } else if (res.error) {
        toast.show(
          trans("errorOccurred") || "An error occurred. Please try again.",
          { type: "danger" }
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.show(
        trans("errorOccurred") || "An error occurred. Please try again.",
        { type: "danger" }
      );
    }
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
          <View className="items-center mb-8 mt-4">
            <Text className="text-3xl font-bold text-primary text-center">
              {trans("contact")}
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-white rounded-lg p-6">
            {/* Name Fields Row */}
            <View className="flex-row gap-x-4 mb-6">
              <View className="flex-1">
                <Text className="text-gray-700 text-base mb-2">
                  {trans("firstNameContact")}{" "}
                  <Text className="text-red-500">*</Text>
                </Text>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: "First name is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={styles.textInput}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.firstName && styles.inputError,
                      ]}
                      contentStyle={styles.inputContent}
                      textColor="#000000"
                      error={!!errors.firstName}
                    />
                  )}
                />
                {errors.firstName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-gray-700 text-base mb-2">
                  {trans("lastNameContact")}{" "}
                  <Text className="text-red-500">*</Text>
                </Text>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: "Last name is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={styles.textInput}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.lastName && styles.inputError,
                      ]}
                      contentStyle={styles.inputContent}
                      textColor="#000000"
                      error={!!errors.lastName}
                    />
                  )}
                />
                {errors.lastName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Email Field */}
            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("email")} <Text className="text-red-500">*</Text>
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
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
                    outlineStyle={[
                      styles.inputOutline,
                      errors.email && styles.inputError,
                    ]}
                    contentStyle={styles.inputContent}
                    textColor="#000000"
                    error={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Phone Field */}
            <View className="mb-6">
              <Text className="text-gray-700 text-base mb-2">
                {trans("phone")} <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    style={styles.textInput}
                    outlineStyle={[
                      styles.inputOutline,
                      errors.phone && styles.inputError,
                    ]}
                    contentStyle={styles.inputContent}
                    textColor="#000000"
                    error={!!errors.phone}
                  />
                )}
              />
              {errors.phone && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </Text>
              )}
            </View>

            {/* Message Field */}
            <View className="mb-8">
              <Text className="text-gray-700 text-base mb-2">
                {trans("writeAMessage")} <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="message"
                rules={{ required: "Message is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={trans("writeAMessage")}
                    multiline
                    numberOfLines={6}
                    style={styles.textAreaInput}
                    outlineStyle={[
                      styles.inputOutline,
                      errors.message && styles.inputError,
                    ]}
                    contentStyle={styles.inputContent}
                    textColor="#000000"
                    error={!!errors.message}
                  />
                )}
              />
              {errors.message && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              loading={isLoading}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText}
            >
              {trans("submit")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 50,
  },
  textAreaInput: {
    backgroundColor: "white",
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
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
  submitButton: {
    backgroundColor: "#8b3888",
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
