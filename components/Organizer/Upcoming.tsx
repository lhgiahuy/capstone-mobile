import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Upcoming() {
  return (
    <ScrollView className="mt-2 mb-4">
      <View className="flex-row w-full h-[260px] bg-gray-950 p-2 rounded-[20px]">
        <Image
          source={require("@/assets/images/fcode.png")}
          className="h-[240px] w-[160px] rounded-[16px]"
        />
        <View className="mt-6 h-[60px] w-[204px]  items-center ">
          <Text
            className="text-white w-[160px] font-bold text-[16px]"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
            nhânnnnnnnnnn
          </Text>
          <View className="flex-row mt-4">
            <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2 ">06 Tháng 11, 2024</Text>
          </View>
          <Text className="text-white w-[160px] h-[200px] mt-4 text-[14px]">
            FPT University HCM đang nóng lên từng ngày trước thềm Lễ Tôn Vinh
            Top 100 Sinh Viên Xuất Sắc...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
