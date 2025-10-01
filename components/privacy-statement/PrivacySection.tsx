import useGetTranslation from "@/context/TranslationContext";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

interface BulletPointProps {
  children: React.ReactNode;
  className?: string;
}

function BulletPoint({ children, className = "" }: BulletPointProps) {
  return (
    <View className={`flex-row items-start mb-5 ${className}`}>
      <Image
        source={require("../../assets/icons/privacy-statement/list-icon.png")}
        className="w-4 h-4 mt-1 mr-3 flex-shrink-0"
        resizeMode="contain"
      />
      <View className="flex-1">
        {typeof children === "string" ? (
          <Text className="text-base text-gray-700 leading-relaxed">
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

interface PrivacySectionProps {
  section: string;
}

export default function PrivacySection({ section }: PrivacySectionProps) {
  const trans = useGetTranslation();

  const handleEmailPress = () => {
    Linking.openURL("mailto:info@silversitting.com").catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  const renderGeneralSection = () => (
    <View>
      <Text className="text-base text-gray-700 leading-relaxed mb-15">
        {trans("welcomeMessage")}
        {"\n\n"}
        {trans("dataProtectionImportance")}
        {"\n\n"}
        {trans("formalIntroduction")}
        {"\n\n"}
        {trans("contactInformation")}
        {"\n\n"}
        Email:{" "}
        <TouchableOpacity onPress={handleEmailPress}>
          <Text className="text-primary underline">
            {trans("emailContact")}
          </Text>
        </TouchableOpacity>
      </Text>

      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("generalInformationTitle")}
      </Text>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataProtectionLegalBasis")}
        </Text>
      </BulletPoint>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noUnauthorizedUse")}
        </Text>
      </BulletPoint>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noUnauthorizedDisclosure")}
        </Text>
      </BulletPoint>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("conditionsForThirdPartyTransfer")}
        </Text>
      </BulletPoint>

      <View className="ml-7 mb-6">
        <View className="space-y-2">
          <Text className="text-base text-gray-700">
            • {trans("consentForDataTransfer")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("lawfulDataTransferForContractualReasons")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("legalObligationForDataTransfer")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("dataTransferForLegitimateInterest")}
          </Text>
        </View>
      </View>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("agreementToDataProcessing")}
        </Text>
      </BulletPoint>
    </View>
  );

  const renderPurposeSection = () => (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("purposeHeader")}
      </Text>

      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
        <BulletPoint key={num}>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans(`purposePoint${num}`)}
          </Text>
        </BulletPoint>
      ))}
    </View>
  );

  const renderCollectionSection = () => (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("dataCollectionTitle")}
      </Text>

      {/* Access Data */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("accessDataTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("accessDataDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("accessDataDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint className="mb-10">
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("accessDataDescription3")}
        </Text>
      </BulletPoint>

      {/* Cookies & IP Address */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("cookiesIPAddressTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("cookiesIPAddressDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("cookiesIPAddressDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("cookiesIPAddressDescription3")}
        </Text>
      </BulletPoint>
      <BulletPoint className="mb-10">
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("cookiesIPAddressDescription4")}
        </Text>
      </BulletPoint>

      {/* Notice Data */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("noticeDataTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noticeDataDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noticeDataDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noticeDataDescription3")}
        </Text>
      </BulletPoint>
      <BulletPoint className="mb-10">
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("noticeDataDescription4")}
        </Text>
      </BulletPoint>

      {/* Data Subject Rights */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("dataSubjectRightsTitle")}
      </Text>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
        <BulletPoint key={num} className={num === 5 ? "mb-10" : ""}>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans(`dataSubjectRightsDescription${num}`)}
          </Text>
        </BulletPoint>
      ))}
    </View>
  );

  const renderThirdPartySection = () => (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("dataCollectionThirdPartiesTitle")}
      </Text>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataCollectionThirdPartiesDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataCollectionThirdPartiesDescription2")}
        </Text>
      </BulletPoint>

      <View className="ml-7 mb-10">
        <View className="space-y-2">
          <Text className="text-base text-gray-700">
            • {trans("dataCollectionThirdPartiesListItem1")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("dataCollectionThirdPartiesListItem2")}
          </Text>
        </View>
      </View>

      {/* Google Analytics */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("googleAnalyticsTitle")}
      </Text>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
        <BulletPoint key={num} className={num === 5 ? "mb-10" : ""}>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans(`googleAnalyticsDescription${num}`)}
          </Text>
        </BulletPoint>
      ))}

      {/* SendGrid */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("sendGridIncTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("sendGridIncDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint className="mb-10">
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("sendGridIncDescription2")}
        </Text>
      </BulletPoint>

      {/* Social Networks */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("linksToSocialNetworksTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("linksToSocialNetworksDescription1")}
        </Text>
      </BulletPoint>

      <View className="ml-7 mb-6">
        <View className="space-y-2">
          <Text className="text-base text-gray-700">
            • {trans("linksToSocialSub1")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("linksToSocialSub2")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("linksToSocialSub3")}
          </Text>
          <Text className="text-base text-gray-700">
            • {trans("linksToSocialSub4")}
          </Text>
        </View>
      </View>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("linksToSocialNetworksDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("linksToSocialNetworksDescription3")}
        </Text>
      </BulletPoint>
    </View>
  );

  const renderSecuritySection = () => (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("dataSecurityTitle")}
      </Text>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataSecurityDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataSecurityDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("dataSecurityDescription3")}
        </Text>
      </BulletPoint>
    </View>
  );

  const renderRightsSection = () => (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-6">
        {trans("rightToObjectTitle")}
      </Text>

      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("rightToObjectDescription1")}
        </Text>
      </BulletPoint>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("rightToObjectDescription2")}
        </Text>
      </BulletPoint>
      <BulletPoint className="mb-10">
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("rightToObjectDescription3")}
        </Text>
      </BulletPoint>

      {/* Privacy Policy Changes */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        {trans("privacyPolicyChangeTitle")}
      </Text>
      <BulletPoint>
        <Text className="text-base text-gray-700 leading-relaxed">
          {trans("privacyPolicyChangeDescription")}
        </Text>
      </BulletPoint>
    </View>
  );

  switch (section) {
    case "general":
      return renderGeneralSection();
    case "purpose":
      return renderPurposeSection();
    case "collection":
      return renderCollectionSection();
    case "thirdParty":
      return renderThirdPartySection();
    case "security":
      return renderSecuritySection();
    case "rights":
      return renderRightsSection();
    default:
      return renderGeneralSection();
  }
}
