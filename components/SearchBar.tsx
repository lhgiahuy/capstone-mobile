import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    }
  };
  return (
    <View className="flex-row items-center bg-white h-[56px]   my-4 p-2 rounded-[12px] mx-2 ">
      <TextInput
        className="flex-1 p-2 ml-2"
        placeholder="SỰ KIỆN ĐANG HOT!"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons
          name="search"
          size={25}
          color="black"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}
