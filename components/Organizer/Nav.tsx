import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

interface NavProps {
  selectedTab: "upcoming" | "ended" | "ongoing";
  onSelectTab: (tab: "upcoming" | "ended" | "ongoing") => void;
}

export default function Nav({ selectedTab, onSelectTab }: NavProps) {
  return (
    <ScrollView
      className="flex-row mx-2 mt-8"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
    >
      <TouchableOpacity
        onPress={() => onSelectTab("upcoming")}
        className="mx-2"
      >
        <View className="items-center">
          <Text className="text-[#A8E063] text-[17px] font-bold">
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
      <TouchableOpacity onPress={() => onSelectTab("ongoing")} className="mx-4">
        <View className="items-center">
          <Text className="text-[#A8E063] text-[17px] font-bold">
            Đang diễn ra
          </Text>
          {selectedTab === "ongoing" && (
            <View
              className="bg-[#CAFF4C] h-[2px] w-[95px] mt-2"
              style={{ marginTop: 7 }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectTab("ended")} className="mx-2">
        <View className="items-center">
          <Text className="text-[#A8E063] text-[17px] font-bold">
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
    </ScrollView>
  );
}
