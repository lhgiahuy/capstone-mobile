import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import CardEvent from "./CardEvent";

interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export default function UpcomingCalendar() {
  const [selected, setSelected] = useState<string>("");

  console.log(selected);
  return (
    <View className="flex-1 p-2 bg-black ">
      <ScrollView className="flex-1">
        <Calendar
          className="h-[320px] justify-center p-2 rounded-[20px]  "
          onDayPress={(day: DayObject) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
          theme={{
            calendarBackground: "#373737",
            dayTextColor: "#fff",
            monthTextColor: "#CAFF4C",
            arrowColor: "#CAFF4C",
            selectedDayBackgroundColor: "#CAFF4C",
            selectedDayTextColor: "#000",
            todayTextColor: "#CAFF4C",
            dotColor: "#CAFF4C",
            selectedDotColor: "#000000",
          }}
        />
        <View className="mt-6 mb-4">
          <Text className="text-[#CAFF4C] font-bold text-[18px] mb-4">
            Sự kiện đăng ký
          </Text>
          <CardEvent />
        </View>
      </ScrollView>
    </View>
  );
}
