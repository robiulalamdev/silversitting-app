// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import {
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { RadioButton, TextInput } from "react-native-paper";
// import { useToast } from "react-native-toast-notifications";

// interface RegisterFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   postCode: string;
//   residence: string;
//   streetOrHouseNumber?: string;
//   password: string;
//   rePassword: string;
//   gender: "Male" | "Female" | "";
//   older?: boolean;
//   terms: boolean;
//   privacy: boolean;
// }

// type UserRole = "childcarer" | "parents" | "";

// interface RegisterState {
//   step: number;
//   role: UserRole;
// }

// export default function Register() {
//   const { role = "" } = useLocalSearchParams();

//   const toast = useToast();
//   const [registerState, setRegisterState] = useState<RegisterState>({
//     step: 1,
//     role: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [warningShow, setWarningShow] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<RegisterFormData>({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       postCode: "",
//       residence: "",
//       streetOrHouseNumber: "",
//       password: "",
//       rePassword: "",
//       gender: "",
//       older: false,
//       terms: false,
//       privacy: false,
//     },
//   });

//   useEffect(() => {
//     if (role === "childcarer" || role === "parents") {
//       setRegisterState({
//         step: 2,
//         role: role,
//       });
//     }
//   }, [role]);

//   const password = watch("password");

//   const validatePassword = (value: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
//     return (
//       passwordRegex.test(value) ||
//       "Password must contain at least 8 characters with lowercase letter and number"
//     );
//   };

//   const setRole = (role: UserRole) => {
//     setRegisterState((prev) => ({ ...prev, role }));
//   };

//   const nextStep = () => {
//     if (registerState.step === 1 && registerState.role) {
//       setRegisterState((prev) => ({ ...prev, step: 2 }));
//     }
//   };

//   const goBack = () => {
//     if (registerState.step === 2) {
//       setRegisterState((prev) => ({ ...prev, step: 1 }));
//     }
//   };

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       setIsLoading(true);

//       // Validation
//       if (data.password !== data.rePassword) {
//         toast.show("Passwords do not match", { type: "danger" });
//         return;
//       }

//       if (registerState.role === "childcarer" && !data.older) {
//         toast.show("Please confirm you are at least 55 years old", {
//           type: "danger",
//         });
//         return;
//       }

//       if (!data.terms || !data.privacy) {
//         toast.show("Please accept terms and privacy policy", {
//           type: "danger",
//         });
//         return;
//       }

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const registerData = {
//         role: registerState.role,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         postCode: Number.parseInt(data.postCode),
//         residence: data.residence,
//         password: data.password,
//         streetOrHouseNumber: data.streetOrHouseNumber,
//         gender: data.gender,
//       };

//       console.log("Register data:", registerData);

//       // Move to success step
//       setRegisterState((prev) => ({ ...prev, step: 3 }));
//       toast.show("Registration successful! Please check your email.", {
//         type: "success",
//       });
//     } catch (error) {
//       toast.show("Registration failed. Please try again.", { type: "danger" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderStepOne = () => (
//     <View className="flex-1 bg-white px-6 py-8 justify-center">
//       <Text className="text-3xl font-bold text-primary text-center mb-8">
//         Register
//       </Text>
//       <Text className="text-xl text-gray-700 text-center mb-8">I am...</Text>

//       <View className="space-y-6 mb-8">
//         <TouchableOpacity
//           onPress={() => setRole("childcarer")}
//           className={`p-6 rounded-lg border-2 ${
//             registerState.role === "childcarer"
//               ? "border-primary bg-purple-50"
//               : "border-gray-200"
//           } mb-8`}
//         >
//           <View className="items-center">
//             <Image
//               source={require("../../../assets/icons/auth/register/register-grandma.png")}
//               style={styles.roleImage}
//               resizeMode="contain"
//             />
//             <Text className="text-lg font-medium text-primary mt-2">
//               Child care provider
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setRole("parents")}
//           className={`p-6 rounded-lg border-2 ${
//             registerState.role === "parents"
//               ? "border-primary bg-purple-50"
//               : "border-gray-200"
//           }`}
//         >
//           <View className="items-center">
//             <Image
//               source={require("../../../assets/icons/auth/register/register-parent.png")}
//               style={styles.roleImage}
//               resizeMode="contain"
//             />
//             <Text className="text-lg font-medium text-primary mt-2">
//               Parent
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         onPress={nextStep}
//         disabled={!registerState.role}
//         className={`py-4 rounded-lg ${registerState.role ? "bg-primary" : "bg-gray-300"}`}
//       >
//         <Text className="text-white text-lg font-semibold text-center">
//           Next
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderStepTwo = () => (
//     <ScrollView className="flex-1 bg-white px-6">
//       <View className="py-16">
//         <Text className="text-3xl font-bold text-primary text-center mb-8">
//           Register
//         </Text>

//         {registerState.role === "childcarer" && (
//           <View className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <View className="flex-row items-center mb-2">
//               <Controller
//                 control={control}
//                 name="older"
//                 render={({ field: { onChange, value } }) => (
//                   <TouchableOpacity
//                     onPress={() => onChange(!value)}
//                     className="flex-row items-center"
//                   >
//                     <View
//                       className={`w-5 h-5 border-2 border-primary rounded mr-3 ${value ? "bg-primary" : ""}`}
//                     >
//                       {value && (
//                         <Text className="text-white text-xs text-center">
//                           ✓
//                         </Text>
//                       )}
//                     </View>
//                     <Text className="text-gray-700">
//                       At least 55 years old{" "}
//                       <Text className="text-red-500">*</Text>
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               />
//               <TouchableOpacity
//                 onPress={() => setWarningShow(!warningShow)}
//                 className="ml-2"
//               >
//                 <Text className="text-blue-500 text-lg">ℹ️</Text>
//               </TouchableOpacity>
//             </View>
//             {warningShow && (
//               <Text className="text-sm text-gray-600 mt-2">
//                 Childminders must be at least 55 years old to register.
//               </Text>
//             )}
//           </View>
//         )}

//         <View className="gap-4 mb-6">
//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               First Name <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="firstName"
//               rules={{ required: "First name is required" }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   style={styles.textInput}
//                   textColor="black"
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.firstName && styles.inputError,
//                   ]}
//                   error={!!errors.firstName}
//                 />
//               )}
//             />
//             {errors.firstName && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.firstName.message}
//               </Text>
//             )}
//           </View>

//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               Last Name <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="lastName"
//               rules={{ required: "Last name is required" }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   style={styles.textInput}
//                   textColor="black"
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.lastName && styles.inputError,
//                   ]}
//                   error={!!errors.lastName}
//                 />
//               )}
//             />
//             {errors.lastName && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.lastName.message}
//               </Text>
//             )}
//           </View>
//         </View>

//         <View className="mb-6">
//           <Text className="text-gray-700 text-base mb-2">
//             Gender <Text className="text-red-500">*</Text>
//           </Text>
//           <Controller
//             control={control}
//             name="gender"
//             rules={{ required: "Please select gender" }}
//             render={({ field: { onChange, value } }) => (
//               <View className="flex-row space-x-8">
//                 <TouchableOpacity
//                   onPress={() => onChange("Male")}
//                   className="flex-row items-center"
//                 >
//                   <RadioButton
//                     value="Male"
//                     status={value === "Male" ? "checked" : "unchecked"}
//                     onPress={() => onChange("Male")}
//                   />
//                   <Text className="text-gray-700 ml-2">Masculine</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => onChange("Female")}
//                   className="flex-row items-center"
//                 >
//                   <RadioButton
//                     value="Female"
//                     status={value === "Female" ? "checked" : "unchecked"}
//                     onPress={() => onChange("Female")}
//                   />
//                   <Text className="text-gray-700 ml-2">Feminine</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           {errors.gender && (
//             <Text className="text-red-500 text-sm mt-1">
//               {errors.gender.message}
//             </Text>
//           )}
//         </View>

//         <View className="mb-6">
//           <Text className="text-gray-700 text-base mb-2">
//             Email Address <Text className="text-red-500">*</Text>
//           </Text>
//           <Controller
//             control={control}
//             name="email"
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Please enter a valid email address",
//               },
//             }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//                 onBlur={onBlur}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 style={styles.textInput}
//                 textColor="black"
//                 outlineStyle={[
//                   styles.inputOutline,
//                   errors.email && styles.inputError,
//                 ]}
//                 error={!!errors.email}
//               />
//             )}
//           />
//           {errors.email && (
//             <Text className="text-red-500 text-sm mt-1">
//               {errors.email.message}
//             </Text>
//           )}
//         </View>

//         <View className="flex-row gap-4 mb-6">
//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               Post Code <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="postCode"
//               rules={{ required: "Post code is required" }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   keyboardType="numeric"
//                   style={styles.textInput}
//                   textColor="black"
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.postCode && styles.inputError,
//                   ]}
//                   error={!!errors.postCode}
//                 />
//               )}
//             />
//             {errors.postCode && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.postCode.message}
//               </Text>
//             )}
//           </View>

//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               Residence <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="residence"
//               rules={{ required: "Residence is required" }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   style={styles.textInput}
//                   textColor="black"
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.residence && styles.inputError,
//                   ]}
//                   error={!!errors.residence}
//                 />
//               )}
//             />
//             {errors.residence && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.residence.message}
//               </Text>
//             )}
//           </View>
//         </View>

//         <View className="mb-6">
//           <Text className="text-gray-700 text-base mb-2">
//             Street/House Number
//           </Text>
//           <Controller
//             control={control}
//             name="streetOrHouseNumber"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//                 onBlur={onBlur}
//                 style={styles.textInput}
//                 textColor="black"
//                 outlineStyle={styles.inputOutline}
//               />
//             )}
//           />
//         </View>

//         <View className="gap-4 mb-6">
//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               Password <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="password"
//               rules={{
//                 required: "Password is required",
//                 validate: validatePassword,
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   secureTextEntry
//                   style={styles.textInput}
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.password && styles.inputError,
//                   ]}
//                   error={!!errors.password}
//                 />
//               )}
//             />
//             {errors.password && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </Text>
//             )}
//           </View>

//           <View className="flex-1">
//             <Text className="text-gray-700 text-base mb-2">
//               Re-enter password <Text className="text-red-500">*</Text>
//             </Text>
//             <Controller
//               control={control}
//               name="rePassword"
//               rules={{
//                 required: "Please confirm password",
//                 validate: (value) =>
//                   value === password || "Passwords do not match",
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   secureTextEntry
//                   style={styles.textInput}
//                   outlineStyle={[
//                     styles.inputOutline,
//                     errors.rePassword && styles.inputError,
//                   ]}
//                   error={!!errors.rePassword}
//                 />
//               )}
//             />
//             {errors.rePassword && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.rePassword.message}
//               </Text>
//             )}
//           </View>
//         </View>

//         <View className="mb-6 space-y-4">
//           <Controller
//             control={control}
//             name="terms"
//             rules={{ required: "Please accept terms and conditions" }}
//             render={({ field: { onChange, value } }) => (
//               <TouchableOpacity
//                 onPress={() => onChange(!value)}
//                 className="flex-row items-start"
//               >
//                 <View
//                   className={`w-5 h-5 border-2 border-primary rounded mr-3 mt-1 ${value ? "bg-primary" : ""}`}
//                 >
//                   {value && (
//                     <Text className="text-white text-xs text-center">✓</Text>
//                   )}
//                 </View>
//                 <Text className="text-gray-700 flex-1">
//                   I have read the SilverSitting terms and conditions and agree
//                   to them
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />

//           <Controller
//             control={control}
//             name="privacy"
//             rules={{ required: "Please accept privacy policy" }}
//             render={({ field: { onChange, value } }) => (
//               <TouchableOpacity
//                 onPress={() => onChange(!value)}
//                 className="flex-row items-start"
//               >
//                 <View
//                   className={`w-5 h-5 border-2 border-primary rounded mr-3 mt-1 ${value ? "bg-primary" : ""}`}
//                 >
//                   {value && (
//                     <Text className="text-white text-xs text-center">✓</Text>
//                   )}
//                 </View>
//                 <Text className="text-gray-700 flex-1">
//                   I have read the SilverSitting privacy policy and agree to them
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         <View className="flex-row gap-4 mb-6">
//           <TouchableOpacity
//             onPress={goBack}
//             className="flex-1 py-4 rounded-lg border-2 border-primary max-w-[80px]"
//           >
//             <Text className="text-primary text-lg font-semibold text-center">
//               Go Back
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleSubmit(onSubmit)}
//             disabled={isLoading}
//             className="flex-1 py-4 rounded-lg bg-primary"
//           >
//             {isLoading ? (
//               <View className="flex-row items-center justify-center">
//                 <ActivityIndicator color="white" size="small" />
//                 <Text className="text-white text-lg font-semibold ml-2">
//                   Registering...
//                 </Text>
//               </View>
//             ) : (
//               <Text className="text-white text-lg font-semibold text-center">
//                 Register
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         <Text className="text-center text-gray-600 text-sm">
//           Registration assistance: info@silversitting.com. Happy to help!
//         </Text>
//       </View>
//     </ScrollView>
//   );

//   const renderStepThree = () => (
//     <View className="flex-1 bg-white px-6 py-8 justify-center items-center">
//       <Text className="text-6xl mb-6">📧</Text>
//       <Text className="text-2xl font-bold text-primary text-center mb-4">
//         Registration Complete
//       </Text>
//       <Text className="text-gray-700 text-center mb-6">
//         Please check your email to complete your registration.
//       </Text>
//       <Text className="text-gray-600 text-center text-sm mb-8">
//         For information, a link can be a word.
//       </Text>
//       <TouchableOpacity
//         className="py-4 px-8 rounded-lg bg-primary"
//         onPress={() => {
//           // Handle resend activation link
//           toast.show("Activation link sent!", { type: "success" });
//         }}
//       >
//         <Text className="text-white text-lg font-semibold">
//           Resend Activation Link
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View className="flex-1">
//       {registerState.step === 1 && renderStepOne()}
//       {registerState.step === 2 && renderStepTwo()}
//       {registerState.step === 3 && renderStepThree()}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textInput: {
//     backgroundColor: "white",
//     fontSize: 16,
//     height: 50,
//   },
//   inputOutline: {
//     borderColor: "#e5e7eb",
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   inputError: {
//     borderColor: "#ef4444",
//     borderWidth: 2,
//   },
//   roleImage: {
//     width: 80,
//     height: 80,
//   },
// });

import { KeyboardSpacer } from "@/components/keyboard/KeyboardSpacer";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux"; // Import Redux hooks
import {
  useRegisterMutation,
  useSendResendEmailMutation,
} from "../../../redux/features/user/userApi"; // Adjust path

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  postCode: string;
  residence: string;
  streetOrHouseNumber?: string;
  password: string;
  rePassword: string;
  gender: "Male" | "Female" | "";
  older?: boolean;
  terms: boolean;
  privacy: boolean;
}

type UserRole = "childcarer" | "parents" | "";

interface RegisterState {
  step: number;
  role: UserRole;
}

export default function Register() {
  const { role = "" } = useLocalSearchParams();

  const toast = useToast();
  // Use Redux state for registerPage (step and role)
  const dispatch = useDispatch();

  const [registerState, setRegisterState] = useState<RegisterState>({
    step: 1,
    role: "",
  });

  const [warningShow, setWarningShow] = useState(false);
  const [resendEmailAddress, setResendEmailAddress] = useState(""); // To store email for resending
  const [countdown, setCountdown] = useState(60);
  const [isResendAllowed, setIsResendAllowed] = useState(true);

  // RTK Query hooks
  const [
    registerUser,
    {
      isLoading: isRegistering,
      isError: registerError,
      error: registerApiError,
      data: registerData,
    },
  ] = useRegisterMutation();

  const [
    sendResendEmail,
    {
      isLoading: isSendingResendEmail,
      isError: resendError,
      error: resendApiError,
    },
  ] = useSendResendEmailMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      postCode: "",
      residence: "",
      streetOrHouseNumber: "",
      password: "",
      rePassword: "",
      gender: "",
      older: false,
      terms: false,
      privacy: false,
    },
  });

  useEffect(() => {
    if (role === "childcarer" || role === "parents") {
      setRegisterState({
        step: 2,
        role: role,
      });
    }
  }, [role]);

  useEffect(() => {
    let interval: any;
    if (countdown > 0 && !isResendAllowed) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsResendAllowed(true);
    }
    return () => clearInterval(interval);
  }, [countdown, isResendAllowed]);

  const password = watch("password");

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
    return (
      passwordRegex.test(value) ||
      "Password must contain at least 8 characters with lowercase letter and number"
    );
  };

  const handleSetRole = (role: UserRole) => {
    setRegisterState((prev) => ({ ...prev, role }));
  };

  const handleNextStep = () => {
    if (registerState.step === 1 && registerState.role) {
      setRegisterState((prev) => ({ ...prev, step: 2 }));
    }
  };

  const handleGoBack = () => {
    if (registerState.step === 2) {
      setRegisterState((prev) => ({ ...prev, step: 1 }));
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    // Client-side Validation (some are duplicated from react-hook-form rules for clarity)
    if (data.password !== data.rePassword) {
      toast.show("Passwords do not match", { type: "danger" });
      return;
    }

    if (registerState.role === "childcarer" && !data.older) {
      toast.show("Please confirm you are at least 55 years old", {
        type: "danger",
      });
      return;
    }

    if (!data.terms || !data.privacy) {
      toast.show("Please accept terms and privacy policy", {
        type: "danger",
      });
      return;
    }

    const registerPayload = {
      role: registerState.role,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      postCode: Number.parseInt(data.postCode),
      residence: data.residence,
      password: data.password,
      streetOrHouseNumber: data.streetOrHouseNumber,
      gender: data.gender,
      // The 'older' field is only sent for 'childcarer' as per web code logic
      ...(registerState.role === "childcarer" && { older: data.older }),
    };

    try {
      // Trigger the RTK Query mutation
      const result: any = await registerUser(registerPayload).unwrap();

      if (result.status === 200) {
        setResendEmailAddress(data.email); // Store email for resend functionality

        setRegisterState((prev) => ({ ...prev, step: 3 }));
        toast.show("Registration successful! Please check your email.", {
          type: "success",
        });
      } else {
        // Handle API specific errors returned in the data object but not caught by unwrap()
        toast.show(result.message || "Registration failed. Please try again.", {
          type: "danger",
        });
      }
    } catch (apiError: any) {
      console.error("Registration failed:", apiError);
      const errorMessage =
        apiError.data?.message ||
        apiError.message ||
        "An unexpected error occurred during registration.";
      toast.show(errorMessage, { type: "danger" });
    }
  };

  const handleResendLink = async () => {
    if (!isResendAllowed) {
      toast.show(`Please wait ${countdown} seconds before resending.`, {
        type: "warning",
      });
      return;
    }

    if (!resendEmailAddress) {
      toast.show(
        "No email address available to resend. Please register first.",
        { type: "danger" }
      );
      return;
    }

    try {
      // Trigger the RTK Query mutation
      const result: any = await sendResendEmail({
        email: resendEmailAddress,
      }).unwrap();

      if (result.success) {
        toast.show("Activation link sent!", { type: "success" });
        setIsResendAllowed(false);
        setCountdown(60);
      } else {
        toast.show(
          result.message || "Failed to send activation link. Please try again.",
          { type: "danger" }
        );
      }
    } catch (apiError: any) {
      console.error("Resend email failed:", apiError);
      const errorMessage =
        apiError.data?.message ||
        apiError.message ||
        "An unexpected error occurred while sending the link.";
      toast.show(errorMessage, { type: "danger" });
    }
  };

  const renderStepOne = () => (
    <View className="flex-1 bg-white px-6 py-8 justify-center">
      <Text className="text-3xl font-bold text-primary text-center mb-8">
        Register
      </Text>
      <Text className="text-xl text-gray-700 text-center mb-8">I am...</Text>

      <View className="space-y-6 mb-8">
        <TouchableOpacity
          onPress={() => handleSetRole("childcarer")}
          className={`p-6 rounded-lg border-2 ${
            registerState.role === "childcarer"
              ? "border-primary bg-purple-50"
              : "border-gray-200"
          } mb-8`}
        >
          <View className="items-center">
            <Image
              source={require("../../../assets/icons/auth/register/register-grandma.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
            <Text className="text-lg font-medium text-primary mt-2">
              Child care provider
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSetRole("parents")}
          className={`p-6 rounded-lg border-2 ${
            registerState.role === "parents"
              ? "border-primary bg-purple-50"
              : "border-gray-200"
          }`}
        >
          <View className="items-center">
            <Image
              source={require("../../../assets/icons/auth/register/register-parent.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
            <Text className="text-lg font-medium text-primary mt-2">
              Parent
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleNextStep}
        disabled={!registerState.role}
        className={`py-4 rounded-lg ${registerState.role ? "bg-primary" : "bg-gray-300"}`}
      >
        <Text className="text-white text-lg font-semibold text-center">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStepTwo = () => (
    <ScrollView className="flex-1 bg-white px-6">
      <View className="py-16">
        <Text className="text-3xl font-bold text-primary text-center mb-8">
          Register
        </Text>

        {registerState.role === "childcarer" && (
          <View className="mb-6 p-4 bg-gray-50 rounded-lg">
            <View className="flex-row items-center mb-2">
              <Controller
                control={control}
                name="older"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    onPress={() => onChange(!value)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`w-5 h-5 border-2 border-primary rounded mr-3 ${value ? "bg-primary" : ""}`}
                    >
                      {value && (
                        <Text className="text-white text-xs text-center">
                          ✓
                        </Text>
                      )}
                    </View>
                    <Text className="text-gray-700">
                      At least 55 years old{" "}
                      <Text className="text-red-500">*</Text>
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setWarningShow(!warningShow)}
                className="ml-2"
              >
                <Text className="text-blue-500 text-lg">ℹ️</Text>
              </TouchableOpacity>
            </View>
            {warningShow && (
              <Text className="text-sm text-gray-600 mt-2">
                Childminders must be at least 55 years old to register.
              </Text>
            )}
          </View>
        )}

        <View className="gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-gray-700 text-base mb-2">
              First Name <Text className="text-red-500">*</Text>
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
                  textColor="black"
                  outlineStyle={[
                    styles.inputOutline,
                    errors.firstName && styles.inputError,
                  ]}
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
              Last Name <Text className="text-red-500">*</Text>
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
                  textColor="black"
                  outlineStyle={[
                    styles.inputOutline,
                    errors.lastName && styles.inputError,
                  ]}
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

        <View className="mb-6">
          <Text className="text-gray-700 text-base mb-2">
            Gender <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Please select gender" }}
            render={({ field: { onChange, value } }) => (
              <View className="flex-row space-x-8">
                <TouchableOpacity
                  onPress={() => onChange("Male")}
                  className="flex-row items-center"
                >
                  <RadioButton
                    value="Male"
                    status={value === "Male" ? "checked" : "unchecked"}
                    onPress={() => onChange("Male")}
                  />
                  <Text className="text-gray-700 ml-2">Masculine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChange("Female")}
                  className="flex-row items-center"
                >
                  <RadioButton
                    value="Female"
                    status={value === "Female" ? "checked" : "unchecked"}
                    onPress={() => onChange("Female")}
                  />
                  <Text className="text-gray-700 ml-2">Feminine</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.gender && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.gender.message}
            </Text>
          )}
        </View>

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
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
                textColor="black"
                outlineStyle={[
                  styles.inputOutline,
                  errors.email && styles.inputError,
                ]}
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

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-gray-700 text-base mb-2">
              Post Code <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              name="postCode"
              rules={{ required: "Post code is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  style={styles.textInput}
                  textColor="black"
                  outlineStyle={[
                    styles.inputOutline,
                    errors.postCode && styles.inputError,
                  ]}
                  error={!!errors.postCode}
                />
              )}
            />
            {errors.postCode && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.postCode.message}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-gray-700 text-base mb-2">
              Residence <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              name="residence"
              rules={{ required: "Residence is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.textInput}
                  textColor="black"
                  outlineStyle={[
                    styles.inputOutline,
                    errors.residence && styles.inputError,
                  ]}
                  error={!!errors.residence}
                />
              )}
            />
            {errors.residence && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.residence.message}
              </Text>
            )}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 text-base mb-2">
            Street/House Number
          </Text>
          <Controller
            control={control}
            name="streetOrHouseNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.textInput}
                textColor="black"
                outlineStyle={styles.inputOutline}
              />
            )}
          />
        </View>

        <View className="gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-gray-700 text-base mb-2">
              Password <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                validate: validatePassword,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  style={styles.textInput}
                  outlineStyle={[
                    styles.inputOutline,
                    errors.password && styles.inputError,
                  ]}
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-gray-700 text-base mb-2">
              Re-enter password <Text className="text-red-500">*</Text>
            </Text>
            <Controller
              control={control}
              name="rePassword"
              rules={{
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  style={styles.textInput}
                  outlineStyle={[
                    styles.inputOutline,
                    errors.rePassword && styles.inputError,
                  ]}
                  error={!!errors.rePassword}
                />
              )}
            />
            {errors.rePassword && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.rePassword.message}
              </Text>
            )}
          </View>
        </View>

        <View className="mb-6 space-y-4">
          <Controller
            control={control}
            name="terms"
            rules={{ required: "Please accept terms and conditions" }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!value)}
                className="flex-row items-start"
              >
                <View
                  className={`w-5 h-5 border-2 border-primary rounded mr-3 mt-1 ${value ? "bg-primary" : ""}`}
                >
                  {value && (
                    <Text className="text-white text-xs text-center">✓</Text>
                  )}
                </View>
                <Text className="text-gray-700 flex-1">
                  I have read the SilverSitting terms and conditions and agree
                  to them
                </Text>
              </TouchableOpacity>
            )}
          />

          <Controller
            control={control}
            name="privacy"
            rules={{ required: "Please accept privacy policy" }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!value)}
                className="flex-row items-start"
              >
                <View
                  className={`w-5 h-5 border-2 border-primary rounded mr-3 mt-1 ${value ? "bg-primary" : ""}`}
                >
                  {value && (
                    <Text className="text-white text-xs text-center">✓</Text>
                  )}
                </View>
                <Text className="text-gray-700 flex-1">
                  I have read the SilverSitting privacy policy and agree to them
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="flex-row gap-4 mb-6">
          <TouchableOpacity
            onPress={handleGoBack}
            className="flex-1 py-4 rounded-lg border-2 border-primary max-w-[80px]"
          >
            <Text className="text-primary text-lg font-semibold text-center">
              Go Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isRegistering}
            className="flex-1 py-4 rounded-lg bg-primary"
          >
            {isRegistering ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color="white" size="small" />
                <Text className="text-white text-lg font-semibold ml-2">
                  Registering...
                </Text>
              </View>
            ) : (
              <Text className="text-white text-lg font-semibold text-center">
                Register
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text className="text-center text-gray-600 text-sm">
          Registration assistance: info@silversitting.com. Happy to help!
        </Text>
      </View>
    </ScrollView>
  );

  const renderStepThree = () => (
    <View className="flex-1 bg-white px-6 py-8 justify-center items-center">
      <Text className="text-6xl mb-6">📧</Text>
      <Text className="text-2xl font-bold text-primary text-center mb-4">
        Registration Complete
      </Text>
      <Text className="text-gray-700 text-center mb-6">
        Please check your email to complete your registration.
      </Text>
      <Text className="text-gray-600 text-center text-sm mb-8">
        For information, a link can be a word.
      </Text>
      <TouchableOpacity
        className={`py-4 px-8 rounded-lg ${isResendAllowed ? "bg-primary" : "bg-gray-400"}`}
        onPress={handleResendLink}
        disabled={isSendingResendEmail || !isResendAllowed}
      >
        {isSendingResendEmail ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white text-lg font-semibold">
            {isResendAllowed
              ? "Resend Activation Link"
              : `Resend in ${countdown}s`}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1, backgroundColor: "white" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 90 : Keyboard.isVisible?.() ? 40 : -90
      }
    >
      <View className="flex-1">
        {registerState.step === 1 && renderStepOne()}
        {registerState.step === 2 && renderStepTwo()}
        {registerState.step === 3 && renderStepThree()}
      </View>
      <KeyboardSpacer reduceHeight={60} />
    </KeyboardAvoidingView>
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
  roleImage: {
    width: 80,
    height: 80,
  },
});
