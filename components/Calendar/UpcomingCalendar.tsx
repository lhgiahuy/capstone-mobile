import { ScrollView, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import CardEvent from "./CardEvent";
import { DayObject } from "@/constants/model/Calendar";
import { useQuery } from "@tanstack/react-query";
import { EventData } from "@/constants/model/EventDetail";
import { getUserParticipant } from "@/api/user";

export default function UpcomingCalendar() {
  const [selected, setSelected] = useState<string>("");

  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "upcoming"],
    queryFn: () => getUserParticipant(false),
  });

  // Create markedDates object based on events
  const markedDates = useMemo(() => {
    if (!events) return {};
    const dates: { [key: string]: any } = {};

    events.forEach((event) => {
      const eventDate = new Date(event.startTime).toISOString().split("T")[0]; // Format to YYYY-MM-DD
      dates[eventDate] = {
        marked: true,
        customStyles: {
          container: {
            backgroundColor: "#1F1F1F",
            borderRadius: 8,
          },
          text: {
            color: "yellow",
          },
        },
      };
    });

    // Date event styling
    if (selected) {
      dates[selected] = {
        ...dates[selected],
        selected: true,
        disableTouchEvent: true,
        // selectedDotColor: "orange",
      };
    }

    return dates;
  }, [events, selected]);

  if (isLoading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <View className="flex-1 p-2 bg-black">
      <ScrollView className="flex-1">
        <Calendar
          className="h-[320px] justify-center p-2 rounded-[20px]"
          onDayPress={(day: DayObject) => {
            setSelected(day.dateString);
          }}
          markedDates={markedDates}
          markingType={"custom"}
          theme={{
            calendarBackground: "#373737",
            dayTextColor: "#fff",
            monthTextColor: "#CAFF4C",
            arrowColor: "#CAFF4C",
            // selectedDayBackgroundColor: "#CAFF4C",
            selectedDayTextColor: "#000",
            todayTextColor: "#CAFF4C",
            dotColor: "#CAFF4C",
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
