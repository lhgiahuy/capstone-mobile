import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { EventData } from "@/constants/model/EventDetail";
import { getEventType } from "@/api/event";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";

export default function CurrentEvent() {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "type 1"],
    queryFn: () => getEventType("type 1"),
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
    <>
      <View className="py-2">
        <View className="flex-row  justify-between">
          <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
            Sự kiện đang diễn ra
          </Text>

          <Pressable
            className="flex-row mr-2"
            onPress={() => router.push("/events/list-event")}
          >
            <Text className="text-[#CAFF4C] text-[17px]">Xem thêm </Text>
            <Ionicons name="arrow-forward" size={23} color={"#CAFF4C"} />
          </Pressable>
        </View>

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
                source={{ uri: event.thumbnailImg }}
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
    </>
  );
}
