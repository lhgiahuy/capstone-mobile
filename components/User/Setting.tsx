import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

export default function Setting() {
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      queryClient.removeQueries();
      router.replace("/");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Không thể đăng xuất",
        text2: "Vui lòng thử lại!",
        visibilityTime: 5000,
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
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
        onPress={() => router.push("/user/dashboard")}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="layers-outline"
            color={"white"}
            size={25}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Thống kê
          </Text>
        </View>

        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2"
        onPress={() => handleLogout()}
      >
        <View className="flex-row items-center">
          <Ionicons name="log-out-outline" color={"#d73535"} size={30} />
          <Text className="text-[#d73535] text-[18px] font-bold text-center ml-2 ">
            Đăng xuất
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
