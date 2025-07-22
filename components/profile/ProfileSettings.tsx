import { Feather, MaterialIcons } from "@expo/vector-icons"; // Using Feather for FiPlus
import axios from "axios";
import * as DocumentPicker from "expo-document-picker"; // For PDF selection
import * as Linking from "expo-linking"; // For opening PDFs
import * as Notifications from "expo-notifications"; // For notifications
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
import { useToast } from "react-native-toast-notifications";

// Redux RTK Query imports
import { BASE_URL } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import {
  useChangeSearchStatusMutation,
  useChangeVolunteerStatusMutation,
  useGetSingleUserQuery,
} from "../../redux/features/user/userApi";

export default function ProfileSettings() {
  const toast = useToast();
  const { user } = useAuth();

  const {
    data: userInfo,
    refetch,
    isLoading: userInfoLoading,
  }: any = useGetSingleUserQuery(user?._id || "", {
    skip: !user?._id,
  });

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [warningShow, setWarningShow] = useState(false);
  const [parentSearch, setParentSearch] = useState(false); // This will store the *inverted* state for the checkbox
  const [volunteerStatus, setVolunteerStatus] = useState(false);
  const [uploadNotificationId, setUploadNotificationId] = useState<
    string | null
  >(null);

  const [changeSearchStatus, { isLoading: updatingSearchStatus }] =
    useChangeSearchStatusMutation();
  const [changeVolunteerStatus, { isLoading: volunteering }] =
    useChangeVolunteerStatusMutation();

  // Request notification permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        toast.show("Permission to send notifications was denied!", {
          type: "danger",
        });
      }
    })();
  }, []);

  // Initialize state from userInfo
  useEffect(() => {
    if (userInfo) {
      // The web code had `setParentSearch(!userInfo?.parentSearch)`
      // This means if `parentSearch` is true (can be found), the checkbox is unchecked.
      // If `parentSearch` is false (cannot be found), the checkbox is checked.
      // So, `parentSearch` state here represents "I *don't* want to be found".
      setParentSearch(userInfo?.parentSearch === false);
      setVolunteerStatus(userInfo?.isVolunteer || false);
    }
  }, [userInfo]);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Only allow PDF files
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
      }
    } catch (err) {
      console.error("DocumentPicker error:", err);
      toast.show("Failed to pick document.", { type: "danger" });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.show("Please select a file first.", { type: "warning" });
      return;
    }

    // File size check (15 MB limit)
    if (selectedFile.size && selectedFile.size > 15 * 1024 * 1024) {
      toast.show("File size exceeds 15MB limit!", { type: "danger" });
      return;
    }

    setUploading(true);

    // Schedule initial notification
    const initialNotificationId = await Notifications.scheduleNotificationAsync(
      {
        content: {
          title: "Uploading Document",
          body: "Starting upload...",
          data: { type: "upload_progress" },
          sound: false,
        },
        trigger: null, // Show immediately
      }
    );
    setUploadNotificationId(initialNotificationId);

    const formData = new FormData();
    formData.append("pdf", {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.mimeType || "application/pdf",
    } as any); // Type assertion needed for FormData.append with RN file objects
    formData.append("user", user?._id || "");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/pdf/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: async (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Upload progress: ${percentCompleted}%`);

            // Update notification with progress
            if (uploadNotificationId) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Uploading Document",
                  body: `Upload progress: ${percentCompleted}%`,
                  data: { type: "upload_progress" },
                  sound: false,
                },
                trigger: null,
                identifier: uploadNotificationId, // Update existing notification
              });
            }
          },
        }
      );

      if (response.data?.success) {
        toast.show("Certificate uploaded successfully!", { type: "success" });
        refetch();
        setSelectedFile(null); // Clear selected file after successful upload

        // Final success notification
        if (uploadNotificationId) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Upload Complete",
              body: "Your document has been uploaded successfully!",
              data: { type: "upload_complete" },
            },
            trigger: null,
            identifier: uploadNotificationId,
          });
        }
      } else {
        toast.show(response.data?.message || "An error occurred.", {
          type: "danger",
        });
        // Final failure notification
        if (uploadNotificationId) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Upload Failed",
              body: response.data?.message || "Failed to upload document.",
              data: { type: "upload_failed" },
            },
            trigger: null,
            identifier: uploadNotificationId,
          });
        }
      }
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
      toast.show(
        error.response?.data?.message || "An unexpected error occurred.",
        { type: "danger" }
      );
      // Final failure notification
      if (uploadNotificationId) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Upload Failed",
            body:
              error.response?.data?.message || "An unexpected error occurred.",
            data: { type: "upload_failed" },
          },
          trigger: null,
          identifier: uploadNotificationId,
        });
      }
    } finally {
      setUploading(false);
      setUploadNotificationId(null); // Clear notification ID
    }
  };

  const handleChangeSearchStatus = async () => {
    // Send the *actual* desired state to the backend
    const res: any = await changeSearchStatus({
      id: user?._id,
      data: { parentSearch: !parentSearch }, // If parentSearch is true (checkbox checked), send false (don't want to be found)
    });
    if (res?.data?.success) {
      toast.show("Search status updated successfully!", { type: "success" });
      refetch();
    } else {
      toast.show(
        res?.error?.data?.message || "An error occurred. Please try again.",
        { type: "danger" }
      );
    }
  };

  const handleVolunteerStatusChange = async () => {
    const res: any = await changeVolunteerStatus({
      id: user?._id,
      data: { isVolunteer: !volunteerStatus }, // Toggle the status
    });
    if (res?.data?.success) {
      toast.show("Search status updated successfully!", { type: "success" });
      refetch();
    } else {
      toast.show(
        res?.error?.data?.message || "An error occurred. Please try again.",
        { type: "danger" }
      );
    }
  };

  const handleViewPdf = async () => {
    if (
      userInfo?.documentStatus === "accepted" ||
      userInfo?.documentStatus === "uploaded"
    ) {
      const pdfUrl = `${BASE_URL}/${user?._id}`; // Example URL to fetch the PDF
      try {
        await Linking.openURL(pdfUrl);
      } catch (error) {
        console.error("Error opening PDF:", error);
        toast.show("Could not open document. Please try again.", {
          type: "danger",
        });
      }
    } else {
      toast.show("No document uploaded yet.", { type: "info" });
    }
  };

  if (userInfoLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-50">
        <ActivityIndicator size="large" color="theme('colors.primary')" />
        <Text className="text-gray-600 mt-2">Loading profile...</Text>
      </View>
    );
  }

  return (
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
        <View className="rounded-lg p-6 shadow" style={styles.sectionCard}>
          <Text className="text-3xl font-bold text-primary text-center mb-8">
            Settings
          </Text>

          {/* File Upload Section */}
          <View
            className="mb-8 p-6 bg-purple-50 rounded-lg shadow-md"
            style={styles.sectionCard}
          >
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Extended Certificate of Good Conduct
            </Text>

            {userInfo?.documentStatus === "uploaded" && (
              <>
                <Text className="text-gray-700 mb-1">
                  Your certificate of good conduct has been successfully
                  uploaded and will now be checked.
                </Text>
                {selectedFile ? (
                  <Text className="text-gray-500 text-sm">
                    {selectedFile.name}
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-sm">
                    {userInfo?.documentName || "document.pdf"}
                  </Text> // Assuming userInfo.documentName exists
                )}
              </>
            )}
            {userInfo?.documentStatus === "accepted" && (
              <>
                <Text className="text-green-600 font-semibold mb-1">
                  Certificate accepted!
                </Text>
                {selectedFile ? (
                  <Text className="text-gray-500 text-sm">
                    {selectedFile.name}
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-sm">
                    {userInfo?.documentName || "document.pdf"}
                  </Text>
                )}
              </>
            )}
            {userInfo?.documentStatus === "rejected" && (
              <>
                <Text className="text-red-600 font-semibold mb-1">
                  Certificate rejected!
                </Text>
                {selectedFile ? (
                  <Text className="text-gray-500 text-sm">
                    {selectedFile.name}
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-sm">
                    {userInfo?.documentName || "document.pdf"}
                  </Text>
                )}
              </>
            )}

            {(userInfo?.documentStatus === "not-uploaded" ||
              userInfo?.documentStatus === "rejected") && (
              <>
                <View className="flex-row items-center justify-between flex-wrap gap-4 mt-4 mb-2">
                  <TouchableOpacity
                    onPress={handleDocumentPick}
                    className="bg-primary rounded-lg py-3 px-4 flex-row items-center justify-center"
                    disabled={uploading}
                  >
                    <Feather
                      name="plus"
                      size={20}
                      color="white"
                      className="mr-2"
                    />
                    <Text className="text-white text-base font-semibold">
                      Select Extended Certificate
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleUpload}
                    disabled={uploading || !selectedFile}
                    className={`bg-primary rounded-lg py-3 px-4 ${
                      uploading || !selectedFile ? "opacity-50" : ""
                    } flex-row items-center justify-center`}
                  >
                    {uploading ? (
                      <ActivityIndicator
                        color="white"
                        size="small"
                        className="mr-2"
                      />
                    ) : (
                      <Text className="text-white text-base font-semibold">
                        Upload PDF
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                {selectedFile ? (
                  <Text className="text-gray-700 text-sm mb-2">
                    Selected: {selectedFile.name}
                  </Text>
                ) : (
                  <Text className="text-gray-600 text-sm mb-2">
                    Only PDF documents are allowed (max 15MB)
                  </Text>
                )}
              </>
            )}

            {(userInfo?.documentStatus === "uploaded" ||
              userInfo?.documentStatus === "accepted") && (
              <TouchableOpacity
                onPress={handleViewPdf}
                className="bg-gray-200 rounded-lg py-3 px-4 flex-row items-center justify-center mt-2"
              >
                <MaterialIcons
                  name="visibility"
                  size={20}
                  color="theme('colors.primary')"
                  className="mr-2"
                />
                <Text className="text-primary text-base font-semibold">
                  View Document
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Search Status Section */}
          <View
            className="mb-8 p-6 bg-purple-50 rounded-lg shadow-md"
            style={styles.sectionCard}
          >
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <TouchableOpacity
                  onPress={() => setParentSearch(!parentSearch)}
                  className={`w-5 h-5 border-2 rounded mr-3 ${
                    !parentSearch
                      ? "bg-primary border-primary"
                      : "border-gray-400"
                  } justify-center items-center`}
                >
                  {!parentSearch && (
                    <Text className="text-white text-sm text-center">✓</Text>
                  )}
                </TouchableOpacity>
                <Text className="text-gray-700 text-base flex-1 leading-snug">
                  I want to be found by parents
                </Text>
                <TouchableOpacity
                  onPress={() => setWarningShow(!warningShow)}
                  className="ml-2"
                >
                  <Image
                    source={require("../../assets/icons/profile/info.png")}
                    style={styles.infoIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {updatingSearchStatus ? (
              <View className="bg-gray-200 rounded-lg py-4 px-6 flex-row items-center justify-center">
                <ActivityIndicator
                  color="theme('colors.primary')"
                  size="small"
                  className="mr-2"
                />
                <Text className="text-primary text-lg font-semibold">
                  Saving...
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleChangeSearchStatus}
                className="bg-primary rounded-lg py-4 px-6 flex-row items-center justify-center"
              >
                <Text className="text-white text-lg font-semibold">Save</Text>
              </TouchableOpacity>
            )}
            {warningShow && (
              <View className="mt-4 p-3 bg-blue-50 rounded-lg">
                <Text className="text-blue-700 text-sm">
                  Note: If you deactivate this, your profile will no longer be
                  displayed in the search results.
                </Text>
              </View>
            )}
          </View>

          {/* Volunteer Status Section */}
          <View
            className="mb-8 p-6 bg-purple-50 rounded-lg shadow-md"
            style={styles.sectionCard}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <TouchableOpacity
                  onPress={() => setVolunteerStatus(!volunteerStatus)}
                  className={`w-5 h-5 border-2 rounded mr-3 ${
                    volunteerStatus
                      ? "bg-primary border-primary"
                      : "border-gray-400"
                  } justify-center items-center`}
                >
                  {volunteerStatus && (
                    <Text className="text-white text-sm text-center">✓</Text>
                  )}
                </TouchableOpacity>
                <Text className="text-gray-700 text-base flex-1 leading-snug">
                  I work as a volunteer (without compensation)
                </Text>
              </View>
            </View>
            {volunteering ? (
              <View className="bg-gray-200 rounded-lg py-4 px-6 flex-row items-center justify-center">
                <ActivityIndicator
                  color="theme('colors.primary')"
                  size="small"
                  className="mr-2"
                />
                <Text className="text-primary text-lg font-semibold">
                  Saving...
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleVolunteerStatusChange}
                className="bg-primary rounded-lg py-4 px-6 flex-row items-center justify-center"
              >
                <Text className="text-white text-lg font-semibold">Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  infoIcon: {
    width: 20,
    height: 20,
    tintColor: "#666", // Adjust color if needed
  },
  sectionCard: {
    backgroundColor: "#f8f9fa", // Light background for the sections within the main card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
