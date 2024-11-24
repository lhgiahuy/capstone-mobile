import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    if (keyword.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Bạn chưa nhập từ khóa tìm kiếm!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    } else {
      router.push({
        pathname: "/search/result",
        params: { keyword: keyword },
      });
      setKeyword("");
    }
  };
  return (
    <View className="py-2">
      <ScrollView>
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
      </ScrollView>
    </View>
  );
}
