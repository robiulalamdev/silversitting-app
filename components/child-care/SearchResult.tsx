"use client";

import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux"; // Assuming Redux setup
import Pagination from "../shared/paginations/Pagination";
import SearchResultCard from "./SearchResultCard";

interface SearchResultProps {
  handleSearchAgain: () => void;
}

export default function SearchResult({ handleSearchAgain }: SearchResultProps) {
  // Assuming filterData is available from Redux store
  const { filterData } = useSelector(
    (state: any) => state.childCarerFilter || { filterData: [] }
  ); // Provide a fallback

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filterData.slice(startIndex, endIndex);

  return (
    <View className="flex-1 bg-white px-4 pb-[50px]">
      <View className="my-4 items-center">
        <TouchableOpacity
          onPress={handleSearchAgain}
          className="bg-primary rounded-lg py-3 px-6"
          style={styles.searchAgainButton}
        >
          <Text className="text-white text-base font-semibold">
            Search Again
          </Text>
        </TouchableOpacity>
      </View>

      {currentItems.length > 0 ? (
        currentItems.map((item: any, idx: number) => (
          <SearchResultCard index={idx} key={item._id || idx} item={item} />
        ))
      ) : (
        <Text className="text-center text-gray-600 text-base mt-8">
          No results found.
        </Text>
      )}

      {filterData.length > itemsPerPage && (
        <View className="mt-8 mb-4">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchAgainButton: {
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
