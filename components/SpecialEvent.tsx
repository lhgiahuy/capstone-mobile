import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

import { useQuery } from "@tanstack/react-query";
import { getEventRecommendation, getEvents } from "@/api/event";
import { EventData, EventDetail } from "@/constants/model/EventDetail";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecialEvent() {
  const router = useRouter();
  const {
    data: recomement,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "banner-recomemended"],
    queryFn: () => getEventRecommendation(),
  });

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
        <Text className="text-white mt-2">Sự kiện không tải lên được...</Text>
      </SafeAreaView>
    );
  }

  if (!recomement || recomement.length === 0) {
    return (
      <SafeAreaView className=" justify-center">
        <Text className="ml-4 text-[#CAFF4C] text-xl font-bold">
          Sự kiện nổi bật
        </Text>
        <Text className="text-white text-[16px] font-lexend text-center mt-2">
          Chưa có sự kiện nổi bật dành cho bạn
        </Text>
        <Image
          source={require("../assets/images/Coming Soon.png")}
          className=" h-[300px] w-full rounded-[16px] mx-2 items-center"
        />
      </SafeAreaView>
    );
  }

  return (
    <View className="py-2">
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
        Sự kiện nổi bật
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className="mt-6"
      >
        {recomement?.map((event) => (
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
              className="text-white text-center mt-2 w-[200px] font-inter font-bold"
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
