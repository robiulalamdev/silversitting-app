import TermsBanner from "@/components/terms-conditions/TermsBanner";
import TermsContent from "@/components/terms-conditions/TermsContent";
import { ScrollView } from "react-native";

export default function TermsAndConditions() {
  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
    >
      <TermsBanner />
      <TermsContent />
    </ScrollView>
  );
}
