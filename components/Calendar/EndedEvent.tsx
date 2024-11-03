import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function EndedEvent() {
  return (
    <ScrollView className="bg-primary flex-1 mx-2 ">
      <Text className="text-[#CAFF4C] text-[19px] font-bold mt-7 ">
        Sự kiện đã diễn ra
      </Text>
      <Text className="text-white text-[15px] my-4 font-bold">
        THÁNG 8,2024
      </Text>
      <View className="flex-row  h-[190px]   ">
        <View className="bg-[#373737] w-[30%] h-full first-letter:text-center items-center justify-center rounded-l-[12px] rounded-r-[17px] ">
          <Text className="text-white w-[100px] font-bold text-[17px] p-2 text-center">
            6 Tháng 8, 2024
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
      <Text className="text-white text-[15px] my-4 font-bold">
        THÁNG 9,2024
      </Text>
      <View className="flex-row  h-[190px]   mb-4">
        <View className="bg-[#373737] w-[30%] h-full first-letter:text-center items-center justify-center rounded-l-[12px] rounded-r-[17px] ">
          <Text className="text-white w-[100px] font-bold text-[17px] p-2 text-center">
            6 Tháng 9, 2024
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
    </ScrollView>
  );
}
