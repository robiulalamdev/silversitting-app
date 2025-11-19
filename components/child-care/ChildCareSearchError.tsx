import { BASE_URL } from "@/config";
import useGetTranslation from "@/context/TranslationContext";
import { getAuthHeaders } from "@/utils/getAuthHeaders";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChildCareSearchErrorProps {
  show: boolean;
  onHide: () => void;
  searchOptions: {
    gender: string[];
    city: string;
    maxDistance: number;
    offerProvide: string[];
  };
}

export default function ChildCareSearchError({
  show,
  onHide,
  searchOptions,
}: ChildCareSearchErrorProps) {
  const trans = useGetTranslation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    if (!email.trim()) {
      setError(trans("emailRequired"));
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const requestData = { email, searchOptions };

      const headers = await getAuthHeaders({
        "Content-Type": "application/json",
      });

      const response = await fetch(`${BASE_URL}/api/searchRequest/save`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessMessage(trans("successMessage"));
        setTimeout(() => {
          setSuccessMessage("");
          onHide();
        }, 2000);
      } else {
        setError(trans("saveErrorMessage"));
      }
    } catch (err) {
      console.error(err);
      setError(trans("saveErrorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={show}
      onRequestClose={onHide}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl w-[90%] max-w-md p-6">
          {/* Close button */}
          <TouchableOpacity onPress={onHide} className="absolute top-3 right-3">
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-lg font-semibold text-center text-gray-900 mb-4">
            {trans("searchErrorHeader")}
          </Text>

          {/* Description */}
          <Text className="text-center text-base text-gray-700 mb-3">
            {trans("searchErrorExplanation1")}
          </Text>
          <Text className="text-center text-base text-gray-700 mb-6">
            {trans("searchErrorExplanation2")}
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder={trans("emailPlaceholder")}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800 w-full mb-4"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleFormSubmit}
            disabled={loading}
            className={`rounded-lg py-3 px-5 w-full ${
              loading ? "opacity-70" : ""
            } bg-primary`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-semibold text-center">
                {trans("notificationButton")}
              </Text>
            )}
          </TouchableOpacity>

          {/* Messages */}
          {successMessage ? (
            <Text className="text-green-600 mt-3 text-center">
              {successMessage}
            </Text>
          ) : error ? (
            <Text className="text-red-600 mt-3 text-center">{error}</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
