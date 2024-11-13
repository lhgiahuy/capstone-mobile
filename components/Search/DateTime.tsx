import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

interface DateTimeProps {
  selectedMonth: number | null;
  selectedYear: number | null;
  onMonthChange: (value: number | null) => void;
  onYearChange: (value: number | null) => void;
}

export default function DateTime({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: DateTimeProps) {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-row justify-around p-4">
        {/* Picker for Months */}
        <View className="w-[45%]">
          <Text className="text-white mb-2 text-center font-bold">
            Chọn Tháng
          </Text>
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#333",
            }}
          >
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) => onMonthChange(value)}
              style={{ color: "#fff", backgroundColor: "#333" }}
              dropdownIconColor="#CAFF4C" // Icon color
            >
              <Picker.Item label="Tháng" value={null} />
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i} label={`Tháng ${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Picker for Years */}
        <View className="w-[45%]">
          <Text className="text-white mb-2 text-center font-bold">
            Chọn Năm
          </Text>
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#333",
            }}
          >
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => onYearChange(value)}
              style={{ color: "#fff", backgroundColor: "#333" }}
              dropdownIconColor="#CAFF4C" // Icon color
            >
              <Picker.Item label="Năm" value={null} />
              {[...Array(31)].map((_, i) => {
                const year = 2000 + i;
                return (
                  <Picker.Item key={year} label={`Năm ${year}`} value={year} />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
