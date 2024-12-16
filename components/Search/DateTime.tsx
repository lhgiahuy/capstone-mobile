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
    <SafeAreaView className="bg-primary pb-3">
      <View className="flex-row justify-around">
        <View className="w-[45%]">
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
              dropdownIconColor="#CAFF4C"
            >
              <Picker.Item label="Tháng" value={null} />
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i} label={`Tháng ${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </View>

        <View className="w-[45%]">
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
              dropdownIconColor="#CAFF4C"
            >
              <Picker.Item label="Năm" value={null} />
              {[...Array(8)].map((_, i) => {
                const year = 2020 + i;
                return (
                  <Picker.Item key={year} label={`${year}`} value={year} />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
