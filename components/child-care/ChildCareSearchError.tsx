"use client";

import useGetTranslation from "@/hooks/useGetTranslation";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={onHide} // For Android back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onHide} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-800 mb-4 text-center">
            {trans("noMatchedUsers")}
          </Text>
          <Text className="text-gray-600 text-base text-center mb-6">
            {trans("searchErrorExplanation1")}
          </Text>

          <Text className="text-base font-semibold text-gray-800 mb-2">
            Your Search Options:
          </Text>
          <View className="mb-6">
            <Text className="text-gray-700 text-sm">
              Gender: {searchOptions.gender.join(", ") || "Any"}
            </Text>
            <Text className="text-gray-700 text-sm">
              City: {searchOptions.city || "Not specified"}
            </Text>
            <Text className="text-gray-700 text-sm">
              Max Distance: {searchOptions.maxDistance || "N/A"}km
            </Text>
            <Text className="text-gray-700 text-sm">
              Care Types: {searchOptions.offerProvide.join(", ") || "Any"}
            </Text>
          </View>

          <Text className="text-base font-semibold text-gray-800 mb-2">
            Tip:
          </Text>
          <Text className="text-gray-600 text-base text-center mb-6">
            Try increasing your search area or adjusting your criteria.
          </Text>

          <TouchableOpacity
            onPress={onHide}
            className="bg-primary rounded-lg py-3 px-6"
          >
            <Text className="text-white text-base font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxWidth: 400,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});
