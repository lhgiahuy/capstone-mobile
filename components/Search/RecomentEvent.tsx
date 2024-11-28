import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { EventData } from "@/constants/model/EventDetail";
import { useQuery } from "@tanstack/react-query";
import { getEventRecommendation } from "@/api/event";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "@/lib/utils/date-time";

export default function RecomentEvent() {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventData[], Error>({
    queryKey: ["events", "recomemended"],
    queryFn: () => getEventRecommendation(),
  });

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) {
    return <Text>Error fetching events: {error.message}</Text>;
  }

  return (
    <View className="py-2 mt-8 ">
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-lexend font-bold">
        Các sự kiện nổi bật
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 16 }}
        className="mt-6 p-2"
      >
        {events?.map((event) => (
          <TouchableOpacity
            className="justify-between items-center w-[200px] "
            key={event.eventId}
            onPress={() => router.push(`/events/${event.eventId}`)}
          >
            <Image
              source={{ uri: event.posterImg }}
              className="h-[260px] w-[180px] rounded-[20px]"
            />

            <View className="h-[60px] w-[224px] justify-center px-2 mt-3">
              <Text
                className="text-white font-bold mx-2 mt-2 text-center h-[40px]"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {event.eventName}
              </Text>
              <View className="flex-row items-center justify-center">
                <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                <Text className="text-white ml-2 font-lexend ">
                  {formatDate(event.startTime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
