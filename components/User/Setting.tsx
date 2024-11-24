import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Setting() {
  return (
    <View className="mt-2">
      <Text className="text-white font-bold text-[20px] ">Cài đặt</Text>
      <TouchableOpacity
        className="bg-gray-900 flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2"
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
        className="bg-gray-900 flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2"
        onPress={() => router.push("/notification/list-notification")}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="notifications"
            color={"white"}
            size={25}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Thông báo
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-900 flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-2">
        <View className="flex-row items-center">
          <Ionicons
            name="help-circle-outline"
            color={"white"}
            size={30}
            className=""
          />
          <Text className="text-white text-[18px] font-bold text-center ml-2 ">
            Tổng đài hỗ trợ
          </Text>
        </View>

        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
