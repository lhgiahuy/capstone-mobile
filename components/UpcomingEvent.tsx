import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getEventType } from "@/api/event";
import { useQuery } from "@tanstack/react-query";
import { EventData } from "@/constants/model/EventDetail";
import { router } from "expo-router";

export default function UpcomingEvent() {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "type 2"],
    queryFn: () => getEventType("type 2"),
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 , ${day} Tháng ${month} , ${year}`;
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Loading state
  }

  if (error) {
    return <Text>Error fetching events: {error.message}</Text>; // Error handling
  }
  return (
    <View className="py-2">
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
        Sự kiện sắp diễn ra
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 16 }}
        className="mt-6"
      >
        {events?.map((event) => (
          <TouchableOpacity
            className="h-[220px]"
            key={event.eventId}
            onPress={() => router.push(`/events/${event.eventId}`)}
          >
            <Image
              source={{ uri: event.posterImg }}
              className="h-[140px] w-[224px] rounded-[20px]"
            />

            <View className="h-[60px] w-[224px]">
              <Text
                className="text-white font-bold mx-2 mt-2"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {/* [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
               nhânnnnnnnnnn */}
                {event.eventName}
              </Text>
              <View className="flex-row mt-2">
                <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                <Text className="text-white ml-2 ">
                  {formatDateTime(event.startTime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
