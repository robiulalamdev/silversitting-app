import useGetTranslation from "@/hooks/useGetTranslation";
import { RelativePathString, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  const router = useRouter();
  const trans = useGetTranslation();

  const routes = [
    { name: trans("conditions"), path: "/terms-and-conditions" },
    { name: trans("dataProtection"), path: "/privacy-statement" },
    { name: trans("imprint"), path: "/imprint" },
    { name: trans("makeContact"), path: "/contact" },
    { name: trans("team"), path: "/who-we-are" },
    { name: trans("findNanny"), path: "/search" },
    {
      name: trans("becomeAChildcareWorker"),
      path: "/auth/register?role=childcarer",
    },
    { name: trans("faqFromChildcareWorkers"), path: "/children-provider-faq" },
    { name: trans("faqFromParents"), path: "/faq" },
    { name: trans("feedback"), path: "/feedback" },
    {
      name: trans("howDoesItWork"),
      path: "/insights?section=how-it-works",
    }, // Updated path
    { name: trans("loginRegistration"), path: "/auth/login" },
    { name: trans("toTheBlog"), path: "/blogs" },
    {
      name: trans("interestingForSeniors"),
      path: "/insights?section=known",
    }, // Updated path
    // { name: trans("babysitter"), path: "/search" },
    // { name: trans("babysitterBerlin"), path: "/child-care", area: "Berlin" },
    // { name: trans("babysitterBonn"), path: "/child-care", area: "Bonn" },
    // {
    //   name: trans("babysitterDusseldorf"),
    //   path: "/child-care",
    //   area: "Duesseldorf",
    // },
    // {
    //   name: trans("babysitterFrankfurt"),
    //   path: "/child-care",
    //   area: "Frankfurt",
    // },
    // { name: trans("babysitterHamburg"), path: "/child-care", area: "Hamburg" },
    // { name: trans("moreCities"), path: "/child-care" },
    // { name: trans("childcare"), path: "/child-care" },
    // { name: trans("childcareBerlin"), path: "/child-care", area: "Berlin" },
    // { name: trans("childcareBonn"), path: "/child-care", area: "Bonn" },
    // {
    //   name: trans("childcareDusseldorf"),
    //   path: "/child-care",
    //   area: "Duesseldorf",
    // },
    // {
    //   name: trans("childcareFrankfurt"),
    //   path: "/child-care",
    //   area: "Frankfurt",
    // },
    // { name: trans("childcareHamburg"), path: "/child-care", area: "Hamburg" },
    // { name: trans("moreCities"), path: "/child-care" },
    // { name: trans("surrogateGrandma"), path: "/child-care" },
    // { name: trans("loanGrandmaBerlin"), path: "/child-care", area: "Berlin" },
    // { name: trans("leihomaBonn"), path: "/child-care", area: "Bonn" },
    // {
    //   name: trans("loanGrandmaDusseldorf"),
    //   path: "/child-care",
    //   area: "Duesseldorf",
    // },
    // {
    //   name: trans("leaseGrandmotherFrankfurt"),
    //   path: "/child-care",
    //   area: "Frankfurt",
    // },
    // {
    //   name: trans("leaseGrandmotherHamburg"),
    //   path: "/child-care",
    //   area: "Hamburg",
    // },
    // { name: trans("nanny"), path: "/child-care" },
    // { name: trans("nannyBerlin"), path: "/child-care", area: "Berlin" },
    // { name: trans("nannyBonn"), path: "/child-care", area: "Bonn" },
    // {
    //   name: trans("nannyDusseldorf"),
    //   path: "/child-care",
    //   area: "Duesseldorf",
    // },
    // { name: trans("nannyFrankfurt"), path: "/child-care", area: "Frankfurt" },
    // { name: trans("nannyHamburg"), path: "/child-care", area: "Hamburg" },
    // { name: trans("moreCities"), path: "/child-care" },
  ];

  const handleLinkPress = (route: string) => {
    router.push(route as RelativePathString);
  };

  const handleCityLinkClick = (city?: string) => {
    if (city) {
      router.push({
        pathname: "/child-care",
        params: { location: city },
      });
    } else {
      router.push("/child-care"); // Navigate to general child-care if no city
    }
  };

  // const handleExternalLinkPress = (url: string) => {
  //   Linking.openURL(url).catch((err) =>
  //     console.error("Failed to open URL:", err)
  //   );
  // };

  const LinkSection = ({
    title,
    links,
  }: {
    title?: string;
    links: { name: string; path?: string; area?: string }[];
  }) => (
    <View className="mb-8 w-full md:w-1/4">
      {title && (
        <Text className="text-white text-lg font-semibold mb-4">{title}</Text>
      )}
      {links.map((link, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            link.area
              ? handleCityLinkClick(link.area)
              : handleLinkPress(link.path || "/")
          }
          className="py-1"
        >
          <Text className="text-gray-300 text-base">{link.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView className="bg-gray-900 py-12 px-6">
      {/* Top Section: Logo and Description */}
      <View className="items-center mb-10">
        <View className="flex-row items-center mb-6">
          <Image
            source={require("../../../assets/images/shared/footer/footer-logo.png")} // Assuming this path is correct
            className="max-w-[170px] max-h-[50px]"
            resizeMode="contain"
          />
        </View>

        <Text className="text-gray-300 text-sm text-center leading-relaxed mb-10">
          {trans("footerDescription")}
        </Text>
      </View>

      {/* Link Sections */}
      <View className="flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
        <LinkSection links={routes.slice(0, 4)} />
        <LinkSection links={routes.slice(4, 8)} />
        <LinkSection
          links={routes.slice(8, 12)} // Adjusted slice to match web code's 9-13 (index 8 to 11)
        />
        <LinkSection
          links={routes.slice(12, 14)} // Adjusted slice to match web code's 13-15 (index 12 to 14)
        />
      </View>

      <Text className="text-gray-300 text-sm text-center leading-relaxed my-8">
        {trans("footermeaningful")}
      </Text>

      {/* <View className="flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
        <LinkSection title={trans("babysitter")} links={routes.slice(15, 21)} />
        <LinkSection title={trans("childcare")} links={routes.slice(21, 28)} />
        <LinkSection
          title={trans("surrogateGrandma")}
          links={routes.slice(28, 34)}
        />
        <LinkSection title={trans("nanny")} links={routes.slice(34, 41)} />
      </View> */}

      {/* SSL Badge */}
      {/* <View className="items-center my-8">
        <TouchableOpacity
          onPress={() =>
            handleExternalLinkPress(
              "https://www.checkdomain.de/unternehmen/garantie/ssl/popup/"
            )
          }
        >
          <Image
            source={{
              uri: "https://www.checkdomain.de/assets/bundles/web/app/widget/seal/img/ssl_certificate/de/150x150.png",
            }}
            alt="SSL-Zertifikat"
            style={styles.sslBadge}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View> */}

      {/* Divider */}
      <View className="border-t border-gray-700 w-full mb-6" />

      {/* Copyright */}
      <Text className="text-gray-400 text-sm text-center leading-relaxed">
        {trans("footercopyright")}
      </Text>
    </ScrollView>
  );
}
