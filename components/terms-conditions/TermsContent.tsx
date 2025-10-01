import useGetTranslation from "@/context/TranslationContext";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

interface TermsBulletPointProps {
  children: React.ReactNode;
  className?: string;
}

function TermsBulletPoint({ children, className = "" }: TermsBulletPointProps) {
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

export default function TermsContent() {
  const trans = useGetTranslation();

  const handleEmailPress = () => {
    Linking.openURL("mailto:info@silversitting.com").catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  const handleWebsitePress = () => {
    Linking.openURL("https://www.silversitting.eu/").catch((err) =>
      console.error("Failed to open website:", err)
    );
  };

  return (
    <View className="p-6">
      {/* General Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("generalTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("generalContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("generalContent2")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Acceptable Use Policy Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("acceptablePolicyTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("acceptablePolicyContent1")}{" "}
            <TouchableOpacity onPress={handleEmailPress}>
              <Text className="text-primary underline">
                info@silversitting.com
              </Text>
            </TouchableOpacity>
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("acceptablePolicyContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("acceptablePolicyContent3")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Service Description Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("serviceDescriptionTitle")}{" "}
        <TouchableOpacity onPress={handleWebsitePress}>
          <Text className="text-primary underline">SilverSitting.eu</Text>
        </TouchableOpacity>
      </Text>
      <View className="mb-15">
        {trans("serviceDescriptionItems").map((item: string, index: number) => (
          <TermsBulletPoint key={index}>
            <Text className="text-base text-gray-700 leading-relaxed">
              {item}
            </Text>
          </TermsBulletPoint>
        ))}
      </View>

      {/* Contract Conclusion Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("contractConclusionTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent3")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent4")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent5")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent6")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent7")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent8")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("contractConclusionContent9")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Data Protection Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("dataProtectionTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("dataProtectionContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("dataProtectionContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("dataProtectionContent3")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("dataProtectionContent4")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("dataProtectionContent5")}{" "}
            <TouchableOpacity
              onPress={() => console.log("Data protection link pressed")}
            >
              <Text className="text-primary underline">
                {trans("dataProtectionLink")}
              </Text>
            </TouchableOpacity>
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Disclosure Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("disclosureTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("disclosureContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("disclosureContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("disclosureContent3")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Declaration Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("declarationTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("declarationContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("declarationContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("declarationContent3")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Responsibilities Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("responsibilitiesTitle")}
      </Text>
      <View className="mb-15">
        {[...trans("responsibilitiesItems")].map(
          (item: string, index: number) => (
            <TermsBulletPoint key={index}>
              <Text className="text-base text-gray-700 leading-relaxed">
                {item}
              </Text>
            </TermsBulletPoint>
          )
        )}
      </View>

      {/* Liability Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("liabilityTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("liabilityContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("liabilityContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("liabilityContent3")}
          </Text>
        </TermsBulletPoint>

        {/* Liability List */}
        <View className="ml-7 mb-6">
          <View className="space-y-2">
            <Text className="text-base text-gray-700">
              • {trans("liabilityListItem1")}
            </Text>
            <Text className="text-base text-gray-700">
              • {trans("liabilityListItem2")}
            </Text>
            <Text className="text-base text-gray-700">
              • {trans("liabilityListItem3")}
            </Text>
            <Text className="text-base text-gray-700">
              • {trans("liabilityListItem4")}
            </Text>
            <Text className="text-base text-gray-700">
              • {trans("liabilityListItem5")}
            </Text>
          </View>
        </View>

        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("liabilityContent4")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("liabilityContent5")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Third Parties Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("thirdPartiesTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("thirdPartiesContent")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Final Provisions Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("finalProvisionTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("finalProvisionContent1")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("finalProvisionContent2")}
          </Text>
        </TermsBulletPoint>
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("finalProvisionContent3")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Online Dispute Resolution Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("disputeTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("disputeContent")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Copyright Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("copyrightTitle")}
      </Text>
      <View className="mb-15">
        <TermsBulletPoint>
          <Text className="text-base text-gray-700 leading-relaxed">
            {trans("copyrightContent")}
          </Text>
        </TermsBulletPoint>
      </View>

      {/* Right of Withdrawal Section */}
      <Text className="text-2xl font-bold text-primary mb-6">
        {trans("withdrawalTitle")}
      </Text>
      <View className="mb-15">
        {trans("withdrawalItems").map((item: string, index: number) => (
          <TermsBulletPoint key={index}>
            <Text className="text-base text-gray-700 leading-relaxed">
              {item}
            </Text>
          </TermsBulletPoint>
        ))}

        {/* Cancellation Form Template */}
        <View className="bg-gray-50 rounded-lg p-4 mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {trans("cancellationFormTitle")}
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            {trans("cancellationFormInstructions")}
          </Text>

          <View className="space-y-3">
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormAt")}
            </Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormCompany")}
            </Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormAddress1")}
            </Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormAddress2")}
            </Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormEmail")}{" "}
              <TouchableOpacity onPress={handleEmailPress}>
                <Text className="text-primary underline">
                  info@silversitting.com
                </Text>
              </TouchableOpacity>
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormRevocation")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormOrdered")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormConsumerName")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormConsumerAddress")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormSignature")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-base text-gray-700">
              {trans("cancellationFormDate")}
            </Text>
            <Text className="text-base text-gray-700">-</Text>
            <Text className="text-sm text-gray-500 italic mt-4">
              {trans("cancellationFormNote")}
            </Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-gray-800 mt-8 mb-4">
          {trans("registrationDescription")}
        </Text>
      </View>
    </View>
  );
}
