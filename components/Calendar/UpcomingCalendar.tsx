import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import CardEvent from "./CardEvent";
import { DayObject } from "@/constants/model/Calendar";
import { useQuery } from "@tanstack/react-query";
import { EventData } from "@/constants/model/EventDetail";
import { getUserParticipant } from "@/api/user";

export default function UpcomingCalendar() {
  const [selected, setSelected] = useState<string>("");

  const [isModalVisible, setModalVisible] = useState(false);

  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "calendar", "upcoming"],
    queryFn: () => getUserParticipant(false),
  });

  // Danh sách các tháng
  // const months = Array.from({ length: 12 }, (_, i) => {
  //   const date = new Date(new Date().getFullYear(), i, 1);
  //   return {
  //     label: date.toLocaleString("default", { month: "long" }),
  //     value: date.toISOString().split("T")[0].slice(0, 7) + "-01", // Lưu ngày đầu tháng
  //   };
  // });

  // Tạo markedDates từ sự kiện
  const markedDates = useMemo(() => {
    if (!events) return {};
    const dates: { [key: string]: any } = {};

    events?.map((event) => {
      const eventDate = new Date(event.startTime).toISOString().split("T")[0];
      dates[eventDate] = {
        marked: true,
        customStyles: {
          container: {
            backgroundColor: "#CAFF4C",
            borderRadius: 16,
          },
          text: {
            color: "black",
          },
        },
      };
    });

    if (selected) {
      dates[selected] = {
        ...dates[selected],
        selected: true,
        disableTouchEvent: true,
      };
    }

    return dates;
  }, [events, selected]);

  if (isLoading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <View className="flex-1 p-2 bg-black">
      <ScrollView className="flex-1">
        {/* Calendar */}
        <Calendar
          className="h-[320px] justify-center p-2 rounded-[20px]"
          onDayPress={(day: DayObject) => {
            setSelected(day.dateString); // Lưu ngày đã chọn
          }}
          markedDates={markedDates}
          markingType={"custom"}
          theme={{
            calendarBackground: "#373737",
            dayTextColor: "#fff",
            monthTextColor: "#CAFF4C",
            arrowColor: "#CAFF4C",
            selectedDayBackgroundColor: "#CAFF4C",
            selectedDayTextColor: "#000",
            todayTextColor: "#CAFF4C",
            dotColor: "#1F1F1F",
            selectedDotColor: "#000000",
          }}
        />

        <View className="mt-6 mb-4">
          <Text className="text-[#CAFF4C] font-bold font-inter text-[18px] mb-4">
            Sự kiện đăng ký
          </Text>
          <CardEvent data={events as EventData[]} />
        </View>
      </ScrollView>
    </View>
  );
}
