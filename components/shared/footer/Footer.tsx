import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Footer() {
  const router = useRouter();

  const handleLinkPress = (route: string) => {
    router.push(route);
  };

  const handleExternalLinkPress = (url: string) => {
    // In a real Expo app, you would use Linking.openURL
    console.log(`Opening external URL: ${url}`);
    // Example: Linking.openURL(url);
  };

  const LinkSection = ({
    title,
    links,
  }: {
    title?: string;
    links: { text: string; route: string }[];
  }) => (
    <View className="mb-8">
      {title && (
        <Text className="text-white text-lg font-semibold mb-4">{title}</Text>
      )}
      {links.map((link, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleLinkPress(link.route)}
          className="py-1"
        >
          <Text className="text-gray-300 text-base">{link.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView className="bg-gray-900 py-12 px-6">
      {/* Top Section: Logo and Description */}
      <View className="items-center mb-10">
        {/* Logo - You can replace this with your actual logo */}
        <View className="flex-row items-center mb-6">
          <Image
            source={require("../../../assets/images/shared/footer/footer-logo.png")}
            className="max-w-[170px] max-h-[50px]"
            resizeMode="contain"
          />
        </View>

        <Text className="text-gray-300 text-sm text-center leading-relaxed mb-10">
          silversitting.eu is a platform where parents can find seniors to care
          for their children. Parents can search for a suitable childcare worker
          - child carer - independently, contact them and arrange childcare
          services. The operator does not provide childcare, nor are childcare
          providers suggested and selected. It is not possible to check the
          identity of the childcare; the truthful and correct specification of
          personal data is pointed out in the data protection regulations and
          general terms and conditions. SilverSitting sees itself as a
          meaningful company.
        </Text>
      </View>

      {/* Link Sections */}
      <View className="flex-col">
        <LinkSection
          links={[
            { text: "Conditions", route: "/conditions" },
            { text: "Data protection", route: "/data-protection" },
            { text: "Imprint", route: "/imprint" },
            { text: "Make contact", route: "/contact" },
          ]}
        />
        <LinkSection
          links={[
            { text: "Team", route: "/team" },
            { text: "Find nanny", route: "/find-nanny" },
            {
              text: "Become a childcare worker",
              route: "/become-childcare-worker",
            },
            {
              text: "FAQ from childcare workers",
              route: "/faq-childcare-workers",
            },
          ]}
        />
        <LinkSection
          links={[
            { text: "Feedback", route: "/feedback" },
            { text: "How does it work", route: "/how-it-works" },
            { text: "Login / Registration", route: "/login-registration" },
            { text: "To the blog", route: "/blog" },
          ]}
        />
        <LinkSection
          links={[
            { text: "Interesting for seniors", route: "/for-seniors" },
            { text: "Babysitter", route: "/babysitter" },
            {
              text: "SilverSitting sees itself as a meaningful company",
              route: "/about-us",
            }, // This was a standalone text, but making it a link for consistency
          ]}
        />

        {/* City-specific links */}
        <LinkSection
          title="Babysitter"
          links={[
            { text: "Babysitter Berlin", route: "/babysitter/berlin" },
            { text: "Babysitter Bonn", route: "/babysitter/bonn" },
            { text: "Babysitter Düsseldorf", route: "/babysitter/dusseldorf" },
            { text: "Babysitter Frankfurt", route: "/babysitter/frankfurt" },
            { text: "Babysitter Hamburg", route: "/babysitter/hamburg" },
            { text: "More cities", route: "/babysitter/more-cities" },
          ]}
        />
        <LinkSection
          title="Childcare"
          links={[
            { text: "Childcare Berlin", route: "/childcare/berlin" },
            { text: "Childcare Bonn", route: "/childcare/bonn" },
            { text: "Childcare Düsseldorf", route: "/childcare/dusseldorf" },
            { text: "Childcare Frankfurt", route: "/childcare/frankfurt" },
            { text: "Childcare Hamburg", route: "/childcare/hamburg" },
            { text: "More cities", route: "/childcare/more-cities" },
          ]}
        />
        <LinkSection
          title="Surrogate Grandma"
          links={[
            { text: "Loan Grandma Berlin", route: "/loan-grandma/berlin" },
            { text: "Loan Grandma Bonn", route: "/loan-grandma/bonn" },
            {
              text: "Loan Grandma Düsseldorf",
              route: "/loan-grandma/dusseldorf",
            },
            {
              text: "Loan Grandma Frankfurt",
              route: "/loan-grandma/frankfurt",
            },
            { text: "Loan Grandma Hamburg", route: "/loan-grandma/hamburg" },
            { text: "More cities", route: "/loan-grandma/more-cities" },
          ]}
        />
        <LinkSection
          title="Nanny"
          links={[
            { text: "Nanny Berlin", route: "/nanny/berlin" },
            { text: "Nanny Bonn", route: "/nanny/bonn" },
            { text: "Nanny Düsseldorf", route: "/nanny/dusseldorf" },
            { text: "Nanny Frankfurt", route: "/nanny/frankfurt" },
            { text: "Nanny Hamburg", route: "/nanny/hamburg" },
            { text: "More cities", route: "/nanny/more-cities" },
          ]}
        />
      </View>

      {/* SSL Badge */}
      <View className="items-center my-8">
        <TouchableOpacity
          onPress={() => handleExternalLinkPress("https://www.ssl.com/")}
        >
          <Image
            source={{
              uri: "https://www.checkdomain.de/assets/bundles/web/app/widget/seal/img/ssl_certificate/de/150x150.png",
            }} // Placeholder for SSL badge
            alt="SSL Secure"
            style={styles.sslBadge}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="border-t border-gray-700 w-full mb-6" />

      {/* Copyright */}
      <Text className="text-gray-400 text-sm text-center leading-relaxed">
        © 2024 SilverSitting, Andrea and Daniel Monninger (GbR)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8b3888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoIconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 18,
    color: "#e5e7eb", // Light gray for logo text on dark background
    fontWeight: "400",
  },
  logoTextBold: {
    fontWeight: "bold",
    color: "#8b3888", // Purple for bold part
  },
  sslBadge: {
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
  },
});
