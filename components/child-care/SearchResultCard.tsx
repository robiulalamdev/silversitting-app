"use client";

import useGetTranslation from "@/context/TranslationContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Portal } from "react-native-paper";
import LoginModal from "../common/modals/LoginModal";

interface SearchResultCardProps {
  index: number;
  item: {
    _id: string;
    image?: string;
    firstName: string;
    lastName: string;
    aboutMe: string;
    measuredDistance: number;
    documentStatus?: "accepted" | "pending" | "rejected";
    isVolunteer?: boolean;
  };
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const trans = useGetTranslation();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const [showCertificateConduct, setShowCertificateConduct] =
    useState<boolean>(false);
  const [showWorkWithoutPay, setShowWorkWithoutPay] = useState<boolean>(false);

  const handleContact = useCallback(
    (id: string) => {
      if (!isAuthenticated) {
        setShowLogin(true);
        return;
      }

      if (id === user?._id) {
        return;
      }

      if (id) {
        router.push({
          pathname: "/child-care/message/[id]",
          params: { id: id },
        });
      }
    },
    [isAuthenticated, router, user?._id]
  );

  return (
    <View className="bg-white rounded-lg p-4 mb-4 border border-primary">
      <View className="mb-4">
        <Image
          source={
            item?.image
              ? { uri: item.image }
              : require("../../assets/images/child-care/person.png")
          }
          style={styles.profileImage}
          resizeMode="contain"
          className="mx-auto"
        />
        <View className="">
          <Text className="text-lg font-bold text-primary mb-1">
            {item?.firstName} {item?.lastName}
          </Text>
          <Text className="text-gray-600 text-sm leading-snug">
            {item?.aboutMe}
          </Text>
        </View>
      </View>

      <View className="">
        <Text className="text-base font-semibold text-primary text-center">
          {trans("Distance")}
        </Text>
        <Text className="text-gray-600 text-sm text-center">
          {Math.round(item?.measuredDistance)}km
        </Text>
      </View>

      <View className="">
        {item?._id === user?._id ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                trans("contactYourselfAlertTitle") || "",
                trans("contactYourselfAlertMessage"),
                [{ text: "OK" }]
              );
            }}
            className="bg-red-600 rounded-lg py-3 px-10 mx-auto mt-4"
          >
            <Text className="text-white text-base font-semibold">
              {trans("you")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleContact(item?._id)}
            className="bg-primary rounded-lg py-3 px-6 mx-auto mt-4"
          >
            <Text className="text-white text-base font-semibold">
              {trans("Contact")}
            </Text>
          </TouchableOpacity>
        )}

        <View className="flex-row items-center justify-center gap-2 mt-4">
          {item?.documentStatus === "accepted" && (
            <>
              <View style={styles.iconContainer}>
                {showCertificateConduct && (
                  <Portal>
                    {/* Overlay for outside click */}
                    <TouchableWithoutFeedback
                      onPress={() => setShowCertificateConduct(false)}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 50,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </Portal>
                )}

                <TouchableOpacity
                  onPress={() => setShowCertificateConduct((prev) => !prev)}
                >
                  <Image
                    source={require("../../assets/images/child-care/Fuehrungszeugnis_geprueft_kleiner_neu.png")}
                    alt="Führungszeugnis Icon"
                    style={styles.smallIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {showCertificateConduct && (
                  <View className="absolute z-10 top-7 right-[-60px] w-[150px] bg-primary/25 p-3 rounded-md">
                    <Text className="text-sm">
                      {trans("CertificateOfGoodConduct")}
                    </Text>
                  </View>
                )}
              </View>

              {item?.isVolunteer && (
                <View style={styles.iconContainer}>
                  {showWorkWithoutPay && (
                    <Portal>
                      {/* Overlay for outside click */}
                      <TouchableWithoutFeedback
                        onPress={() => setShowWorkWithoutPay(false)}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 50,
                          }}
                        />
                      </TouchableWithoutFeedback>
                    </Portal>
                  )}

                  <TouchableOpacity
                    onPress={() => setShowWorkWithoutPay((prev) => !prev)}
                  >
                    <Image
                      source={require("../../assets/images/child-care/Logo_Herz_lila_70px.jpg")}
                      alt="Herz Icon"
                      style={styles.smallIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {showWorkWithoutPay && (
                    <View className="absolute z-10 top-7 right-[-60px] w-[150px] bg-primary/25 p-3 rounded-md">
                      <Text className="text-sm">
                        {trans("IWorkWithoutPay")}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </View>

      <LoginModal visible={showLogin} setVisible={setShowLogin} />
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make it circular
  },
  smallIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    position: "relative", // For tooltip positioning if implemented
  },
});
