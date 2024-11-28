import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Setting() {
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      router.replace("/");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
    }
  };
  return (
    <View className="mt-2">
      <Text className="text-white font-bold text-[20px] ">Cài đặt</Text>
      <TouchableOpacity
        className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2"
        onPress={() => router.push("/user/account")}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="person-outline"
            color={"white"}
            size={25}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Tài khoản
          </Text>
        </View>

        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2"
        onPress={() => handleLogout()}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="walk-outline"
            color={"white"}
            size={30}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Đăng xuất
          </Text>
        </View>

        <Ionicons name="log-out-outline" color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
