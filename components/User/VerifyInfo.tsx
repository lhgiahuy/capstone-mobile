import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyInfo() {
  return (
    <View>
      <TouchableOpacity className="bg-gray-900 flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-6">
        <View className="flex-row items-center">
          <Ionicons
            name="checkmark-outline"
            color={"#78f25a"}
            size={30}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Đã xác thực
          </Text>
        </View>

        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
