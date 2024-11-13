import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
// import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

import { useQuery } from "@tanstack/react-query";
import { getEventRecommendation, getEvents } from "@/api/event";
import { EventData } from "@/constants/model/EventDetail";

export default function SpecialEvent() {
  const router = useRouter();
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events"],
    queryFn: getEventRecommendation,
  });

  if (isLoading) {
    return <Text>Loading...</Text>; // Loading state
  }

  if (error) {
    return <Text>Error fetching events: {error.message}</Text>; // Error handling
  }

  return (
    <View className="py-2">
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
        Sự kiện Hot
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className="mt-6"
      >
        {events?.map((event) => (
          <TouchableOpacity
            key={event.eventId}
            onPress={() => router.push(`/events/${event.eventId}`)}
          >
            <Image
              // source={{ uri: event.imageUrl }}
              source={{ uri: event.posterImg }}
              className="h-[320px] w-[208px] rounded-[16px]"
            />
            <Text
              className="text-white text-center mt-2 w-[200px]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.eventName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
