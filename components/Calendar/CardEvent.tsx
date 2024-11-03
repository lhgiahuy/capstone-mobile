import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CardEvent() {
  return (
    <View>
      <View className="flex-row  h-[190px]   ">
        <View className="bg-[#373737] w-[30%] h-full first-letter:text-center items-center justify-center rounded-l-[12px] rounded-r-[17px] ">
          <Text className="text-white w-[120px] font-bold text-[17px] p-2 text-center">
            6 Tháng 11, 2024
          </Text>
        </View>
        <View
          className="border-t border-[#373737] my-4"
          style={{ borderStyle: "dashed", borderWidth: 1 }}
        />
        <View className="bg-[#373737] w-[70%] p-4 justify-center rounded-l-[15px] rounded-r-[12px]">
          <Text className="text-[#CAFF4C] font-bold w-[200px] text-center">
            STUDENT ACHIEVEMENT AWARDS - DARE TO DISCOVER
          </Text>
          <View className="flex-row mt-4 ">
            <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2 ">6:00 PM, 06 Tháng 10, 2024</Text>
          </View>

          <View className="flex-row mt-2">
            <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2">
              Academic Hall, FPT University HCM
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
