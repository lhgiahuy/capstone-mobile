import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { EventData } from "@/constants/model/EventDetail";
import { getUserParticipant } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

import DateTime from "../Search/DateTime";
import EndedCard from "./EndedCard";

export default function EndedCalender() {
  const isCompleted = true;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery<EventData[], Error>({
    queryKey: ["events", "calendar", isCompleted, selectedMonth, selectedYear],
    queryFn: () =>
      getUserParticipant({
        isCompleted,
        inMonth: selectedMonth as number,
        inYear: selectedYear as number,
      }),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1 justify-center p-1">
      <DateTime
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />
      <EndedCard data={data as EventData[]} />
    </View>
  );
}
