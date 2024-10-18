import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface NavCalenderProps {
  selectedTab: "upcoming" | "ended";
  onSelectTab: (tab: "upcoming" | "ended") => void;
}

export default function NavCalender({
  selectedTab,
  onSelectTab,
}: NavCalenderProps) {
  return (
    <View className="flex-row justify-between mx-10 mt-4">
      <TouchableOpacity onPress={() => onSelectTab("upcoming")}>
        <View className="items-center">
          <Text className="text-[#CAFF4C] text-[17px] font-bold">
            Sắp diễn ra
          </Text>
          {selectedTab === "upcoming" && (
            <View
              className="bg-[#CAFF4C] h-[2px] w-[95px] mt-2"
              style={{ marginTop: 7 }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectTab("ended")}>
        <View className="items-center">
          <Text className="text-[#CAFF4C] text-[17px] font-bold">
            Đã kết thúc
          </Text>
          {selectedTab === "ended" && (
            <View
              className="bg-[#CAFF4C] h-[2px] w-[95px] mt-2"
              style={{ marginTop: 7 }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
