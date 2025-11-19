import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Adjust as needed
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <View className="flex-row items-center justify-center space-x-2">
      <TouchableOpacity
        onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${currentPage === 1 ? "opacity-50" : ""}`}
      >
        <MaterialIcons name="chevron-left" size={24} color="#8b3888" />
      </TouchableOpacity>

      {getPageNumbers().map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => setCurrentPage(page)}
          className={`w-8 h-8 rounded-md justify-center items-center ${
            currentPage === page ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <Text
            className={`${currentPage === page ? "text-white" : "text-gray-700"} font-semibold`}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${currentPage === totalPages ? "opacity-50" : ""}`}
      >
        <MaterialIcons name="chevron-right" size={24} color="#8b3888" />
      </TouchableOpacity>
    </View>
  );
}
