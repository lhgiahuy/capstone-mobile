import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getEvent } from "@/api/event";
import { useQuery } from "@tanstack/react-query";
import { EventDetail } from "@/constants/model/EventDetail";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpcomingEvent() {
  const status = "upcoming";
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventDetail, Error>({
    queryKey: ["events", status],
    queryFn: () => getEvent({ Status: status }),
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} Tháng ${month}, ${year}`;
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
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
        {events?.items?.map((event) => (
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
                className="text-white font-inter font-bold mx-2 mt-2"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {/* [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
               nhânnnnnnnnnn */}
                {event.eventName}
              </Text>
              <View className="flex-row mt-2">
                <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                <Text className="text-white ml-2 font-lexend">
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
