import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

// Add actual Redux imports
import ChildCareSearchError from "@/components/child-care/ChildCareSearchError";
import SearchResult from "@/components/child-care/SearchResult";

import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { useGetSearchedChildCarerMutation } from "@/redux/features/childCareSearch/childCareSearchApi";
import {
  setChildCarerFilterData,
  setCity,
  setStep,
} from "@/redux/features/childCareSearch/childCareSearchSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

export default function ChildCareUi() {
  const trans = useGetTranslation();
  const { location = "" } = useLocalSearchParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const { city, step } = useSelector(
    (state: RootState) => state.childCarerFilter
  );

  const { user } = useAuth();

  const [cityInputValue, setCityInputValue] = useState(city || "");
  const [lookfor, setLookfor] = useState<("Female" | "Male")[]>([]);
  const [warning, setWarning] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [distanceInputValue, setDistanceInputValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [offers, setOffers] = useState<string[]>([]);

  const [getSearchedChildCarer, { isLoading }] =
    useGetSearchedChildCarerMutation();

  const handleLookFor = (value: "Female" | "Male") => {
    setLookfor((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleOfferProvideValue = (value: string) => {
    setOffers((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSearchFormSubmit = async () => {
    setSearchError("");
    let maxDistance = Number(distanceInputValue);
    if (maxDistance > 30) {
      maxDistance = 30;
      setDistanceInputValue("30"); // Update input to reflect capped value
    }

    let currentCity = cityInputValue;

    if (!currentCity) {
      if (user?.residance) {
        Alert.alert("Use Current Location?", trans("useLocationPrompt"), [
          {
            text: "No",
            style: "cancel",
            onPress: () => {
              setSearchError(trans("addressPrompt"));
            },
          },
          {
            text: "Yes",
            onPress: () => {
              dispatch(setCity(user.residance));
              setCityInputValue(user.residance);
              currentCity = user.residance;
              // Re-run search with updated city
              triggerSearch({ currentCity, maxDistance });
            },
          },
        ]);
        return; // Exit to wait for user confirmation
      } else {
        setSearchError(trans("addressLoginPrompt"));
        return;
      }
    }

    triggerSearch({ currentCity, maxDistance });
  };

  const triggerSearch = async ({
    currentCity,
    maxDistance,
  }: {
    currentCity: string;
    maxDistance: number;
  }) => {
    const filterCriteria: any = {};
    if (lookfor.length === 1) {
      filterCriteria.gender = lookfor[0];
    }
    if (currentCity) {
      filterCriteria.city = currentCity;
    }
    if (maxDistance) {
      filterCriteria.maxDistance = maxDistance;
    }

    const data = {
      offerProvide: offers,
    };

    try {
      const res: any = await getSearchedChildCarer({ filterCriteria, data });

      if (res?.data?.length > 0) {
        dispatch(setChildCarerFilterData(res?.data));
        dispatch(setStep(1)); // Assuming step 1 or 2 for results
      } else if (res?.data?.length === 0) {
        dispatch(setStep("error"));
      } else if (res?.error?.data?.message === trans("distanceExceed")) {
        setWarning(true); // This warning is for the input field, not a step change
        toast.show("Search distance cannot exceed 30km.", { type: "warning" });
      } else if (res?.error?.data?.message === trans("noMatchedUsers")) {
        dispatch(setStep("error"));
      } else {
        dispatch(setStep("error"));
      }
    } catch (err) {
      console.error("Search API error:", err);
      dispatch(setStep("error"));
      toast.show("An unexpected error occurred during search.", {
        type: "danger",
      });
    }
  };

  // Initialize city input from router query on mount
  useEffect(() => {
    if (location && typeof location === "string") {
      setCityInputValue(location);
      triggerSearch({ currentCity: location, maxDistance: 0 });
    }
  }, [location]);

  const handleSearchAgain = () => {
    setOffers([]);
    setLookfor([]);
    dispatch(setCity(""));
    setCityInputValue("");
    setDistanceInputValue("");
    dispatch(setStep(0));
    setWarning(false);
    setSearchError("");
  };

  const handleChangeDistance = (value: string) => {
    setDistanceInputValue(value);
    const numValue = Number(value);
    if (numValue > 30) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };

  const openModal = () => {
    setModalShow(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      {/* Banner */}
      <View className="bg-[#faf6fb] py-12 items-center justify-center mt-5">
        {step === 0 && (
          <Text className="text-3xl font-bold text-primary text-center">
            {trans("findChildcareTitle")}
          </Text>
        )}
        {(step === 1 || step === 2) && (
          <Text className="text-3xl font-bold text-primary text-center">
            {trans("searchResultTitle")}
          </Text>
        )}
        {step === "error" && (
          <Text className="text-3xl font-bold text-primary text-center">
            {trans("findChildcareTitle")}
          </Text>
        )}
      </View>

      {/* Childcare Form */}
      {step === 0 && (
        <View className="flex-1 p-6">
          <View className="bg-[#fcf9fc] rounded-lg p-6 relative">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              {trans("lookingForTitle")}
            </Text>
            <View className="flex-row justify-around mb-6">
              <TouchableOpacity
                onPress={() => handleLookFor("Female")}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 ${
                    lookfor.includes("Female")
                      ? "bg-primary border-primary"
                      : "border-gray-400"
                  }`}
                >
                  {lookfor.includes("Female") && (
                    <Text className="text-white text-xs text-center">✓</Text>
                  )}
                </View>
                <Text className="text-gray-700 text-base">
                  {trans("grannyLabel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLookFor("Male")}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 ${
                    lookfor.includes("Male")
                      ? "bg-primary border-primary"
                      : "border-gray-400"
                  }`}
                >
                  {lookfor.includes("Male") && (
                    <Text className="text-white text-xs text-center">✓</Text>
                  )}
                </View>
                <Text className="text-gray-700 text-base">
                  {trans("grandpaLabel")}
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-semibold text-gray-800 mb-4">
              {trans("nearLabel")}
            </Text>
            <TextInput
              mode="outlined"
              value={cityInputValue}
              onChangeText={setCityInputValue}
              // placeholder="Malchow"
              style={styles.textInput}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              textColor="#000000"
            />
            <View className="flex-row items-center justify-center my-4">
              <Text className="text-gray-700 text-base">
                {" "}
                {trans("maxDistanceLabel")}{" "}
              </Text>
              <TextInput
                mode="outlined"
                value={distanceInputValue}
                onChangeText={handleChangeDistance}
                keyboardType="numeric"
                placeholder="30"
                style={[styles.textInput, styles.distanceInput]}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                textColor="#000000"
              />
              <Text className="text-gray-700 text-base">
                {" "}
                {trans("kmDistanceLabel")}
              </Text>
            </View>

            {warning && (
              <View className="mb-4">
                <Text className="text-red-500 text-sm text-center">
                  {trans("distanceLimitationMessage")}
                </Text>
                <Text className="text-red-500 text-sm text-center">
                  {trans("understandingMessage")}
                </Text>
              </View>
            )}

            <Text className="text-lg font-semibold text-gray-800 mb-4">
              {trans("careTypesTitle")}
            </Text>

            <View className="mb-6">
              {[
                {
                  label: trans("classicBabysittingLabel"),
                  text: trans("classicBabysittingText"),
                },
                {
                  label: trans("childCareLabel1"),
                  text: trans("childCareText1"),
                },
                {
                  label: trans("homeworkHelpLabel1"),
                  text: trans("homeworkHelpText1"),
                },
                {
                  label: trans("homeworkHelpLabel2"),
                  text: trans("homeworkHelpText2"),
                },
                {
                  label: trans("bakingCookingLabel"),
                  text: trans("bakingCookingText"),
                },
                {
                  label: trans("pickupDeliveryLabel"),
                  text: trans("pickupDeliveryText"),
                },
              ].map((offer, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOfferProvideValue(offer.label)}
                  className="flex-row items-center py-2"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded mr-2 ${
                      offers.includes(offer.label)
                        ? "bg-primary border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {offers.includes(offer.label) && (
                      <Text className="text-white text-xs text-center">✓</Text>
                    )}
                  </View>
                  <Text className="text-gray-700 text-base">{offer.text}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {searchError && (
              <Text className="text-red-500 text-sm mb-4 text-center">
                {searchError}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSearchFormSubmit}
              disabled={isLoading}
              className={`bg-primary rounded-lg py-4 px-6 max-w-[140px] mx-auto w-full ${isLoading ? "opacity-50" : ""}`}
              style={styles.searchButton}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    {trans("searchingText")}
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {trans("startSearch")}
                </Text>
              )}
            </TouchableOpacity>
            {/* Info Bubble */}
          </View>
          <View className="absolute right-0 bottom-0 rounded-full rounded-br-none max-w-[130px] w-fit h-fit bg-primary justify-center items-center p-4">
            <MaterialIcons
              name="lightbulb-outline"
              size={20}
              color="white"
              className="mb-1"
            />
            <Text className="text-white text-[10px] text-center">
              If you do not make any restrictions in your search criteria, you
              will be shown all registered supervisors nearby
            </Text>
          </View>
        </View>
      )}

      {/* Search Result */}
      {(step === 1 || step === 2) && (
        <SearchResult handleSearchAgain={handleSearchAgain} />
      )}

      {/* Error Step */}
      {step === "error" && (
        <View className="flex-1 p-6">
          <View
            className="bg-[#faf6fb] rounded-lg p-6 items-center"
            // style={styles.formCardShadow}
          >
            <Text className="text-gray-700 text-base text-center pt-5 mb-4">
              {trans("noMatchedUsersMessage")}
            </Text>
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              {trans("tipTitle")}
            </Text>
            <Text className="text-gray-600 text-base text-center pb-5 mb-6">
              {trans("increaseAreaMessage")}{" "}
              <TouchableOpacity onPress={openModal}>
                <Text className="text-blue-500 underline">
                  {trans("clickHereText")}
                </Text>
              </TouchableOpacity>{" "}
              {trans("notifyMessage")}
            </Text>
            <TouchableOpacity
              onPress={handleSearchAgain}
              className="bg-primary rounded-lg py-4 px-6"
              style={styles.searchButton}
            >
              <Text className="text-white text-lg font-semibold text-center">
                {trans("searchAgainButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ChildCareSearchError
        show={modalShow}
        onHide={() => setModalShow(false)}
        searchOptions={{
          gender: lookfor,
          city: cityInputValue,
          maxDistance: Number(distanceInputValue),
          offerProvide: offers,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    fontSize: 16,
    height: 40, // Explicitly set height for TextInput root
  },
  inputOutline: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#000000",
    height: 40, // Explicitly set height for inner content
  },
  distanceInput: {
    width: 60, // Smaller width for distance input
    textAlign: "center",
    marginHorizontal: 10,
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
  searchButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
